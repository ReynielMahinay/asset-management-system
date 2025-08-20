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
    setIsOpen((prevId) => (prevId === id ? null : id));
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
      flex: 0.5,
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <button
            onClick={() => {
              handleClick(params.row.id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "4px",
              outline: "none",
            }}
          >
            <VscKebabVertical size={18} />
          </button>

          {isOpen === params.row.id && (
            <div
              ref={menuRef}
              style={{
                position: "fixed", // Changed from absolute to fixed
                top: "auto", // Let it calculate based on button position
                left: "auto", // Let it calculate based on button position
                transform: "translate(-100%, 0)", // Position to the left of button
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 10000, // Increased z-index
                minWidth: "120px",
                overflow: "visible",
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Edit", params.row);
                  setIsOpen(null);
                }}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  borderBottom: "1px solid #eee",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                <FaEdit size={12} color="#666" />
                Edit
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Delete", params.row);
                  setIsOpen(null);
                }}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#dc3545",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#fff5f5")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                <RiDeleteBinLine size={12} />
                Delete
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // Important for flex child to shrink
      }}
    >
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden", // Prevent Paper from overflowing
        }}
      >
        <DataGrid
          rows={assetData}
          columns={columns}
          disableColumnResize={true}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowHeight={() => "auto"}
          sx={{
            border: 0,
            flex: 1,
            minHeight: 0,
            width: "100%",
            // Container overflow settings
            overflow: "hidden",
            "& .MuiDataGrid-main": {
              overflow: "hidden",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto", // Allow scrolling within the grid
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              overflow: "visible", // Allow dropdowns to show
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              overflow: "visible", // Allow dropdowns to show
            },
            "& .MuiDataGrid-row": {
              overflow: "visible",
            },
            "& .MuiDataGrid-cell": {
              overflow: "visible",
              whiteSpace: "normal !important",
              wordBreak: "break-word",
              lineHeight: "1.3",
              padding: "8px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            // Ensure the grid resizes properly
            "& .MuiDataGrid-columnHeaders": {
              minHeight: "56px !important",
            },
            "& .MuiDataGrid-footerContainer": {
              minHeight: "52px",
            },
          }}
        />
      </Paper>
    </div>
  );
}

export default AssetTable;
