import React, { useState } from "react";
import Button from "../../components/common/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import SearchInput from "../../components/common/SearchInput";
import ModalComponent from "../../components/common/ModalComponent";
import UserForm from "./components/UserForm";
import { useDeleteUser, useUsers } from "../../hooks/useUsers";
import UserTable from "./components/UserTable";
import { Modal } from "antd";
function ManageUser() {
  //State
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null); //for selecting one user for delete/edit
  const [onSelectedUser, setOnselectedUser] = useState([]); //for multiple selection of user for delete
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");

  //Data fetch from hook
  const { data: userData, isLoading } = useUsers({
    page,
    pageSize: 5,
  });

  //Delete hook
  const deleteUserMutation = useDeleteUser();

  const { confirm } = Modal;

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword), setPage(1);
  };

  const handleAddOpenModal = (e) => {
    setOpen(true);
  };

  const handleSearchInput = (e) => {
    const trimmedKeyword = keyword.trim();
    handleSearch(trimmedKeyword);
  };

  const handleEditOpen = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteMultiple = () => {
    if (onSelectedUser.length === 0) {
      confirm({
        title: "please select the user",
        okText: "Yes",
        okType: "danger",
        mask: true,
        cancelText: "No",
        onOk() {
          return;
        },
      });
    } else {
      confirm({
        title: `Are you sure you wan to delet ${onSelectedUser.length} user(s)`,
        okText: "Yes",
        okType: "danger",
        mask: true,
        cancelText: "No",
        onOk() {
          onSelectedUser.forEach((id) => {
            deleteUserMutation.mutate(id);
          }); //All the selected user that was stored in the onSelectedUser state will be foreach and deleted using the hook
          setOnselectedUser([]); //then this will clear all the selected checkbox after deleting
        },
      });
    }
  };

  const handleClose = () => setOpen(false);
  return (
    <div className=" flex flex-col gap-4 ">
      <header className="py-2">
        <h1 className="font-poppins text-2xl font-bold">Employee Management</h1>
        <p className="text-xs font-poppins font-light text-gray-600">
          Add, update, and monitor employee assets
        </p>
      </header>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row  gap-2 w-[50%] ">
            <SearchInput
              bg_color="ffffff"
              onSearch={handleSearch}
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearchInput={handleSearchInput}
              placeholder="Search by Fullname or Email"
            />
            <Button title="Search" variant="primary" />
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
            keyword={searchKeyword}
            page={page}
            setPage={setPage}
          />
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
