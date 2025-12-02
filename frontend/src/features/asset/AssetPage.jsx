import React, { useState } from "react";
import { dashboardchartdata } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import ModalComponent from "../../components/common/ModalComponent";
import ManageAssetTable from "./components/ManageAssetTable";
import { useAssets } from "../../hooks/useAssets";
import SearchInput from "../../components/common/SearchInput";

function AssetPage() {
  const [open, setOpen] = React.useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
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

  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col gap-4 font-poppins text-midnight ">
      <div className="flex flex-col  bg-white shadow-sm  rounded-md">
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
              icon={<FaPlus size={12} />}
              variant="primary"
              onClick={handleAddOpen}
            />
            <Button
              title={"Delete asset"}
              icon={<FaPlus size={12} />}
              variant="primary"
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
          setAssetTotal={(total) => console.log("Total assets:", total)}
        />
      </div>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        mode={modalMode}
        asset={selectedAsset}
      />
    </div>
  );
}

export default AssetPage;
