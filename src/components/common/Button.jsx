import React from "react";
import { Button as MuiButton } from "@mui/material";

function Button({ title, icon, variant }) {
  const getVariantClasses = () => {
    const variants = {
      primary:
        "hover:!bg-[#d6e9fc] hover:!text-[#1a1a2e] !bg-[#1a1a2e] !text-[#d6e9fc]",
      secondary: "!text-blue-500 !bg-transparent hover:!bg-blue-50",
      danger: "!text-red-500 !bg-transparent hover:!bg-red-50",
    };
    return variants[variant] || variants.primary;
  };

  return (
    <MuiButton
      variant="contained"
      startIcon={icon}
      className={`
        !text-[0.7rem] 
        !px-4 !py-2 
        !rounded-lg 
        !normal-case 
        !min-w-0 
        !gap-1
        !shadow-sm
        ${getVariantClasses()}
      `}
    >
      {title}
    </MuiButton>
  );
}

export default Button;
