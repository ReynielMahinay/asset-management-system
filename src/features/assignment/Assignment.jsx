import React, { useState } from "react";
import ComboBox from "./components/ComboBox";
import { FaPlus } from "react-icons/fa6";
import { userData, assetData } from "../../model/SampleData";
import Button from "../../components/common/Button";

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
          className="flex flex-row w-full justify-between items-center gap-5 bg-white rounded-md shadow-sm p-4 "
        >
          <div className="flex flex-row items-center w-full gap-5">
            <ComboBox
              data={userData}
              value={selectedUser}
              onChange={setSelectedUser}
              label="User"
              getOptionLabel={(option) => option?.fullName}
            />
            <FaPlus size={32} />
            <ComboBox
              data={assetData}
              value={selectedAsset}
              onChange={setSelectedAsset}
              label="Asset"
              getOptionLabel={(option) => option?.name}
            />
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
