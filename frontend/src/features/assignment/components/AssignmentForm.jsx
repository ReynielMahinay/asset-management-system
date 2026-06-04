import { useState } from "react";
import { Descriptions, Divider } from "antd";
import Button from "../../../components/common/Button";
import SelectAssignment from "./SelectAssignment";
import DatePickerComponent from "../../../components/form/DatePickerComponent";
import TextAreaComponent from "../../../components/form/TextAreaComponent";
import SelectedAssetsCard from "../../../components/common/SelectedAssetsCard";
import { useAppNotification } from "../../../components/common/Notificaiton";
import dayjs from "dayjs";
import { useAssignmentAsset } from "../../../hooks/useAssignment";

function AssignmentForm({ assets, selectedAsset, allUsers, setPage }) {
  const [selectedUserId, setSelectedUserId] = useState(null); // for SelectAssignment
  const [selectedDate, setSelectedDate] = useState(null); // for DatePickerComponent
  const [assignmentNotes, setAssignmentNotes] = useState(""); // for Textarea notes

  const notify = useAppNotification();
  const mutation = useAssignmentAsset();

  const handleAssign = () => {
    if (!selectedUserId || assets.length === 0) {
      alert("Please select a user and at least one asset.");
      return;
    }

    const payload = {
      asset_ids: assets.map((asset) => asset.id),
      user_id: selectedUserId,
      assigned_date: dayjs(selectedDate).format("YYYY-MM-DD"),
      notes: assignmentNotes,
    };
    console.log("Assign payload:", payload);
    mutation.mutate(payload, {
      onSuccess: (data) => {
        console.log("Assignment successful:", data);
        // Optionally, clear selection
        setSelectedUserId([]);
        setSelectedDate(null);
        setAssignmentNotes("");
        setPage(1);
      },
      onError: (error) => {
        console.error("Assignment failed:", error.message);
      },
    });
  };
  const handleRemoveAsset = (id) => {
    selectedAsset((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAssign(selectedUserId, selectedDate, assignmentNotes, assets);
          (setSelectedDate(null),
            setAssignmentNotes(""),
            setSelectedUserId(null));
          notify({
            title: "Asset(s) Assigned successfuly",
          });
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
