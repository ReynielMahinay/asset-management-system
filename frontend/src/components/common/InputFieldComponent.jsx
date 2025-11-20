import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function InputFieldComponent({ label, className = "", value, onChange }) {
  return (
    <div className="flex flex-col gap-2 text-[0.7rem] font-poppins font-semibold text-midnight w-full">
      <label htmlFor="input">
        {label} <span className="text-red-600">*</span>
      </label>
      <input
        onChange={onChange}
        value={value}
        type="text"
        id="input"
        className="border-gray-400 border-1 rounded shadow-xsm px-2 py-1.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        required
      />
    </div>

    // <Box noValidate autoComplete="off" className={className}>
    //   <TextField
    //     id="outlined-basic"
    //     label={label}
    //     onChange={onChange}
    //     value={value}
    //     variant="outlined"
    //     fullWidth
    //     sx={{
    //       // Font size customization
    //       "& .MuiInputBase-input": {
    //         fontSize: "0.8rem", // Input text
    //       },
    //       "& .MuiInputLabel-root": {
    //         fontSize: "0.8rem", // Label
    //       },
    //       "& .MuiInputLabel-shrink": {
    //         fontSize: "0.8rem", // Label when shrunk
    //       },
    //       // Border and background customization
    //       "& .MuiOutlinedInput-root": {
    //         backgroundColor: "transparent",
    //         borderRadius: "8px",
    //         "& fieldset": {
    //           borderColor: "#cccccc",
    //         },
    //         "&:hover fieldset": {
    //           borderColor: "#2196f3",
    //         },
    //         "&.Mui-focused fieldset": {
    //           borderColor: "#1976d2",
    //         },
    //       },
    //     }}
    //   />
    // </Box>
  );
}

export default InputFieldComponent;
