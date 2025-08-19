import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({
  data = [],
  value,
  label,
  onChange,
  getOptionLabel,
}) {
  return (
    <Autocomplete
      disablePortal
      options={data}
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel || ((option) => option?.label || "")}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
