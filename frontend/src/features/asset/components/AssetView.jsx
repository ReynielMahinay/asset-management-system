import React from "react";
import { Divider } from "antd";

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
      <Divider />
      <div>
        <p className="font-semibold">Assigned to: </p>
        {data.assignedToName}
      </div>

      <div className="flex flex-row justify-between">
        <span>
          <p className="font-semibold">Time created: </p>
          {data.timeCreated}
        </span>
        <span>
          <p className="font-semibold">Latest update: </p>
          {data.timeUpdated}
        </span>
      </div>
    </div>
  );
}

export default AssetView;
