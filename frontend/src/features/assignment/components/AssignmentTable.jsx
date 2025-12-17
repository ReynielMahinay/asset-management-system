import React, { useMemo, useState } from "react";
import { Table, ConfigProvider } from "antd";
import { useAssets } from "../../../hooks/useAssets";
import { useIsFetching } from "@tanstack/react-query";

const columnMap = {
  name: "asset_name",
  type: "asset_type",
  brand: "asset_brand",
  tag: "asset_tag",
  status: "asset_status",
};

export default function AssignmentTable({
  onSelectedAsset,
  setOnselectedAsset,
  filterType,
  page,
  setPage,
  keyword = "",
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    isFetching,
  } = useAssets({
    page: page,
    pageSize: rowsPerPage,
    sort: "asset_id",
    order: "asc",
    keyword: keyword,
    unassigned: true,
  });

  const mappedData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((asset) => ({
      id: asset.id,
      name: asset.asset_name ?? asset.name ?? "",
      type: asset.asset_type ?? asset.type ?? "",
      brand: asset.asset_brand ?? asset.brand ?? "",
      tag: asset.asset_tag ?? asset.tag ?? "",
      status: asset.asset_status ?? asset.status ?? "",
    }));
  }, [data]);

  const normalizeFiler = filterType?.toLowerCase();
  const filterData = normalizeFiler
    ? mappedData.filter((item) => item.type?.toLowerCase() === normalizeFiler)
    : mappedData;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span className="font-semibold text-xs">{name}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <span className="text-xs">{type}</span>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand) => <span className="text-xs">{brand}</span>,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      render: (tag) => <span className="text-xs font-semibold">{tag}</span>,
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status) => (
        <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
          {status}
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setRowsPerPage(pagination.pageSize);
  };
  console.log("number of unassigned asset: ", filterData);
  return (
    <div className="font-poppins">
      <ConfigProvider
        theme={{
          components: {
            table: {},
          },
        }}
      >
        <Table
          rowKey="id"
          style={{ width: "100%" }}
          rowSelection={{
            selectedRowKeys: onSelectedAsset.map((a) => a.id),
            // triggered whenever user selects/deselects any visible row
            onSelect: (record, selected) => {
              if (selected) {
                // add selected row if not already selected
                if (!onSelectedAsset.find((a) => a.id === record.id)) {
                  setOnselectedAsset([...onSelectedAsset, record]);
                }
              } else {
                // remove deselected row
                setOnselectedAsset(
                  onSelectedAsset.filter((a) => a.id !== record.id)
                );
              }
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
              if (selected) {
                // add all newly selected rows
                const newRows = changeRows.filter(
                  (r) => !onSelectedAsset.find((a) => a.id === r.id)
                );
                setOnselectedAsset([...onSelectedAsset, ...newRows]);
              } else {
                // remove deselected rows
                const deselectedIds = changeRows.map((r) => r.id);
                setOnselectedAsset(
                  onSelectedAsset.filter((a) => !deselectedIds.includes(a.id))
                );
              }
            },
          }}
          columns={columns}
          dataSource={filterData}
          pagination={{
            current: page,
            pageSize: rowsPerPage,
            total: filterData.length,
            showTotal: (total) => `Total asset: ${total}`,
          }}
          onChange={handleTableChange}
          loading={isFetching}
        />
      </ConfigProvider>
    </div>
  );
}
