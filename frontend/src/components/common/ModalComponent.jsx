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
  borderRadius: "2%",
  boxShadow: 24,
  p: 2,
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
            <div className="flex flex-col gap-10 w-full">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-2">
                  <p className="font-poppins text-black text-[1.2rem] font-bold">
                    Add new Asset
                  </p>
                  <p className="font-poppins text-gray-1000 text-[0.7rem] font-light">
                    Add a new asset to your inventory. All fields marked with *
                    are required.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="cursor-pointer hover:bg-gray-200 rounded-full p-1 "
                >
                  <IoClose size={17} />
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
