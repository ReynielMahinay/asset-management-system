import React from "react";
import { Divider } from "antd";

function UserVIew({ data }) {
  console.log("Data for userView: ", data);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-xl font-poppins font-bold">{data.fullname}</h1>
            <p className="font-poppins font-light text-xs">{data.email}</p>
          </div>
          <div>
            <h1 className="text-xl font-poppins font-semibold">
              {data.department}
            </h1>
            <p className="font-poppins font-light text-xs">{data.role}</p>
          </div>
        </div>

        <Divider />
      </div>
    </div>
  );
}

export default UserVIew;
