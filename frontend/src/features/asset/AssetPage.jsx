import React from "react";
import { dashboardchartdata } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import Dropdown from "../../components/common/Dropdown";
import { typeOptions } from "../../data/options";
import { brandOptions } from "../../data/options";
import SelectComponent from "../../components/common/SelectComponent";
import DatePickerComponent from "../../components/common/DatePickerComponent";
import ModalComponent from "../../components/common/ModalComponent";
import ManageAssetTable from "./components/ManageAssetTable";
import { useAssets } from "../../hooks/useAssets";

function AssetPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
              onClick={handleOpen}
            />
            <Button
              title={"Delete asset"}
              icon={<FaPlus size={12} />}
              variant="danger_primary"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
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
        </div>
      </div>
      <div className="flex">
        <ManageAssetTable />
      </div>
      <ModalComponent open={open} handleClose={handleClose} />
    </div>
  );
}

export default AssetPage;
