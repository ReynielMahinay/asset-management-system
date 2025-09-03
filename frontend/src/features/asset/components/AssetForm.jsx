import React, { useState } from "react";
import InputFieldComponent from "../../../components/common/InputFieldComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import { brandOptions, statusOptions } from "../../../data/options";
import Divider from "@mui/material/Divider";
import Button from "../../../components/common/Button";

function AssetForm({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit click");
    try {
      const res = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Asset saved:", data);
        handleClose();
      } else {
        console.log("Failed to save asset");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-white rounded-md w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <InputFieldComponent label="Tag" className="flex-1" /> */}
        <InputFieldComponent
          label="Name"
          className="flex-1"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div className="flex flex-row gap-4 w-full">
          <span className="flex-1">
            <InputFieldComponent
              label="Type"
              className="flex-1"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
            <p className="text-gray-500 text-[.7rem] font-open-sans font-light pl-1">
              ex. Laptop, Monitor
            </p>
          </span>

          <span className="flex-1">
            <InputFieldComponent
              label="Brand"
              className="flex-1"
              value={formData.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
            />
            <p className="text-gray-500 text-[.7rem] font-open-sans font-light pl-1">
              ex. Lenovo, Dell
            </p>
          </span>
        </div>

        <div>
          <InputFieldComponent label="Tag" className="flex-1" />
        </div>
        <div className="flex flex-row gap-2">
          {/* <SelectComponent options={brandOptions} label="Type" /> */}
          <SelectComponent options={statusOptions} label="Status" />
        </div>

        <Divider />
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button title="Cancel" variant="danger" onClick={handleClose} />
          <Button title="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default AssetForm;
