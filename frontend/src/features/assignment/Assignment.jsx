import React, { useState } from "react";
import SearchInput from "../../components/common/SearchInput";
import AssignmentTable from "./components/AssignmentTable";
import Dropdown from "../../components/common/Dropdown";
import { statusOptions } from "../../data/options";
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
    <div className=" flex flex-col gap-4 font-poppins text-midnight ">
      <p className="font-bold  text-2xl">Asset assignement</p>
      <div className="flex flex-row gap-4 ">
        <div className="bg-white min-w-[65%] border border-gray-300 shadow-sm rounded-xl ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4">
              <h2 className="font-bold capitalize">select assset to assign</h2>
              <SearchInput bg_color={"bg-[#f5f7f9]"} />
              <div className="flex flex-row gap-4">
                <Dropdown
                  options={statusOptions}
                  bg_color={"bg-[#f5f7f9]"}
                  placeholder="Filter by Status"
                />

                <Dropdown
                  options={statusOptions}
                  bg_color={"bg-[#f5f7f9]"}
                  placeholder="Filter by Type"
                />
              </div>
            </div>

            <div className=" ">
              <AssignmentTable />
            </div>
          </div>
        </div>
        <div className="bg-white min-w-[33.5%] border border-gray-300 shadow-sm rounded-xl p-4">
          test
        </div>
      </div>
    </div>
  );
}

export default Assignment;
