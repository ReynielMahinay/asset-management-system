import React from "react";
import InputFieldComponent from "./InputFieldComponent";
import SelectComponent from "./SelectComponent";
import { brandOptions, statusOptions } from "../../data/options";
import Divider from "@mui/material/Divider";
import Button from "./Button";
function AssetForm({ handleClose }) {
  return (
    <div className="bg-white rounded-md ">
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-1 flex-col gap-2 ">
          <InputFieldComponent label="Name" />
          <InputFieldComponent label="Brand" />
        </div>
        <div className="flex flex-row gap-2">
          <SelectComponent options={brandOptions} label="Type" />
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
