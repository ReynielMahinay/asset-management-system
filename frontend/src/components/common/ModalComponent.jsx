import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import AssetForm from "../../features/asset/components/AssetForm";

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

function ModalComponent({ handleClose, open, mode = "add", asset }) {
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
                  {mode === "add" ? "Add new Asset" : "Edit Asset"}
                </p>
                <p className="font-poppins text-gray-1000 text-[0.7rem] font-light">
                  {mode === "add"
                    ? "Add a new asset to your inventory. All fields marked with * are required."
                    : "Update the asset details below."}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
              >
                <IoClose size={17} />
              </button>
            </div>

            <AssetForm handleClose={handleClose} mode={mode} asset={asset} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalComponent;
