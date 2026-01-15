import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import SelectComponent from "../../../components/form/SelectComponent";
import InputFieldComponent from "../../../components/form/InputFieldComponent";
import Button from "../../../components/common/Button";
import { roleOptions } from "../../../data/options";
import { useCreateUser, useUpdateUser } from "../../../hooks/useUsers";
import { useAppNotification } from "../../../components/common/Notificaiton";

function UserForm({ handleClose, mode = "add", modalData }) {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const notify = useAppNotification();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department: "",
    role: "technical",
  });

  useEffect(() => {
    if (mode === "edit" && modalData) {
      setFormData({
        fullname: modalData.fullname || "",
        email: modalData.email || "",
        department: modalData.department || "",
        role: modalData.role || "technical",
      });
    }
  }, [mode, modalData]);

  const handleChange = (field, value) => {
    console.log(field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        await createMutation.mutateAsync(formData);
        notify({
          title: "User created",
          description: "The user was added successfully",
        });
      } else {
        await updateMutation.mutateAsync({ id: modalData.id, data: formData });
        notify({
          title: "User updated",
          description: "Changes saved successfully",
        });
      }
      console.log("Form data: ", formData);
      handleClose();
    } catch (error) {
      console.error("Error submitting user: ", error);
      notify({
        title: "Error submitting",
        description: "The user was not created successfully",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputFieldComponent
        label="name"
        value={formData.fullname}
        onChange={(e) => handleChange("fullname", e.target.value)}
      />
      <InputFieldComponent
        label="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <InputFieldComponent
        label="department"
        value={formData.department}
        onChange={(e) => handleChange("department", e.target.value)}
      />
      <SelectComponent
        label="Role"
        options={roleOptions}
        value={formData.role || "technical"}
        onChange={(val) => {
          console.log("Selected role:", val);
          handleChange("role", val);
        }}
      />

      <Divider />
      <div className="flex flex-row gap-2 justify-end items-center">
        <Button title="cancel" variant="danger" onClick={handleClose} />
        <Button
          title={`${mode === "add" ? "Submit" : "Save changes"}`}
          variant="modal_primary"
          type="submit"
        />
      </div>
    </form>
  );
}

UserForm.modalConfig = (mode) => ({
  title: mode === "add" ? "Add user" : "Edit user",
  description:
    mode === "add"
      ? "Create new employee to the invetory. All fields marked with * are required"
      : "Update employee details below.",
});

export default UserForm;
