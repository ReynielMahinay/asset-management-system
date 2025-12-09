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
import KebabMenu from "../../../components/common/KebabMenu";

const columnMap = {
  name: "asset_name",
  type: "asset_type",
  brand: "asset_brand",
  serialNumber: "serial_number",
  tag: "asset_tag",
  status: "asset_status",
  timeCreated: "created_at",
  timeUpdated: "updated_at",
};

const headCells = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "brand", label: "Brand" },
  { id: "serialNumber", label: "Tag" },
  { id: "status", label: "Status" },
  { id: "timeCreated", label: "Time Created" },
  { id: "timeUpdated", label: "Time Updated" },
  { id: "action", label: "Action" },
];

// Table Head Component
function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
  onSelectedAsset,
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
            checked={onSelectedAsset.length === rowCount && rowCount > 0}
            indeterminate={
              onSelectedAsset.length > 0 && onSelectedAsset.length < rowCount
            }
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((cell) => (
          <TableCell
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{
              fontWeight: "bold",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
            }}
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
      sx={(theme) => ({
        pl: 2,
        pr: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        border: "1px solid #e0e0e0",
        bgcolor:
          numSelected > 0
            ? "#f1f5f9" // or theme.palette.action.selected
            : "#f1f5f9",
      })}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: "1 1 100%",
          }}
        >
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
export default function ManageAssetTable({
  setAssetTotal,
  onEdit,
  keyword = "",
  onSelectedAsset,
  onSelectedChange,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Fetch assets
  const {
    data = { total: 0, data: [] },
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["assets", page, rowsPerPage, orderBy, order, keyword],
    queryFn: () =>
      fetchAssets({
        page: page + 1,
        pageSize: rowsPerPage,
        sort: columnMap[orderBy] || "asset_id",
        order,
        keyword,
      }),
    keepPreviousData: true,
    onSuccess: (data) => setAssetTotal?.(Number(data.total)),
  });

  const rows = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((asset) => ({
      id: asset.id,
      name: asset.asset_name || asset.name,
      type: asset.asset_type || asset.type,
      brand: asset.asset_brand || asset.brand,
      tag: asset.asset_tag || asset.tag,
      status: asset.asset_status || asset.status,
      timeCreated: asset.created_at || asset.timeCreated,
      timeUpdated: asset.updated_at || asset.timeUpdated,
    }));
  }, [data]);

  const totalRows = data?.total || 0;

  const handleRequestSort = (_, property) => {
    setOrder((prev) =>
      orderBy === property && prev === "asc" ? "desc" : "asc"
    );
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    const newSelected = e.target.checked ? rows.map((row) => row.id) : [];
    onSelectedChange?.(newSelected);
  };

  const handleClick = (_, id) => {
    const newSelected = onSelectedAsset.includes(id)
      ? onSelectedAsset.filter((x) => x !== id)
      : [...onSelectedAsset, id];
    onSelectedChange?.(newSelected);
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

  const emptyRows = Math.max(0, rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 4 }}>
        <EnhancedTableToolbar
          numSelected={onSelectedAsset.length}
          isRefreshing={isFetching}
        />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectedAsset={onSelectedAsset}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {rows.map((asset) => {
                const isItemSelected = onSelectedAsset.includes(asset.id);

                return (
                  <TableRow
                    key={asset.id}
                    hover
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(e) => handleClick(e, asset.id)}
                      />
                    </TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.brand}</TableCell>
                    <TableCell>{asset.tag}</TableCell>
                    <TableCell
                      style={{
                        color: asset.status === "assigned" ? "green" : "red",
                      }}
                    >
                      {asset.status}
                    </TableCell>
                    <TableCell>{asset.timeCreated}</TableCell>
                    <TableCell>{asset.timeUpdated}</TableCell>
                    <TableCell>
                      <KebabMenu
                        onEdit={onEdit}
                        dataId={asset.id}
                        dataForm={asset}
                        type="asset"
                      />
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
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
