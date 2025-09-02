import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function InputFieldComponent({ label, className = "", value, onChange }) {
  return (
    <Box noValidate autoComplete="off" className={className}>
      <TextField
        id="outlined-basic"
        label={label}
        onChange={onChange}
        value={value}
        variant="outlined"
        fullWidth
        sx={{
          // Font size customization
          "& .MuiInputBase-input": {
            fontSize: "0.8rem", // Input text
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.8rem", // Label
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "0.8rem", // Label when shrunk
          },
          // Border and background customization
          "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "#cccccc",
            },
            "&:hover fieldset": {
              borderColor: "#2196f3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        }}
      />
    </Box>
  );
}

export default InputFieldComponent;
