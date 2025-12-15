import { useState, useEffect, useRef } from "react";
import InputFieldComponent from "../../../components/common/InputFieldComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import { statusOptions } from "../../../data/options";
import Divider from "@mui/material/Divider";
import Button from "../../../components/common/Button";
import { useCreateAsset, useUpdateAsset } from "../../../hooks/useAssets";
import { useAppNotification } from "../../../components/common/Notificaiton";
function AssetForm({ handleClose, mode = "add", modalData = null }) {
  const createMutation = useCreateAsset();
  const updateMutation = useUpdateAsset();
  const notify = useAppNotification(); // for useContext nofitcation details

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    tag: "",
    status: "unassigned",
    assigned_to: null,
  });

  useEffect(() => {
    if (mode === "edit" && modalData) {
      setFormData({
        name: modalData.name || "",
        type: modalData.type || "",
        brand: modalData.brand || "",
        tag: modalData.tag || "",
        status: (modalData.status || "unassigned").toLowerCase(),
        assigned_to: modalData.assignedTo || null,
      });
    }
  }, [mode, modalData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        await createMutation.mutateAsync(formData);
        notify({
          title: "Asset created",
          description: "The asset was added successfully",
        });
      } else {
        await updateMutation.mutateAsync({ id: modalData.id, data: formData });
        notify({
          title: "Asset updated",
          description: "Changes saved successfully",
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting asset:", error);
      notificationRef.current?.("Something went wrong");
    }
  };

  return (
    <div>
      {" "}
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
    </div>
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
