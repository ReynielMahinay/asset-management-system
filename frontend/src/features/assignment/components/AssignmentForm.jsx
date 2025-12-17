import { useState } from "react";
import DatePickerComponent from "../../../components/common/DatePickerComponent";
import SelectAssignment from "./SelectAssignment";
import { Divider } from "antd";
import TextAreaComponent from "../../../components/common/TextAreaComponent";
import Button from "../../../components/common/Button";
import SelectedAssetsCard from "../../../components/common/SelectedAssetsCard";

function AssignmentForm({ assets, selectedAsset, onSubmit, allUsers }) {
  const [selectedUserId, setSelectedUserId] = useState(null); // for SelectAssignment
  const [selectedDate, setSelectedDate] = useState(null); // for DatePickerComponent

  const [assignmentNotes, setAssignmentNotes] = useState("");

  const handleRemoveAsset = (id) => {
    selectedAsset((prev) => prev.filter((asset) => asset.id !== id));
  };

  console.log("AssignmentForm user selected:", selectedUserId);
  console.log("Selected date of the user: ", selectedDate);
  console.log("Assignment notes: ", assignmentNotes);
  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(selectedUserId, selectedDate, assignmentNotes, assets);
          setSelectedDate(null), setAssignmentNotes("");
        }}
        className="space-y-5"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div className="w-[50%]">
              <SelectAssignment
                options={
                  allUsers?.data?.map((u) => ({
                    label: u.fullname,
                    value: u.id,
                  })) || []
                }
                value={selectedUserId}
                onChange={(userId) => setSelectedUserId(userId)}
                placeholder="Select user"
              />
            </div>
            <div className="w-[50%]">
              <DatePickerComponent
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
          </div>
          <div>
            <TextAreaComponent
              value={assignmentNotes}
              onChange={(e) => setAssignmentNotes(e.target.value)}
            />
          </div>
        </div>

        <Divider />

        <div className="w-full h-[230px] flex flex-col gap-2 ">
          <p className="capitalize font-poppins font-bold ">selected asset</p>
          <div className="flex flex-col gap-2  h-[200px] overflow-y-auto">
            {assets.map((asset) => (
              <div key={asset.id}>
                <SelectedAssetsCard
                  selectedAsset={selectedAsset}
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
          <Button
            title="Assigned Asset"
            variant="modal_primary"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default AssignmentForm;
