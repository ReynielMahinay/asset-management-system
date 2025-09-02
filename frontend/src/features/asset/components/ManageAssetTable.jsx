import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import { VscKebabVertical } from "react-icons/vsc";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand" },
  {
    id: "serial_number",
    numeric: false,
    disablePadding: false,
    label: "Serial Number",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "time_created",
    numeric: false,
    disablePadding: false,
    label: "Time created",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ numSelected }) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Assets
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Edit Dialog Component
// function EditAssetDialog({ open, onClose, asset, onSave }) {
//   const [editedAsset, setEditedAsset] = React.useState(asset || {});

//   React.useEffect(() => {
//     setEditedAsset(asset || {});
//   }, [asset]);

//   const handleInputChange = (field, value) => {
//     setEditedAsset((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(editedAsset);
//     onClose();
//   };

//   if (!asset) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Edit Asset</DialogTitle>
//       <DialogContent>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//           <TextField
//             label="Name"
//             value={editedAsset.name || ""}
//             onChange={(e) => handleInputChange("name", e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Type"
//             value={editedAsset.type || ""}
//             onChange={(e) => handleInputChange("type", e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Brand"
//             value={editedAsset.brand || ""}
//             onChange={(e) => handleInputChange("brand", e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Status"
//             value={editedAsset.status || ""}
//             onChange={(e) => handleInputChange("status", e.target.value)}
//             fullWidth
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSave} variant="contained">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

export default function ManageAssetTable() {
  const [assetData, setAssetData] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchAssets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assets");
      const data = await res.json();
      console.log("Fetched assets:", data); // 🔎 check what arrives
      setAssetData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  React.useEffect(() => {
    fetchAssets();
  }, []);

  const addAsset = async (newAsset) => {
    await fetch("http://localhost:5000/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsset),
    });
    fetchAssets(); // refresh after adding
  };

  // Action menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [assetToEdit, setAssetToEdit] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(assetData.map((n) => n.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = selected.concat(id);
    else if (selectedIndex === 0) newSelected = selected.slice(1);
    else if (selectedIndex === selected.length - 1)
      newSelected = selected.slice(0, -1);
    else if (selectedIndex > 0)
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Action menu handlers
  const handleActionClick = (event, asset) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAsset(asset);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedAsset(null);
  };

  const handleEditClick = () => {
    setAssetToEdit(selectedAsset);
    setEditDialogOpen(true);
    handleActionClose();
  };

  const handleDeleteClick = () => {
    // Implement delete logic here
    console.log("Delete asset:", selectedAsset);
    handleActionClose();
  };

  const handleSaveAsset = (editedAsset) => {
    // Implement save logic here
    console.log("Save asset:", editedAsset);
    // You would typically update your data source here
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assetData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...assetData]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [assetData, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={assetData.length}
            />
            <TableBody>
              {visibleRows.map((asset) => {
                console.log("Rendering row for:", asset.id);
                const isItemSelected = selected.includes(asset.id);
                const labelId = `enhanced-table-checkbox-${asset.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, asset.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={asset.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {asset.name}
                    </TableCell>
                    <TableCell align="left">{asset.type}</TableCell>
                    <TableCell align="left">{asset.brand}</TableCell>
                    {/* <TableCell align="left">{asset.serialNumber}</TableCell> */}
                    <TableCell align="left">{asset.status}</TableCell>
                    <TableCell align="left">{asset.timeCreated}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(event) => handleActionClick(event, asset)}
                        size="small"
                      >
                        <VscKebabVertical />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={assetData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            {/* <EditIcon fontSize="small" /> */}
            ✏️
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            {/* <DeleteIcon fontSize="small" /> */}
            🗑️
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      {/* <EditAssetDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        asset={assetToEdit}
        onSave={handleSaveAsset}
      /> */}
    </Box>
  );
}
