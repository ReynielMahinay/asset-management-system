import React from "react";
import ManangerUserTable from "./components/ManageUserTable";
import { userData } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import DatePickerComponent from "../../components/common/DatePickerComponent";
import SelectComponent from "../../components/common/SelectComponent";
import { departmentOptions } from "../../data/options";

function ManageUser() {
  return (
    <div className=" flex flex-col gap-4 ">
      <div className="bg-white rounded-md shadow-sm  ">
        <div className="flex flex-row justify-between border-b border-gray-200 p-4 ">
          <p>
            Total Users:
            <span className="font-open-sans font-semibold text-2xl ">
              {userData.length}
            </span>
          </p>
          <div className="flex flex-row gap-2">
            <Button
              title="Add User"
              icon={<FaPlus size={12} variant="primary" />}
            />
            <Button title="Delete User" variant="danger_primary" />
          </div>
        </div>
        <div className="flex flex-col p-4 gap-3">
          <div className="flex flex-row gap-2">
            <DatePickerComponent />
            <SelectComponent
              label="Department"
              options={departmentOptions}
              margin={1}
            />
            <SelectComponent
              label="Department"
              options={departmentOptions}
              margin={1}
            />
          </div>

          <div className="w-full bg-[#e0edfa9f] p-2 rounded-md ">
            <p className="text-xs text-gray-400 font-open-sans">
              Filters Applied:
            </p>
          </div>
        </div>
      </div>

      <div>
        <ManangerUserTable />
      </div>
    </div>
  );
}

export default ManageUser;
