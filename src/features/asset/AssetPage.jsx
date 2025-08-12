import React from "react";
import AssetTable from "../../components/common/AssetTable";
import { dashboardchartdata } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";

function AssetPage() {
  return (
    <div className="flex flex-col gap-4 font-poppins">
      <div className="flex flex-row justify-between items-center bg-white shadow-sm p-4 rounded-xl">
        <p>
          {dashboardchartdata[0].name}:
          <span className="font-semibold"> {dashboardchartdata[0].value}</span>
        </p>
        <Button title={"Add asset"} icon={<FaPlus />} />
      </div>
      <div>
        <AssetTable />
      </div>
    </div>
  );
}

export default AssetPage;
