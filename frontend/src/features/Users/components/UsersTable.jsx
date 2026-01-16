import React from "react";
import { Table, ConfigProvider, Spin, Alert } from "antd";
function UsersTable() {
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
      title: "Status",
      dataIndex: "status",
      render: (department) => <span className="text-xs">{department}</span>,
    },
    {
      title: "Last login",
      dataIndex: "last_login",
      render: (department) => <span className="text-xs">{department}</span>,
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
  return (
    <div>
      <div className="border border-zinc-300 rounded-xl overflow-hidden ">
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
          <Table rowKey="id" columns={columns} />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default UsersTable;
