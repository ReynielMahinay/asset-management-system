import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { VscKebabVertical } from "react-icons/vsc";
import { useDeleteAsset } from "../../hooks/useAssets";
import { useDeleteUser } from "../../hooks/useUsers";
import { message, Modal } from "antd";
import { useAppNotification } from "./Notificaiton";

const KebabMenu = ({ onEdit, dataId, dataForm, type }) => {
  const deleteAssetMutation = useDeleteAsset();
  const deleteUserMutation = useDeleteUser();
  const notify = useAppNotification(); //notifcation
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { confirm } = Modal;
  const handleClick = (event) => {
    event.stopPropagation(); // prevent row selection
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    if (type === "asset") {
      confirm({
        title: "Are you sure you want to delete this?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          deleteAssetMutation.mutate(dataId);
          notify({
            title: "Asset deleted",
            description: "Asset was deleted succesfuly",
          });
        },
      });
    } else if (type === "user") {
      confirm({
        title: "Are you sure you want to delete this?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          deleteUserMutation.mutate(dataId);
          notify({
            title: "User deleted",
            description: "User was deleted succesfuly",
          });
        },
      });
    }
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <VscKebabVertical size={25} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit(dataForm);
            console.log("On edit data", dataForm);
          }}
        >
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default KebabMenu;
