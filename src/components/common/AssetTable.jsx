import React, { useState, useRef, useEffect } from "react";
import { assetData } from "../../model/SampleData";
import { VscKebabVertical } from "react-icons/vsc";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Button from "../common/Button";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

function AssetTable() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (id) => {
    setIsOpen((prevId) => (prevId === id ? "null" : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,

      valueGetter: (value, assetData) => `${assetData.id || ""}`,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      flex: 1,
      valueGetter: (value, assetData) => `${assetData.name || ""}`,
    },
    {
      field: "type",
      headerName: "Type",
      width: 130,
      flex: 1,
      valueGetter: (value, assetData) => `${assetData.type || ""}`,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      valueGetter: (value, assetData) => `${assetData.brand || ""}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, assetData) => `${assetData.status || ""} `,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div>
          <button>
            <VscKebabVertical />
          </button>
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Paper sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <DataGrid
        rows={assetData}
        columns={columns}
        disableColumnResize={true}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal !important",
            wordBreak: "break-word",
            lineHeight: "1.3",
            padding: "8px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-row": {
            alignItems: "flex-start",
          },
        }}
      />
    </Paper>
  );
}

export default AssetTable;
