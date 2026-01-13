import React, { use, useState } from "react";
import Button from "../../components/common/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import ModalComponent from "../../components/modals/ModalComponent";
import { useAssets, useDeleteAsset } from "../../hooks/useAssets";
import SearchInput from "../../components/form/SearchInput";
import AssetForm from "./components/AssetForm";
import AssetTable from "./components/AssetTable";
import SelectFilter from "../../components/common/SelectFilter";
import { useNavigate } from "react-router-dom";
import { BsPersonAdd } from "react-icons/bs";
import { useAppNotification } from "../../components/common/Notificaiton";
import { message, Modal } from "antd";
import ModalView from "../../components/modals/ModalView";
import AssetView from "./components/AssetView";
import { statusOptions } from "../../data/options";

function AssetPage() {
  // <-------------------states for modals---------------------->
  const [open, setOpen] = useState(false); //state to open modal
  const [modalMode, setModalMode] = useState("add"); //State to check if add or edit mode the modal should be
  const [openModalAssetInfo, setOpenModalAssetInfo] = useState(false); // for modal view of asset info

  // <-------------------states for user intervention---------------------->
  const [selectedAsset, setSelectedAsset] = useState(null); //for selecting one user for delete/edit
  const [onSelectedAsset, setOnselectedAsset] = useState([]); //for multiple selection of user for delete
  const [searchKeyword, setSearchKeyword] = useState(""); //this state is what use for API call to search
  const [keyword, setKeyword] = useState(""); // while this state is what user search is. need this since for manual triggering
  const [page, setPage] = useState(1); //for setting the page state
  const [statusFilter, setStatusFilter] = useState("all");

  // <-------------------Return function hooks ---------------------->
  const deleteAssetMutation = useDeleteAsset(); //delete hook for asset
  const { confirm } = Modal; // modal confirmation for delete
  const notify = useAppNotification(); //notifcation context
  const navigate = useNavigate();

  console.log(statusFilter);
  const { data: assetData, isLoading } = useAssets({
    page,
    pageSize: 5,
    keyword: searchKeyword,
  });

  //trigger for search
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleModalOpen = (mode, asset = null) => {
    setModalMode(mode);
    setSelectedAsset(asset);
    setOpen(true);
  };

  //multiple deletion on asset table
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
          title="Assign Asset"
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
            <div className="w-[250px]">
              <SelectFilter
                placeholder="Filter by Status"
                options={statusOptions}
                onChange={setStatusFilter}
                value={statusFilter}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 w-[50%] justify-end">
            <Button
              title={"Add asset"}
              icon={<IoMdAddCircleOutline size={18} />}
              variant="primary"
              onClick={() => handleModalOpen("add")}
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
          setPage={setPage} //for setting page if search and pagination
          page={page} //initial value of the page
          onEdit={(asset) => handleModalOpen("edit", asset)} //editing function of the asset on action column
          keyword={searchKeyword} //keyword to check on the backend for rendering it on the table
          onSelectedChange={setOnselectedAsset} //setter or trigger to for state to remember what column or asset is selected
          onSelectedAsset={onSelectedAsset} // holder of selected asset that from onSelectedAsset
          setOpenModalAssetInfo={setOpenModalAssetInfo} //state to open Modal view info
          setSelectedAsset={setSelectedAsset} //this state was use for modal view data
          setAssetTotal={(total) => console.log("Total assets:", total)} //for tracking the total assets
        />
      </div>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        mode={modalMode}
        modalData={selectedAsset}
        FormComponent={AssetForm}
      />

      <ModalView
        data={selectedAsset}
        open={openModalAssetInfo}
        close={setOpenModalAssetInfo}
        ViewComponent={AssetView}
        title="Asset info"
      />
    </div>
  );
}

export default AssetPage;
