import React from "react";
import InputFieldComponent from "./InputFieldComponent";
import SelectComponent from "./SelectComponent";
import { brandOptions, statusOptions } from "../../data/options";
import Divider from "@mui/material/Divider";
import Button from "./Button";

function AssetForm({ handleClose }) {
  return (
    <div className="bg-white rounded-md w-full">
      <form action="" className="flex flex-col gap-4">
        {/* <InputFieldComponent label="Tag" className="flex-1" /> */}
        <InputFieldComponent label="Name" className="flex-1" />

        <div className="flex flex-row gap-4 w-full">
          <span className="flex-1">
            <InputFieldComponent label="Type" className="flex-1" />
            <p className="text-gray-500 text-[.7rem] font-open-sans font-light pl-1">
              ex. Laptop, Monitor
            </p>
          </span>

          <span className="flex-1">
            <InputFieldComponent label="Brand" className="flex-1" />
            <p className="text-gray-500 text-[.7rem] font-open-sans font-light pl-1">
              ex. Lenovo, Dell
            </p>
          </span>
        </div>
        <div className="flex flex-row gap-2">
          {/* <SelectComponent options={brandOptions} label="Type" /> */}
          <SelectComponent options={statusOptions} label="Status" />
        </div>

        <Divider />
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button title="Cancel" variant="danger" onClick={handleClose} />
          <Button title="Submit" className="" />
        </div>
      </form>
    </div>
  );
}

export default AssetForm;
