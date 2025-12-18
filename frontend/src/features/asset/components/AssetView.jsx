import React from "react";

function AssetView({ data }) {
  return (
    <div className="flex flex-col gap-4 font-poppins ">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-xl font-bold">{data.name}</h1>
          <p className="text-xs font-light">{data.type}</p>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{data.tag}</h1>
          <p className="text-xs font-light">{data.status}</p>
        </div>
      </div>
      <div>{data.assignedToName}</div>
      <div>
        <p>{data.timeCreated}</p>
        <p>{data.timeUpdated}</p>
      </div>
    </div>
  );
}

export default AssetView;
