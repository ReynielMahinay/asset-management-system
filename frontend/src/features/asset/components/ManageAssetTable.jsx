import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Toolbar,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../../../api/assets";

const columnMap = {
  name: "asset_name",
  type: "asset_type",
  brand: "asset_brand",
  serialNumber: "serial_number",
  status: "asset_status",
  timeCreated: "created_at",
};

// Table Head Cells
const headCells = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "brand", label: "Brand" },
  { id: "serialNumber", label: "Tag" },
  { id: "status", label: "Status" },
  { id: "timeCreated", label: "Time Created" },
];

// Table Head Component
function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
  numSelected,
  rowCount,
  onSelectAllClick,
}) {
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
          />
        </TableCell>
        {headCells.map((cell) => (
          <TableCell
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id && (
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

// Toolbar
function EnhancedTableToolbar({ numSelected, isRefreshing }) {
  return (
    <Toolbar
      sx={{
        pl: 2,
        pr: 1,
        ...(numSelected > 0 && {
          bgcolor: (theme) => theme.palette.action.activatedOpacity,
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 100%" }}>
          <Typography variant="h6" component="div">
            Assets
          </Typography>
          {isRefreshing && <CircularProgress size={20} sx={{ ml: 2 }} />}
        </Box>
      )}
    </Toolbar>
  );
}

// Main Table Component
export default function ManageAssetTable({ setAssetTotal }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Fetch assets (server-side)
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["assets", page, rowsPerPage, orderBy, order],
    queryFn: () =>
      fetchAssets({
        page: page + 1,
        pageSize: rowsPerPage,
        sort: columnMap[orderBy] || "asset_id",
        order,
      }),
    keepPreviousData: true,
    onSuccess: (data) => setAssetTotal?.(Number(data.total)),
  });

  const handleRequestSort = (_, property) => {
    setOrder((prev) =>
      orderBy === property && prev === "asc" ? "desc" : "asc"
    );
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) =>
    setSelected(e.target.checked ? data.data.map((n) => n.id) : []);

  const handleClick = (_, id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Alert severity="error">{error?.message || "Error loading assets"}</Alert>
    );

  const emptyRows = Math.max(0, rowsPerPage - data.data.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          isRefreshing={isFetching}
        />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              numSelected={selected.length}
              rowCount={data.data.length} // Use total here!
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {data.data.map((asset) => (
                <TableRow
                  key={asset.id}
                  hover
                  onClick={(e) => handleClick(e, asset.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(asset.id)} />
                  </TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.brand}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.timeCreated}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.total} // total rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
