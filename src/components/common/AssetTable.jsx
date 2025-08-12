import React, { useState } from "react";
import { assetData } from "../../model/SampleData";
import { VscKebabVertical } from "react-icons/vsc";

function AssetTable() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full overflow-y-auto rounded-xl shadow-md">
      <table className="w-full border-collapse bg-white">
        <thead className="bg-[#d6e9fc] sticky top-0 z-10">
          <tr className="text-sm text-gray-500">
            <th className="font-dm-sans px-4 py-2 text-start">Name</th>
            <th className="px-4 py-2 text-start">Type</th>
            <th className="px-4 py-2 text-start">Brand</th>
            <th className="px-4 py-2 text-start">Status</th>
            <th className="px-4 py-2 text-start">Time Created</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {assetData.map((asset, index) => (
            <tr
              key={index}
              className="border-b border-[#aaaeb3b0] text-[.8rem] font-open-sans"
            >
              <td className="px-4 py-2">{asset.name}</td>
              <td className="px-4 py-2">{asset.type}</td>
              <td className="px-4 py-2">{asset.brand}</td>
              <td
                className={`px-4 py-2 ${
                  asset.status === "Assigned"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {asset.status}
              </td>
              <td className="px-4 py-2">{asset.timeCreated}</td>
              <td className="px-4 py-2 flex justify-center items-center ">
                <div className="relative">
                  <button
                    className="cursor-pointer text-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <VscKebabVertical />
                  </button>
                  {isOpen && (
                    <div className="absolute right-10 top-8 z-50 w-40 bg-red-500">
                      dsad
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
