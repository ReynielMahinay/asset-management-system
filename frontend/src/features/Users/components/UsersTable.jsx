import React, { useMemo } from "react";
import { Table, ConfigProvider } from "antd";

function UsersTable({ data, page, pageSize }) {
  const mappedData = useMemo(() => {
    const rows = data ?? [];
    return rows.map((account) => ({
      id: account.id,
      name: account.username,
      email: account.email,
      role: account.role,
      last_login: account.last_login,
    }));
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span className="text-xs font-semibold">{name}</span>,
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
            <span className="text-blue-500 bg-blue-100 py-1 px-2 text-xs capitalize rounded-full">
              {role}
            </span>
          );
        } else if (role === "Pre-sales") {
          return (
            <span className="text-yellow-500 bg-yellow-100 px-2 py-1 text-xs capitalize rounded-full">
              {role}
            </span>
          );
        }
        return <span>{role}</span>;
      },
    },
    {
      title: "Last login",
      dataIndex: "last_login",
      render: (last_login) => <span className="text-xs">{last_login}</span>,
    },
  ];

  return (
    <div>
      <div className="border border-zinc-300 rounded-xl overflow-hidden">
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
          <Table rowKey="id" columns={columns} dataSource={mappedData} />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default UsersTable;
