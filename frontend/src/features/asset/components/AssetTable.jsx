import React, { useState, useMemo } from "react";
import { Table, ConfigProvider, Alert, Spin } from "antd";
import { fetchAssets } from "../../../api/assets";
import { useQuery } from "@tanstack/react-query";
import ActionMenu from "../../../components/common/ActionMenu";
import { useDeleteAsset } from "../../../hooks/useAssets";
import { useAppNotification } from "../../../components/common/Notificaiton";
import { AssetAcionIcon } from "../../../data/options";
import { Modal } from "antd";
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
  onSelectedAsset,
  onSelectedChange,
  keyword = "",
  setPage,
  page,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const deleteAssetMutation = useDeleteAsset();
  const notify = useAppNotification(); //notifcation
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { confirm } = Modal;
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
        assignedToName: asset.assignedToName || "N/A",
        timeCreated: asset.created_at || asset.timeCreated,
        timeUpdated: asset.updated_at || asset.timeUpdated,
      })),
    [data]
  );

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setRowsPerPage(pagination.pageSize);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteAssetMutation.mutate(id);
        notify({
          title: "Asset deleted",
          description: "Asset was deleted succesfuly",
        });
      },
    });
  };

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
      render: (tag) => <span className="font-semibold">{tag}</span>,
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      render: (name) =>
        name ? (
          <span className="font-semibold">{name}</span>
        ) : (
          <span className="text-gray-400">Unassigned</span>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          {status === "assigned" ? (
            <span className="text-green-700 bg-green-100 px-2 py-1 capitalize text-xs rounded-full font-poppins font-normal ">
              {status}
            </span>
          ) : (
            <span className="text-red-700  bg-red-100 px-2 py-1 rounded-full capitalize font-poppins font-normal text-xs">
              {status}
            </span>
          )}
        </span>
      ),
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
      align: "center",
      render: (_, record) => (
        <ActionMenu
          actionIcon={AssetAcionIcon}
          action={{
            delete: () => handleDelete(record.id),
            edit: () => onEdit(record),
          }}
        />
      ),
    },
  ];

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
            rowKey="id"
            style={{ width: "100%" }}
            rowSelection={{
              selectedRowKeys: onSelectedAsset,
              onChange: (keys) => onSelectedChange(keys),
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
