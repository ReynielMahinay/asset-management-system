import React, { useState } from "react";
import Button from "../../components/common/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import SearchInput from "../../components/form/SearchInput";
import ModalComponent from "../../components/modals/ModalComponent";
import UserForm from "./components/EmployeeForm";
import { useDeleteUser, useUsers } from "../../hooks/useUsers";
import UserTable from "./components/EmployeeTable";
import { Modal } from "antd";
import { useAppNotification } from "../../components/common/Notificaiton";
import ModalView from "../../components/modals/ModalView";
import UserVIew from "./components/EmployeeVIew";
function ManageEmployee() {
  // <-------------------states for modals---------------------->
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [openModalUserInfo, setOpenModaUserInfo] = useState(false);

  // <-------------------states for user intervention---------------------->
  const [selectedUser, setSelectedUser] = useState(null); //for selecting one user for delete/edit
  const [onSelectedUser, setOnselectedUser] = useState([]); //for multiple selection of user for delete
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("fullname");
  const [order, setOrder] = useState("asc");

  // <-------------------return function hook---------------------->
  const notify = useAppNotification();

  // Column mapping for sorting
  const columnMap = {
    fullname: "user_fullname",
    email: "user_email",
    department: "user_department",
    role: "user_role",
  };

  // Fetch user data with react-query
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useUsers({
    page: page,
    pageSize: rowsPerPage,
    sort: columnMap[orderBy] || "user_id",
    order,
    keyword,
  });
  console.log("Manage user data: ", data);
  //Delete hook
  const deleteUserMutation = useDeleteUser();

  const { confirm } = Modal;

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword), setPage(1);
  };

  const handleModalOpen = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSearchInput = (e) => {
    const trimmedKeyword = keyword.trim();
    handleSearch(trimmedKeyword);
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
        title: `Are you sure you wan to deleted ${onSelectedUser.length} user(s)`,
        okText: "Yes",
        okType: "danger",
        mask: true,
        cancelText: "No",
        onOk() {
          onSelectedUser.forEach((id) => {
            deleteUserMutation.mutate(id);
          }); //All the selected user that was stored in the onSelectedUser state will be foreach and deleted using the hook
          setOnselectedUser([]); //then this will clear all the selected checkbox after deleting
          notify({
            title: "Assets Deleted",
            description: `${onSelectedUser.length} asset was deleted`,
          });
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
              onClick={() => handleModalOpen("add")}
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
            //<-------------- for user intervention ------------------->
            setSelectedUser={setSelectedUser}
            onSelectedUser={onSelectedUser}
            setOnselectedUser={setOnselectedUser}
            keyword={searchKeyword}
            //<-------------- table props ------------------->
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            data={data}
            rowsPerPage={rowsPerPage}
            setUserTotal={(total) => console.log("Total users:", total)}
            //<-------------- for modal ------------------->
            onEdit={(user) => handleModalOpen("edit", user)}
            setOpenModaUserInfo={setOpenModaUserInfo}
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

      <ModalView
        data={selectedUser}
        open={openModalUserInfo}
        close={setOpenModaUserInfo}
        ViewComponent={UserVIew}
      />
    </div>
  );
}

export default ManageEmployee;
