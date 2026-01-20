import { React, useState } from "react";
import InputFieldComponent from "../../../components/form/InputFieldComponent";
import SelectComponent from "../../../components/form/SelectComponent";
import Button from "../../../components/common/Button";
import { userRoleOptions } from "../../../data/options";
import { Divider, Input } from "antd";
function UserForm({ mode = "add" }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "",
    email: "",
  });

  const handleChanges = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={""} className="flex flex-col gap-4">
      <InputFieldComponent
        label="Name"
        value={formData.name}
        onChange={(e) => handleChanges("name", e.target.value)}
      />
      <InputFieldComponent
        label="Password"
        value={formData.password}
        onChange={(e) => handleChanges("password", e.target.value)}
      />
      <InputFieldComponent
        label="Email"
        value={formData.email}
        onChange={(e) => handleChanges("email", e.target.value)}
      />
      <SelectComponent
        label="Role"
        options={userRoleOptions}
        value={formData.role}
      />

      <Divider />

      <div className="flex flex-row justify-end items-center gap-2">
        <Button title="canel" />

        <Button title="submit" />
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
