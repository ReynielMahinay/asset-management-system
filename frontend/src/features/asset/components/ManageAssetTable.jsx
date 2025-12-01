import React from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import KebabMenu from "../../../components/common/KebabMenu";

const columnMap = {
  name: "name",
  type: "type",
  brand: "brand",
  serialNumber: "serialNumber", // if you have serialNumber field
  tag: "tag",
  status: "status",
  timeCreated: "timeCreated", // if your object has created timestamp
  timeUpdated: "timeUpdated", // if your object has updated timestamp
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

export default function ManageAssetTable({
  data,
  total,
  isLoading,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  sort,
  order,
  setSort,
  setOrder,
  onEdit,
}) {
  const handleRequestSort = (_, property) => {
    const isAsc = sort === columnMap[property] && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSort(columnMap[property]);
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

  if (!data || data.length === 0)
    return <Alert severity="info">No assets found</Alert>;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox disabled />
                </TableCell>
                {headCells.map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.id !== "action" ? (
                      <TableSortLabel
                        active={sort === columnMap[cell.id]}
                        direction={sort === columnMap[cell.id] ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, cell.id)}
                      >
                        {cell.label}
                      </TableSortLabel>
                    ) : (
                      cell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((asset) => (
                <TableRow key={asset.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  {headCells.map((cell) => {
                    if (cell.id === "action") {
                      return (
                        <TableCell key={cell.id}>
                          <KebabMenu
                            onEdit={onEdit}
                            asset={asset}
                            assetId={asset.id}
                          />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>
                        {asset[columnMap[cell.id]] || "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
