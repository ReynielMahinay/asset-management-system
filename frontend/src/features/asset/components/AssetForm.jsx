import { useState, useEffect } from "react";
import InputFieldComponent from "../../../components/common/InputFieldComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import { statusOptions } from "../../../data/options";
import Divider from "@mui/material/Divider";
import Button from "../../../components/common/Button";
import { useCreateAsset, useUpdateAsset } from "../../../hooks/useAssets";
import { MdDescription } from "react-icons/md";

function AssetForm({ handleClose, mode = "add", asset = null }) {
  const createMutation = useCreateAsset();
  const updateMutation = useUpdateAsset();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    tag: "",
    status: "unassigned",
    assigned_to: null,
  });

  useEffect(() => {
    if (mode === "edit" && asset) {
      setFormData({
        name: asset.name || "",
        type: asset.type || "",
        brand: asset.brand || "",
        tag: asset.tag || "",
        status: (asset.status || "unassigned").toLowerCase(),
        assigned_to: asset.assignedTo || null,
      });
    }
  }, [mode, asset]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        await createMutation.mutateAsync(formData);
      } else {
        await updateMutation.mutateAsync({ id: asset.id, data: formData });
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting asset:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputFieldComponent
        label="Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

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

      <InputFieldComponent
        label="Tag / Serial Number"
        value={formData.tag}
        onChange={(e) => handleChange("tag", e.target.value)}
      />

      <SelectComponent
        label="Status"
        options={statusOptions}
        value={formData.status || "unassigned"}
        onChange={(val) => handleChange("status", val)}
      />

      <Divider />

      <div className="flex flex-row gap-2 justify-end items-center">
        <Button title="Cancel" variant="danger" onClick={handleClose} />
        <Button
          title={mode === "add" ? "Submit" : "Save changes"}
          variant="modal_primary"
          type="submit"
        />
      </div>
    </form>
  );
}

AssetForm.modalConfig = (mode) => ({
  title: mode === "add" ? "Add Asset" : "Edit Asset",
  description:
    mode === "add"
      ? "Add a new asset to your inventory. All fields marked with * are required."
      : "Update the asset details below.",
});

export default AssetForm;
