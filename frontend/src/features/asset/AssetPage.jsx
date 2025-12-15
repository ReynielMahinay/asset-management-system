import React, { use, useState } from "react";
import Button from "../../components/common/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import ModalComponent from "../../components/common/ModalComponent";
import { useAssets, useDeleteAsset } from "../../hooks/useAssets";
import SearchInput from "../../components/common/SearchInput";
import AssetForm from "./components/AssetForm";
import AssetTable from "./components/AssetTable";
import { useNavigate } from "react-router-dom";
import { BsPersonAdd } from "react-icons/bs";
import { useAppNotification } from "../../components/common/Notificaiton";
import { message, Modal } from "antd";
import useApp from "antd/es/app/useApp";

function AssetPage() {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAsset, setSelectedAsset] = useState(null); //for selecting one user for delete/edit
  const [onSelectedAsset, setOnselectedAsset] = useState([]); //for multiple selection of user for delete
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const deleteAssetMutation = useDeleteAsset();
  const { confirm } = Modal; // modal confirmation for delete
  const notify = useAppNotification();

  const navigate = useNavigate();
  const { data: assetData, isLoading } = useAssets({
    page,
    pageSize: 5,
    keyword: searchKeyword,
  });

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleAddOpen = () => {
    setModalMode("add");
    setSelectedAsset(null);
    setOpen(true);
  };

  const handleEditOpen = (asset) => {
    setModalMode("edit");
    setSelectedAsset(asset);
    setOpen(true);
  };

  const handleDeleteMultiple = () => {
    if (onSelectedAsset.length === 0) {
      confirm({
        title: "Please select the asset",
        okText: "Yes",
        okType: "danger",
        mask: true,
        cancelText: "No",
        onOk() {
          return;
        },
      });
    } else {
      confirm({
        title: `Are you sure you want to delete ${onSelectedAsset.length} asset(s)?`,
        okText: "Yes",
        okType: "danger",
        mask: true,
        cancelText: "No",
        onOk() {
          onSelectedAsset.forEach((id) => deleteAssetMutation.mutate(id));
          setOnselectedAsset([]);
          notify({
            title: "Asset deleted",
            description: "The assets was deleted successfuly",
          });
        },
      }); //then this clear all the selected checkbox after deleting
    }
  };

  const handleClose = () => setOpen(false);

  const handleSearchInput = (e) => {
    const trimmedKeyword = keyword.trim();
    console.log("Searching for:", trimmedKeyword);
    handleSearch(trimmedKeyword);
  };

  return (
    <div className="flex flex-col gap-4 font-poppins text-midnight ">
      <div className="flex justify-between items-center py-2">
        <header>
          <h1 className="font-bold text-2xl">Asset management</h1>
          <p className="text-xs font-light text-gray-600">
            View, manage, and assign company assets
          </p>
        </header>

        <Button
          title="Assigned Asset"
          icon={<BsPersonAdd size={18} />}
          onClick={() => navigate("assignment")}
        />
      </div>
      <div className="flex flex-col  gap-6 rounded-xl ">
        <div className="flex flex-row w-full ">
          <div className="flex flex-row  gap-2 w-[50%] boder-1 border-red-500 ">
            <SearchInput
              onSearch={handleSearch}
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearchInput={handleSearchInput}
              bg_color={"bg-white"}
              placeholder="Search by Name or Tag"
            />
            <Button
              title="Search"
              variant="primary"
              onClick={handleSearchInput}
            />
          </div>
          <div className="flex flex-row gap-2 w-[50%] justify-end">
            <Button
              title={"Add asset"}
              icon={<IoMdAddCircleOutline size={18} />}
              variant="primary"
              onClick={handleAddOpen}
            />
            <Button
              title={"Delete asset"}
              icon={<MdDeleteOutline size={18} />}
              variant="primary"
              onClick={handleDeleteMultiple}
            />
          </div>
        </div>
      </div>
      <div className="">
        <AssetTable
          setPage={setPage}
          page={page}
          onEdit={handleEditOpen}
          keyword={searchKeyword}
          onSelectedChange={setOnselectedAsset}
          onSelectedAsset={onSelectedAsset}
          setAssetTotal={(total) => console.log("Total assets:", total)}
        />
      </div>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        mode={modalMode}
        modalData={selectedAsset}
        FormComponent={AssetForm}
      />
    </div>
  );
}

export default AssetPage;
