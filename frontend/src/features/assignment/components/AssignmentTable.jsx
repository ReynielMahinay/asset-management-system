import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AssignmentTable() {
  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "none",
        borderBottomLeftRadius: 12, // <--- bottom only
        borderBottomRightRadius: 12, // <--- your radius
        overflow: "hidden", // <--- IMPORTANT!
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: "#ffffff",
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },

          // Header background (main wrapper)
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f1f5f9",
          },

          // Header cells (each th)
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f1f5f9",
          },

          // Checkbox header cell
          "& .MuiDataGrid-columnHeaderCheckbox": {
            backgroundColor: "#f1f5f9",
          },

          // Inner header wrapper
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: "#f1f5f9",
          },
          maxHeight: 200,
          minHeight: 369,
          width: "100%",
        }}
      />
    </Paper>
  );
}
