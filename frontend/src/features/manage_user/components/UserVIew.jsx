import React from "react";
import { Divider } from "antd";

function UserVIew({ data }) {
  console.log("Data for userView: ", data);

  const assetArray =
    data.asset && data.asset !== "No assets" ? data.asset.split(",") : [];
  return (
    <div className="font-poppins">
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
        <div>
          <h1 className="text-[1rem] font-semibold">Assigned Assets:</h1>
          {assetArray.length > 0 ? (
            <ul>
              {assetArray.map((item) => (
                <li key={item} className="text-sm">
                  {" "}
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p>No Asset</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserVIew;
