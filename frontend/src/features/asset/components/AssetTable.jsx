import React, { useState, useMemo } from "react";
import { Table, ConfigProvider, Alert, Spin } from "antd";
import { fetchAssets } from "../../../api/assets";
import { useQuery } from "@tanstack/react-query";
import KebabMenu from "../../../components/common/KebabMenu";

const columnMap = {
  name: "asset_name",
  type: "asset_type",
  brand: "asset_brand",
  serialNumber: "serial_number",
  tag: "asset_tag",
  status: "asset_status",
  timeCreated: "created_at",
  timeUpdated: "updated_at",
};

function AssetTable({
  onEdit,
  onSelectedUser,
  setOnselectedUser,
  keyword = "",
  setPage,
  page,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["assets", page, rowsPerPage, orderBy, order, keyword],
    queryFn: () =>
      fetchAssets({
        page: page,
        pageSize: rowsPerPage,
        sort: columnMap[orderBy] || "asset_id",
        order,
        keyword,
      }),
    keepPreviousData: true,
  });

  const mappedData = useMemo(
    () =>
      data.data.map((asset) => ({
        id: asset.id,
        name: asset.asset_name || asset.name,
        type: asset.asset_type || asset.type,
        brand: asset.asset_brand || asset.brand,
        tag: asset.asset_tag || asset.tag,
        status: asset.asset_status || asset.status,
        timeCreated: asset.created_at || asset.timeCreated,
        timeUpdated: asset.updated_at || asset.timeUpdated,
      })),
    [data]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Time Created",
      dataIndex: "timeCreated",
    },
    {
      title: "Time Updated",
      dataIndex: "timeUpdated",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <KebabMenu
          onEdit={onEdit}
          dataForm={record}
          dataId={record.id}
          type="asset"
        />
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setRowsPerPage(pagination.pageSize);
  };

  if (isError) {
    return (
      <Alert
        message="Error loading assets"
        description={error?.message || "Something went wrong"}
        type="error"
        showIcon
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Spin />
      </div>
    );
  }
  return (
    <div>
      <div className="border rounded-xl overflow-hidden border-zinc-300 w-full">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#d4d4d8",
                rowLineWidth: 1,
              },
            },
          }}
        >
          <Table
            style={{ width: "100%" }}
            rowSelection={{
              selectedRowKeys: onSelectedUser,
              onChange: (keys) => setOnselectedUser(keys),
            }}
            columns={columns}
            dataSource={mappedData}
            pagination={{
              current: page,
              pageSize: rowsPerPage,
              total: data.total, // total rows from API
              showTotal: (total) => `Total asset : ${total}`,
            }}
            onChange={handleTableChange}
            loading={isFetching}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default AssetTable;
