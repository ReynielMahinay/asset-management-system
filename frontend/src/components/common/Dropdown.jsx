import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NativeSelect, FormControl, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

function Dropdown({ value, options, bg_color, placeholder }) {
  const BorderInput = styled(InputBase)(({ theme }) => ({
    "& .MuiNativeSelect-select": {
      border: "1px solid #cdd2d7",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 14,
      background: "#f5f7f9",
    },
    "& .MuiNativeSelect-select:focus": {
      borderRadius: 10, // <-- maintain radius on focus
      background: "#f5f7f9",
      outline: "none",
      border: "1px solid #cdd2d7",
    },
    "& .MuiInputBase-input": {
      borderRadius: 10,
    },
  }));
  return (
    <FormControl>
      <NativeSelect
        defaultValue=""
        input={<BorderInput />}
        inputProps={{
          name: "age",
          id: "uncontrolled-native",
        }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option value={opt.value} key={opt.id}>
            {opt.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default Dropdown;
