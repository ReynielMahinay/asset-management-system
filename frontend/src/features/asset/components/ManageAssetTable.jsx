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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { visuallyHidden } from "@mui/utils";
import { VscKebabVertical } from "react-icons/vsc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API functions
const fetchAssets = async () => {
  const response = await fetch("http://localhost:5000/api/assets");
  if (!response.ok) {
    throw new Error("Failed to fetch assets");
  }
  return response.json();
};

const updateAsset = async (asset) => {
  const response = await fetch(`http://localhost:5000/api/assets/${asset.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(asset),
  });
  if (!response.ok) {
    throw new Error("Failed to update asset");
  }
  return response.json();
};

const deleteAsset = async (assetId) => {
  const response = await fetch(`http://localhost:5000/api/assets/${assetId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete asset");
  }
  return response.json();
};

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
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand" },
  { id: "serial_number", numeric: false, disablePadding: false, label: "Tag" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "time_created",
    numeric: false,
    disablePadding: false,
    label: "Time created",
  },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
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
            inputProps={{ "aria-label": "select all assets" }}
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

function EnhancedTableToolbar({ numSelected, isRefreshing }) {
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
        <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 100%" }}>
          <Typography variant="h6" id="tableTitle" component="div">
            Assets
          </Typography>
          {isRefreshing && <CircularProgress size={20} sx={{ ml: 2 }} />}
        </Box>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  isRefreshing: PropTypes.bool,
};

// Edit Dialog Component
function EditAssetDialog({ open, onClose, asset, onSave }) {
  const [editedAsset, setEditedAsset] = React.useState(asset || {});

  React.useEffect(() => {
    setEditedAsset(asset || {});
  }, [asset]);

  const handleInputChange = (field, value) => {
    setEditedAsset((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedAsset);
    onClose();
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Name"
            value={editedAsset.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Type"
            value={editedAsset.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
            fullWidth
          />
          <TextField
            label="Brand"
            value={editedAsset.brand || ""}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            fullWidth
          />
          <TextField
            label="Status"
            value={editedAsset.status || ""}
            onChange={(e) => handleInputChange("status", e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ManageAssetTable({ setAssetTotal }) {
  const queryClient = useQueryClient();

  // TanStack Query for fetching assets
  const {
    data: assetData = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isRefetching,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
    refetchOnWindowFocus: true, // Refetch when window gains focus
    refetchOnMount: true, // Refetch when component mounts
    onSuccess: (data) => {
      if (setAssetTotal) {
        setAssetTotal(Number(data.total));
      }
    },
  });

  // Mutation for updating assets
  const updateAssetMutation = useMutation({
    mutationFn: updateAsset,
    onSuccess: () => {
      // Invalidate and refetch assets query
      queryClient.invalidateQueries(["assets"]);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  // Mutation for deleting assets
  const deleteAssetMutation = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      // Invalidate and refetch assets query
      queryClient.invalidateQueries(["assets"]);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Action menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [assetToEdit, setAssetToEdit] = React.useState(null);

  // Update asset total when data changes
  React.useEffect(() => {
    if (setAssetTotal && assetData?.total !== undefined) {
      setAssetTotal(Number(assetData.total));
    }
  }, [assetData?.total, setAssetTotal]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(assetData.data.map((n) => n.id));
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
    if (selectedAsset) {
      deleteAssetMutation.mutate(selectedAsset.id);
    }
    handleActionClose();
  };

  const handleSaveAsset = (editedAsset) => {
    updateAssetMutation.mutate(editedAsset);
  };

  // Manual refetch function
  const handleRefresh = () => {
    queryClient.invalidateQueries(["assets"]);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - assetData.data.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      [...assetData.data]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [assetData.data, order, orderBy, page, rowsPerPage]
  );

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          Error loading assets: {error?.message || "Unknown error"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          isRefreshing={isRefetching}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={assetData.data.length}
            />
            <TableBody>
              {visibleRows.map((asset) => {
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
                    <TableCell align="left">{asset.serialNumber}</TableCell>
                    <TableCell align="left">{asset.status}</TableCell>
                    <TableCell align="left">{asset.timeCreated}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(event) => handleActionClick(event, asset)}
                        size="small"
                        disabled={
                          updateAssetMutation.isLoading ||
                          deleteAssetMutation.isLoading
                        }
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
          count={assetData.data.length}
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
        <MenuItem
          onClick={handleEditClick}
          disabled={updateAssetMutation.isLoading}
        >
          <ListItemIcon>✏️</ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          disabled={deleteAssetMutation.isLoading}
        >
          <ListItemIcon>🗑️</ListItemIcon>
          <ListItemText>
            {deleteAssetMutation.isLoading ? "Deleting..." : "Delete"}
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <EditAssetDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        asset={assetToEdit}
        onSave={handleSaveAsset}
      />
    </Box>
  );
}
