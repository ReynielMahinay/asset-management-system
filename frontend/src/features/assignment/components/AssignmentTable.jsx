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
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Tag",
      dataIndex: "tag",
    },
    {
      title: "status",
      dataIndex: "status",
    },
  ];

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setRowsPerPage(pagination.pageSize);
  };
  console.log("Selected Asset(s): ", onSelectedAsset);
  console.log("RAW API DATA:", data?.data);
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
            selectedRowKeys: onSelectedAsset,
            onChange: (keys) => setOnselectedAsset(keys),
          }}
          columns={columns}
          dataSource={filterData}
          pagination={{
            current: page,
            pageSize: rowsPerPage,
            tota: filterData.lenght,
            showTotal: (total) => `Total asset: ${total}`,
          }}
          onChange={handleTableChange}
          loading={isFetching}
        />
      </ConfigProvider>
    </div>
  );
}
