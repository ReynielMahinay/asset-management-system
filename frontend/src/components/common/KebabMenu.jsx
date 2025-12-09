import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { VscKebabVertical } from "react-icons/vsc";
import { useDeleteAsset } from "../../hooks/useAssets";

const KebabMenu = ({ onEdit, dataId, dataForm, type }) => {
  const deleteAssetMutation = useDeleteAsset();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation(); // prevent row selection
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    if (type === "asset") {
      deleteAssetMutation.mutate(dataId);
    } else if (type === "user") {
      console.log("testing dynamic deletion");
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
