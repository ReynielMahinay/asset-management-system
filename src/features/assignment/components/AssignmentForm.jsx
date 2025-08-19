import React from "react";

function AssignmentForm() {
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
        <FaPlus size={32} />
        <ComboBox
          data={assetData}
          value={selectedAsset}
          onChange={setSelectedAsset}
          label="Asset"
          getOptionLabel={(option) => option?.name}
        />
      </div>
    </div>
  );
}

export default AssignmentForm;
