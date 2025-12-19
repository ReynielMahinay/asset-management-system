import React, { useState, useMemo } from "react";
import { Table, ConfigProvider, Alert, Spin } from "antd";
import ActionMenu from "../../../components/common/ActionMenu";
import { useDeleteAsset } from "../../../hooks/useAssets";
import { useAppNotification } from "../../../components/common/Notificaiton";
import { AssetAcionIcon } from "../../../data/options";
import { useAssets } from "../../../hooks/useAssets";
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
  setOpenModalAssetInfo,
  setSelectedAsset,
}) {
  // <-------------------states for table---------------------->
  const [order, setOrder] = useState("asc"); //state for ordering the column based on the orderBy
  const [orderBy, setOrderBy] = useState("name"); //state for what column is will be sorted
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // <-------------------return function hooks---------------------->
  const deleteAssetMutation = useDeleteAsset();
  const notify = useAppNotification(); //notifcation
  const { confirm } = Modal;

  //Fetching data using custom hook
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useAssets({
    page: page,
    pageSize: rowsPerPage,
    sort: columnMap[orderBy] || "asset_id",
    order,
    keyword,
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

  const handleView = (user) => {
    setSelectedAsset(user);
    setOpenModalAssetInfo(true);
  };

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

      render: (name) => <span className="font-semibold text-xs ">{name}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <span className=" text-xs">{type}</span>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand) => <span className=" text-xs">{brand}</span>,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      render: (tag) => <span className="font-semibold text-xs">{tag}</span>,
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      width: 150, // px
      render: (name) =>
        name ? (
          <span className="text-xs bg-neutral-100 px-2 py-1 rounded-full">
            {name}
          </span>
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
            <span className="text-green-700 bg-green-100 px-2 py-1 capitalize text-xs  rounded-full  font-normal ">
              {status}
            </span>
          ) : (
            <span className="text-red-700  bg-red-100 px-2 py-1 rounded-full text-xs capitalize font-normal  ">
              {status}
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Time Created",
      dataIndex: "timeCreated",
      render: (timeCreated) => <span className=" text-xs ">{timeCreated}</span>,
    },
    {
      title: "Time Updated",
      dataIndex: "timeUpdated",

      render: (timeUpdated) => <span className="text-xs ">{timeUpdated}</span>,
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
            view: () => handleView(record),
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
