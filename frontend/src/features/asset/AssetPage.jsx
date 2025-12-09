import React, { use, useState } from "react";
import { dashboardchartdata } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import ModalComponent from "../../components/common/ModalComponent";
import ManageAssetTable from "./components/ManageAssetTable";
import { useAssets, useDeleteAsset } from "../../hooks/useAssets";
import SearchInput from "../../components/common/SearchInput";
import AssetForm from "./components/AssetForm";

function AssetPage() {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAsset, setSelectedAsset] = useState(null); //for selecting one user for delete/edit
  const [onSelectedAsset, setOnselectedAsset] = useState([]); //for multiple selection of user for delete
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const deleteAssetMutation = useDeleteAsset();
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
      alert("Please selected asset to delete");
      return;
    } //checking if no selected asset

    const confirmDelete = window.confirm(
      `Delete ${onSelectedAsset.length} selected asset(s)`
    ); //window alert confirmation for delete selected assets

    if (!confirmDelete) return; //If no seleceted just return nothing

    onSelectedAsset.forEach((id) => {
      deleteAssetMutation.mutate(id);
    }); //All the selected asset that was stored in the onSelectedAsset state will be foreach and deleted using the hook

    setOnselectedAsset([]); //then this clear all the selected checkbox after deleting
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col gap-4 font-poppins text-midnight ">
      <div className="flex flex-col  bg-white shadow-sm  rounded-xl">
        <div className="flex flex-row justify-between items-center border-b border-gray-300 p-4">
          <p className="flex flex-row justify-center font-light  text-sm items-center gap-3">
            {dashboardchartdata[0].name}s:
            <span className="font-bold text-[1.8rem] ">
              {assetData?.total ?? 0}
            </span>
          </p>
          <div className="flex flex-row gap-2">
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
        <div className="p-4">
          <SearchInput onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex">
        <ManageAssetTable
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
