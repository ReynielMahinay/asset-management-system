import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function DatePickerComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Pick date"
          slotProps={{
            textField: {
              size: "small",
              InputProps: {
                style: { fontSize: "0.8rem", margin: "0px 7px 0px 0px" }, // Direct style on input
              },
              inputProps: {
                style: { fontSize: "0.8rem" }, // Style on the actual input element
              },
              sx: {
                "& .MuiInputLabel-shrink": {
                  fontSize: "0.8rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
