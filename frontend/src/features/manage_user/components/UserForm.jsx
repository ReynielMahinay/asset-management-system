import { useState } from "react";
import Divider from "@mui/material/Divider";
import SelectComponent from "../../../components/common/SelectComponent";
import InputFieldComponent from "../../../components/common/InputFieldComponent";
import Button from "../../../components/common/Button";
import { roleOptions } from "../../../data/options";
function UserForm({ handleClose, mode = "add" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    joined_data: "",
  });
  return (
    <form className="flex flex-col gap-4">
      <InputFieldComponent label="name" value={formData.name} />
      <InputFieldComponent label="email" value={formData.email} />
      <InputFieldComponent label="department" value={formData.department} />
      <SelectComponent
        label="Role"
        options={roleOptions}
        value={formData.role}
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
      ? "Create new user to the invetory. All fields marked with * are required"
      : "Update user details below.",
});

export default UserForm;
