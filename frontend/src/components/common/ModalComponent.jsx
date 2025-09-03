import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AssetForm from "../../features/asset/components/AssetForm";
import { IoClose } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "2%",
  boxShadow: 24,
  p: 4,
};

function ModalComponent({ handleClose, open }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-between items-center">
                <p className="font-poppins text-midnight text-2xl font-bold">
                  Add Asset
                </p>
                <button
                  onClick={handleClose}
                  className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <AssetForm handleClose={handleClose} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
