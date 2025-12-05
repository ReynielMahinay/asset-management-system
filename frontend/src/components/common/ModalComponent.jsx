import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "2%",
  boxShadow: 24,
  p: 2,
};

function ModalComponent({
  handleClose,
  open,
  mode = "add",
  modalData,
  FormComponent,
}) {
  const config =
    typeof FormComponent.modalConfig === "function"
      ? FormComponent.modalConfig(mode)
      : { title: "", description: "" };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col gap-2">
                <p className="font-poppins text-black text-[1.2rem] font-bold">
                  {config.title}
                </p>
                <p className="font-poppins text-gray-1000 text-[0.7rem] font-light">
                  {config.description}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
              >
                <IoClose size={17} />
              </button>
            </div>

            <FormComponent
              handleClose={handleClose}
              mode={mode}
              modalData={modalData}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalComponent;
