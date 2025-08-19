import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function InputFieldComponent({ label }) {
  return (
    <Box
      sx={{ "& > :not(style)": { width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
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
