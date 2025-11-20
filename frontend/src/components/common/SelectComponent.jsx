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
    <div className="flex flex-col gap-2 text-[0.7rem] font-poppins font-semibold text-midnight">
      <label htmlFor="status">
        {label} <span className="text-red-600">*</span>
      </label>
      <select
        name="status"
        id="status"
        className="border-gray-400 border-1 rounded shadow-xsm px-2 py-1.5 font-normal"
      >
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
    // <FormControl sx={{ m: margin, minWidth: 120 }} size="small">
    //   <InputLabel
    //     id="drop-down"
    //     sx={{
    //       fontSize: ".8rem",
    //       "&.MuiInputLabel-shrink": {
    //         fontSize: ".8rem",
    //       },
    //     }}
    //   >
    //     {label}{" "}
    //   </InputLabel>
    //   <Select
    //     labelId="drop-down"
    //     id="demo-select-small"
    //     value={age}
    //     label={label}
    //     onChange={handleChange}
    //     className="!rounded !font-open-sans"
    //     sx={{
    //       fontSize: ".8rem",
    //       "& .MuiSelect-select": { fontSize: ".8rem" },
    //     }}
    //     MenuProps={{
    //       PaperProps: {
    //         sx: {
    //           "& .MuiMenuItem-root": {
    //             fontSize: ".9rem",
    //           },
    //         },
    //       },
    //     }}
    //   >
    //     {options.map((opt) => (
    //       <MenuItem key={opt.id} value={opt.value}>
    //         <em>{opt.label}</em>
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  );
}

export default SelectComponent;
