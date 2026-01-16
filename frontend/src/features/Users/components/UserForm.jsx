import React from "react";
import InputFieldComponent from "../../../components/form/InputFieldComponent";
import SelectComponent from "../../../components/form/SelectComponent";
import Button from "../../../components/common/Button";
import { userRoleOptions } from "../../../data/options";
import { Divider } from "antd";
function UserForm({ mode = "add" }) {
  return (
    <form onSubmit={""} className="flex flex-col gap-4">
      <InputFieldComponent label="Name" />
      <InputFieldComponent label="Email" />
      <SelectComponent label="Role" options={userRoleOptions} />

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
