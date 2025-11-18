import React, { useState } from "react";
import InputFieldComponent from "../../../components/common/InputFieldComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import { statusOptions } from "../../../data/options";
import Divider from "@mui/material/Divider";
import Button from "../../../components/common/Button";
import { useQueryClient } from "@tanstack/react-query";

function AssetForm({ handleClose }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    tag: "",
    status: "unassigned",
    assigned_to: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit click", formData);

    try {
      const res = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Asset saved:", data);

        // Refresh asset table
        queryClient.invalidateQueries(["assets"]);
        handleClose();
      } else {
        console.error("Failed to save asset");
      }
    } catch (error) {
      console.error("Error submitting asset:", error);
    }
  };

  return (
    <div className="bg-white rounded-md w-full p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <InputFieldComponent
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {/* Type & Brand */}
        <div className="flex flex-row gap-4 w-full">
          <InputFieldComponent
            label="Type"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="flex-1"
          />
          <InputFieldComponent
            label="Brand"
            value={formData.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Tag */}
        <InputFieldComponent
          label="Tag"
          value={formData.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
        />

        {/* Status */}
        <SelectComponent
          options={statusOptions}
          label="Status"
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
        />

        <Divider />

        {/* Buttons */}
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button title="Cancel" variant="danger" onClick={handleClose} />
          <Button title="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default AssetForm;
