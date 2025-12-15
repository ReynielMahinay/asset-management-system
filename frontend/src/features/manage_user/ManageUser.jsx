import React, { useState } from "react";
import ManangerUserTable from "./components/ManageUserTable";
import { userData } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import SearchInput from "../../components/common/SearchInput";
import ModalComponent from "../../components/common/ModalComponent";
import UserForm from "./components/UserForm";
import { useDeleteUser, useUsers } from "../../hooks/useUsers";
import UserTable from "./components/UserTable";

function ManageUser() {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null); //for selecting one user for delete/edit
  const [onSelectedUser, setOnselectedUser] = useState([]); //for multiple selection of user for delete
  const [page, setPage] = useState(1);
  const { data: userData, isLoading } = useUsers({
    page,
    pageSize: 5,
  });

  const deleteUserMutation = useDeleteUser();

  const handleAddOpenModal = (e) => {
    setOpen(true);
  };

  const handleEditOpen = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteMultiple = () => {
    if (onSelectedUser.length === 0) {
      alert("Please select user to delete");
      return;
    } //checking if no selected user

    const confirmDelete = window.confirm(
      `Delete ${onSelectedUser.length} selected user(s)`
    ); //window alert confirmation for deleting selected user

    if (!confirmDelete) return; // if no selected just return nothing

    onSelectedUser.forEach((id) => {
      deleteUserMutation.mutate(id);
    }); //All the selected user that was stored in the onSelectedUser state will be foreach and deleted using the hook

    setOnselectedUser([]); //then this will clear all the selected checkbox after deleting
  };

  const handleClose = () => setOpen(false);
  return (
    <div className=" flex flex-col gap-10 ">
      <div>
        <p className="font-poppins text-2xl font-semibold">
          Employee Management{" "}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="w-[50%]">
            <SearchInput bg_color="ffffff" />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              title="Add User"
              icon={<IoMdAddCircleOutline size={18} variant="primary" />}
              onClick={handleAddOpenModal}
            />
            <Button
              icon={<MdDeleteOutline size={18} />}
              title="Delete User"
              variant="primary"
              onClick={handleDeleteMultiple}
            />
          </div>
        </div>

        <div>
          <UserTable
            onEdit={handleEditOpen}
            setUserTotal={(total) => console.log("Total users:", total)}
            onSelectedUser={onSelectedUser}
            setOnselectedUser={setOnselectedUser}
          />
          {/* <ManangerUserTable
          onEdit={handleEditOpen}
          setUserTotal={(total) => console.log("Total users:", total)}
          onSelectedUser={onSelectedUser}
          setOnselectedUser={setOnselectedUser}
        /> */}
        </div>
      </div>

      <ModalComponent
        open={open}
        mode={modalMode}
        FormComponent={UserForm}
        handleClose={handleClose}
        modalData={selectedUser}
      />
    </div>
  );
}

export default ManageUser;
