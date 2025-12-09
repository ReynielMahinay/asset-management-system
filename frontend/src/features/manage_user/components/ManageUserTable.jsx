import * as React from "react";
import PropTypes from "prop-types";
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
import { visuallyHidden } from "@mui/utils";
import { userData } from "../../../model/SampleData";
import KebabMenu from "../../../components/common/KebabMenu";
import { fetchUser } from "../../../api/users";
import { useQuery } from "@tanstack/react-query";

const columnMap = {
  fullname: "user_fullname",
  email: "user_email",
  department: "user_department",
  role: "user_role",
};

const headCells = [
  {
    id: "fullname",
    label: "Full Name",
  },
  { id: "email", label: "Email" },
  {
    id: "department",

    label: "Department",
  },
  { id: "role", label: "Role" },
  {
    id: "action",
    label: "Action",
  },
];

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
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
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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
          Users
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ManageUserTable({ setUserTotal, onEdit }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data = { total: 0, data: [] } } = useQuery({
    queryKey: ["users", page, rowsPerPage, orderBy, order],
    queryFn: () =>
      fetchUser({
        page: page + 1,
        pageSize: rowsPerPage,
        sor: columnMap[orderBy] || "user_id",
        order,
      }),
    keepPreviousData: true,
    onSuccess: (data) => setUserTotal?.(Number(data.total)),
  });

  const rows = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((user) => ({
      id: user.id,
      fullname: user.user_fullname || user.fullname,
      email: user.user_email || user.email,
      department: user.user_department || user.department,
      role: user.user_role || user.role,
    }));
  }, [data]);

  const totalRows = data?.total || 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(userData.map((n) => n.id));
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

  const emptyRows = Math.max(0, rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 3 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={userData.length}
            />
            <TableBody>
              {rows.map((user) => {
                const isItemSelected = selected.includes(user.id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={user.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, user.id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {user.fullname}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <KebabMenu
                        onEdit={onEdit}
                        dataId={user.id}
                        dataForm={user}
                        type="user"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
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
