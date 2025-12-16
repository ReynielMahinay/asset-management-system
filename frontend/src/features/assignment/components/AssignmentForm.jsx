import { useState } from "react";
import DatePickerComponent from "../../../components/common/DatePickerComponent";
import SelectAssignment from "./SelectAssignment";
import { Divider } from "antd";

import TextAreaComponent from "../../../components/common/TextAreaComponent";
import SelectedAssetContainer from "../../../components/common/SelectedAssetContainer";
import Button from "../../../components/common/Button";
import SelectedAssetsCard from "../../../components/common/SelectedAssetsCard";

function AssignmentForm({
  data = [],
  value,
  label,
  onChange,
  getOptionLabel,
  userOptions,
  assets,
}) {
  const [selectedUser, setSelectedUser] = useState(null); // for SelectAssignment
  const [selectedDate, setSelectedDate] = useState(null); // for DatePickerComponent
  const [selectedAssets, setSelectedAssets] = useState();

  const handleRemoveAsset = (id) => {
    selectedAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  console.log("AssignmentForm asset selected:", assets);
  return (
    <div className="flex flex-col">
      <form action="" className="space-y-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div className="w-[50%]">
              <SelectAssignment
                options={userOptions}
                value={selectedUser}
                onChange={(value) => setSelectedUser(value)}
                placeholder="Select user"
              />
            </div>
            <div className="w-[50%]">
              <DatePickerComponent />
            </div>
          </div>
          <div>
            <TextAreaComponent />
          </div>
        </div>

        <Divider />

        <div className="w-full h-[230px] flex flex-col gap-2 ">
          <p className="capitalize font-poppins font-bold ">selected asset</p>
          <div className="flex flex-col gap-2  h-[200px] overflow-y-auto">
            {assets.map((asset) => (
              <div key={asset.id}>
                <SelectedAssetsCard
                  selectedAsset={selectedAssets}
                  name={asset.name}
                  tag={asset.tag}
                  brand={asset.brand}
                  type={asset.type}
                  id={asset.id}
                  handleRemoveAsset={handleRemoveAsset}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <Button title="Assigned Asset" variant="modal_primary" />
        </div>
      </form>
    </div>
  );
}

export default AssignmentForm;
