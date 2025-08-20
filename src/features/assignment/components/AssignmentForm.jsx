import React from "react";
import ComboBox from "./ComboBox";

function AssignmentForm({ data = [], value, label, onChange, getOptionLabel }) {
  return (
    <div>
      <div className="flex flex-row items-center w-full gap-5">
        <ComboBox
          data={userData}
          value={selectedUser}
          onChange={setSelectedUser}
          label="User"
          getOptionLabel={(option) => option?.fullName}
        />
        <ComboBox
          data={userData}
          value={selectedUser}
          onChange={setSelectedUser}
          label="User"
          getOptionLabel={(option) => option?.fullName}
        />
        <ComboBox
          data={userData}
          value={selectedUser}
          onChange={setSelectedUser}
          label="User"
          getOptionLabel={(option) => option?.fullName}
        />
      </div>
    </div>
  );
}

export default AssignmentForm;
