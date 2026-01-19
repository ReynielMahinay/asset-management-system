import { React, useState } from "react";
import UsersTable from "./components/UsersTable";
import { TbUserPlus } from "react-icons/tb";
import ModalComponent from "../../components/modals/ModalComponent";
import UseForm from "../Users/components/UserForm";
import Button from "../../components/common/Button";
import { useAccounts } from "../../hooks/useAccounts";

function Users() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = useAccounts({
    page: page,
    pageSize: rowsPerPage,
  });

  const handleModalOpen = (mode) => {
    setModalOpen(true);
    setModalMode(mode);
  };
  console.log(modalMode);
  const handleModalClose = () => setModalOpen(false);
  return (
    <div>
      <header className="py-2">
        <h1 className="font-poppins text-2xl font-bold">User Management</h1>
        <p className="text-xs font-poppins font-light text-gray-600">
          Add, update and delete user access
        </p>
      </header>
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button
            title="Add user"
            icon={<TbUserPlus size={18} />}
            variant="primary"
            onClick={() => handleModalOpen("add")}
          />
        </div>
        <UsersTable
          data={data?.data?.rows}
          page={page}
          pageSize={rowsPerPage}
        />
      </div>
      <ModalComponent
        open={modalOpen}
        FormComponent={UseForm}
        handleClose={handleModalClose}
        mode={modalMode}
      />
    </div>
  );
}

export default Users;
