import React from "react";
import InputFieldComponent from "./InputFieldComponent";
import SelectComponent from "./SelectComponent";
import { brandOptions, statusOptions } from "../../data/options";
import Button from "./Button";
function AssetForm() {
  return (
    <div className="bg-white rounded-md p-4">
      <form action="">
        <div>
          <InputFieldComponent label="Name" />
          <InputFieldComponent label="Brand" />
        </div>
        <div>
          <SelectComponent options={brandOptions} label="Type" />
          <SelectComponent options={statusOptions} label="Status" />
        </div>
        <Button title="Submit" className="" />
      </form>
    </div>
  );
}

export default AssetForm;
