import React, { useState, useMemo } from "react";
import { Table, ConfigProvider, Spin } from "antd";
import { fetchUser } from "../../../api/users";
import { useQuery } from "@tanstack/react-query";
import KebabMenu from "../../../components/common/KebabMenu";

// Column mapping for sorting
const columnMap = {
  fullname: "user_fullname",
  email: "user_email",
  department: "user_department",
  role: "user_role",
};

export default function UserTable({
  onEdit,
  onSelectedUser,
  setOnselectedUser,
  keyword = "",
  page,
  setPage,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("fullname");
  const [order, setOrder] = useState("asc");

  // Fetch user data with react-query
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["users", page, rowsPerPage, orderBy, order, keyword],
    queryFn: () =>
      fetchUser({
        page: page,
        pageSize: rowsPerPage,
        sor: columnMap[orderBy] || "user_id",
        order,
        keyword,
      }),
    keepPreviousData: true,
  });

  // Map data to AntD table format
  const mappedData = useMemo(
    () =>
      data.data.map((user) => ({
        id: user.id,
        fullname: user.user_fullname || user.fullname,
        email: user.user_email || user.email,
        department: user.user_department || user.department,
        role: user.user_role || user.role,
      })),
    [data]
  );

  // Table columns with sorting and action column
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            border: "1px solid #d4d4d8", // border color
            borderRadius: "12px", // rounded corners
            backgroundColor: "#f9fafb", // optional background
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {role}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <KebabMenu
          onEdit={onEdit}
          dataForm={record}
          dataId={record.id}
          type="user"
        />
      ),
    },
  ];

  // Handle pagination, sorting
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
      <div className="border rounded-xl overflow-hidden border-zinc-300">
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
            rowKey="id"
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
              showTotal: (total) => `Total Users: ${total}`,
            }}
            onChange={handleTableChange}
            loading={isFetching}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
