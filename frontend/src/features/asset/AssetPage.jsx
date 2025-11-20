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
  const { data: assetData, isLoading } = useAssets();

  return (
    <div className="flex flex-col gap-4 font-poppins text-midnight ">
      <div className="flex flex-col  bg-white shadow-sm  rounded-md">
        <div className="flex flex-row justify-between items-center border-b border-gray-200 p-4">
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
          <SearchInput />
        </div>
        {/* <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <DatePickerComponent />
            <SelectComponent
              options={typeOptions}
              selected="type"
              label="Type"
              margin={1}
            />

            <SelectComponent
              options={brandOptions}
              selected="brand"
              label="Brand"
              margin={1}
            />
          </div>
          <div className="w-full bg-[#e0edfa9f] p-2 rounded-md">
            <p className="text-xs text-gray-400 font-open-sans">
              Filters Applied:
            </p>
          </div>
        </div> */}
      </div>
      <div className="flex">
        <ManageAssetTable onEdit={handleEditOpen} />
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
