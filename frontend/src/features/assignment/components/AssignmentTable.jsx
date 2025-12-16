import React, { Component, useState } from "react";
import { Table, ConfigProvider } from "antd";
import { useAssets } from "../../../hooks/useAssets";

const columnMap = {
  name: "asset_name",
  type: "asset_type",
  brand: "asset_brand",
  tag: "asset_tag",
  status: "asset_status",
};

export default function AssignmentTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError } = useAssets({
    page,
    pageSize,
    sort: "asset_id",
    order: "asc",
    keyword: "",
    unassigned: true,
  });
  const [selectionType, setSelectionType] = useState("checkbox");
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
      title: "status",
      dataIndex: "status",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            table: {},
          },
        }}
      >
        <Table
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={data?.data}
        />
      </ConfigProvider>
    </div>
  );
}
