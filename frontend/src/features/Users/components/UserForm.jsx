import { React, useState } from "react";
import InputFieldComponent from "../../../components/form/InputFieldComponent";
import SelectComponent from "../../../components/form/SelectComponent";
import Button from "../../../components/common/Button";
import { userRoleOptions } from "../../../data/options";
import { Divider, Input } from "antd";
import { useCreateAccount } from "../../../hooks/useAccounts";
import { useAppNotification } from "../../../components/common/Notificaiton";

function UserForm({ handleClose, mode = "add" }) {
  const createMutation = useCreateAccount();
  const notify = useAppNotification();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });

  const handleChanges = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        console.log(formData);
        await createMutation.mutateAsync(formData);
        notify({
          title: "User created",
          description: "The user was created successfully",
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputFieldComponent
        label="Name"
        value={formData.username}
        onChange={(e) => handleChanges("username", e.target.value)}
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
        onChange={(val) => handleChanges("role", val)}
      />

      <Divider />

      <div className="flex flex-row justify-end items-center gap-2">
        <Button title="canel" />

        <Button title="submit" type="submit" />
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
