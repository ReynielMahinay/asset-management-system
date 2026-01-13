import React, { useState, useMemo } from "react";
import { Table, ConfigProvider, Spin, Alert } from "antd";
import { UserAcionIcon } from "../../../data/options";
import ActionMenu from "../../../components/common/ActionMenu";
import { Modal } from "antd";
import { useAppNotification } from "../../../components/common/Notificaiton";
import { useDeleteUser } from "../../../hooks/useUsers";

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
  data,
  setOpenModaUserInfo,
  isLoading,
  isError,
  error,
  isFetching,
  setSelectedUser,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const deleteUserMutation = useDeleteUser();
  const { confirm } = Modal;
  const notify = useAppNotification();

  const mappedData = useMemo(
    () =>
      data.data.map((user) => ({
        id: user.id,
        fullname: user.user_fullname || user.fullname,
        email: user.user_email || user.email,
        department: user.user_department || user.department,
        role: user.user_role || user.role,
        asset: user.asset,
      })),
    [data]
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenModaUserInfo(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delte this?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUserMutation.mutate(id);
        notify({
          title: "User deleted",
          description: "User was deleted successfully",
        });
      },
    });
  };

  // Table columns with sorting and action column
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      render: (fullname) => (
        <span className="text-xs font-semibold">{fullname}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <span className="text-xs">{email}</span>,
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (department) => <span className="text-xs">{department}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => {
        if (role === "technical") {
          return (
            <span className="text-blue-500 bg-blue-100 py-1 px-2 text-xs capitalize rounded-full  ">
              {role}
            </span>
          );
        } else if (role === "Pre-sales") {
          return (
            <span className="text-yellow-500 bg-yellow-100 px-2 py-1 text-xs capitalize rounded-full ">
              {role}
            </span>
          );
        }
        return <span>{role}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <ActionMenu
          actionIcon={UserAcionIcon}
          action={{
            delete: () => handleDelete(record.id),
            edit: () => onEdit(record),
            view: () => handleView(record),
          }}
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
