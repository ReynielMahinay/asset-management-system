import React, { useState, useRef, useEffect } from "react";
import { assetData } from "../../model/SampleData";
import { VscKebabVertical } from "react-icons/vsc";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Button from "../common/Button";

function AssetTable() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (id) => {
    setIsOpen((prevId) => (prevId === id ? "null" : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto rounded-md shadow-md flex-1">
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
                <div
                  className="relative"
                  ref={isOpen === asset.id ? menuRef : null}
                >
                  <button
                    className="cursor-pointer text-center"
                    onClick={() => handleClick(asset.id)}
                  >
                    <VscKebabVertical size={16} />
                  </button>
                  {isOpen === asset.id && (
                    <div className="absolute right-1 top-0 z-50 w-30 h-20 p-3 rounded shadow-lg bg-white text-midnight">
                      <Button
                        title="Edit"
                        variant="secondary"
                        icon={<FaEdit />}
                      />
                      <Button
                        title="Delete"
                        variant="danger"
                        icon={<RiDeleteBinLine />}
                      />
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
