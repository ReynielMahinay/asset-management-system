import React, { useState } from "react";
import { useDeleteAsset } from "../../hooks/useAssets";
import { Modal } from "antd";

function ModalConfirmation({ onSelectedAsset, setOnselectedAsset }) {
  const deleteAssetMutation = useDeleteAsset();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return Modal.confirm({
    title: `Are you sure you want to delete ${onSelectedAsset.length} asset(s)?`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      onSelectedAsset.forEach((id) => deleteAssetMutation.mutate(id));
      setOnselectedAsset([]);
    },
  });
}

export default ModalConfirmation;
