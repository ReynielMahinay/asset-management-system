import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function SelectComponent({ value, options, label, margin }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: margin, minWidth: 120 }} size="small">
      <InputLabel
        id="drop-down"
        sx={{
          fontSize: ".8rem",
          "&.MuiInputLabel-shrink": {
            fontSize: ".8rem",
          },
        }}
      >
        {label}{" "}
      </InputLabel>
      <Select
        labelId="drop-down"
        id="demo-select-small"
        value={age}
        label={label}
        onChange={handleChange}
        className="!rounded !font-open-sans"
        sx={{
          fontSize: ".8rem",
          "& .MuiSelect-select": { fontSize: ".8rem" },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: ".9rem",
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.value}>
            <em>{opt.label}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
