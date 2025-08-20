import React, { useState } from "react";
import ComboBox from "./components/ComboBox";
import { FaPlus } from "react-icons/fa6";
import { userData, assetData } from "../../model/SampleData";
import Button from "../../components/common/Button";
import AssignmentForm from "./components/AssignmentForm";

import { MdDelete } from "react-icons/md";

function Assignment() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assignments, setAssignments] = useState([{ user: null, asset: null }]);

  const handleChange = (index, field, value) => {
    const newAssigntments = [...assignments];
    newAssigntments[index][field] = value;
    setAssignments(newAssigntments);
  };

  const addRow = () => {
    setAssignments([...assignments, { user: null, asset: null }]);
  };

  const removeRow = (index) => {
    const newAssigntments = assignments.filter((_, i) => i !== index);
    setAssignments(newAssigntments);
  };

  const hangleAssign = () => {
    console.log("Assignnets: ", assignments);
  };

  return (
    <div className="bg-white flex flex-col  p-4 rounded-md shadow-sm gap-5">
      {assignments.map((row, index) => (
        <div
          key={index}
          className="flex flex-col w-full justify-between items-center gap-5 p-4 "
        >
          <div className="flex flex-col items-start justify-center w-full gap-4">
            <p className="font-open-sans font-semibold text-xl">Assign to:</p>
            <ComboBox
              data={userData}
              value={selectedUser}
              onChange={setSelectedUser}
              label="User"
              getOptionLabel={(option) => option?.fullName}
            />
            {/* <FaPlus size={32} /> */}
          </div>

          <div className="flex flex-col w-full gap-4">
            <p className="font-open-sans font-semibold text-xl">
              Assets to assigned
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ComboBox
                data={assetData}
                value={selectedAsset}
                onChange={setSelectedAsset}
                label="Asset"
                getOptionLabel={(option) => option?.name}
              />
              <ComboBox
                data={assetData}
                value={selectedAsset}
                onChange={setSelectedAsset}
                label="Asset"
                getOptionLabel={(option) => option?.name}
              />
            </div>
          </div>
          {assignments.length > 1 && (
            <button onClick={() => removeRow(index)}>
              <MdDelete size={24} />
            </button>
          )}
        </div>
      ))}
      <div className="flex flex-row items-center justify-end gap-5">
        <Button title="Add Row" variant="primary" onClick={addRow} />
        <Button title="Assign" variant="primary" />
      </div>
    </div>
  );
}

export default Assignment;
