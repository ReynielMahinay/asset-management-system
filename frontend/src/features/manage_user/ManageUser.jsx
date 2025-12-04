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

function ManageUser() {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const handleAddOpenModal = (e) => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <div className=" flex flex-col gap-4 ">
      <div className="bg-white rounded-xl shadow-sm  ">
        <div className="flex flex-row justify-between items-center border-b border-gray-300 p-4 ">
          <p className="font-light text-sm flex flex-row gap-3 justify-center items-center font-poppins">
            Total Users:
            <span className=" font-bold text-[1.8rem] ">{userData.length}</span>
          </p>

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
            />
          </div>
        </div>
        <div className=" p-4 ">
          <SearchInput />
        </div>
      </div>
      <div>
        <ManangerUserTable />
      </div>
      <ModalComponent
        open={open}
        mode={modalMode}
        FormComponent={UserForm}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ManageUser;
