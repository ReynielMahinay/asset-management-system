import { Button as MuiButton } from "@mui/material";

function Button({ title, icon, variant, onClick, type = "button" }) {
  const getVariantClasses = () => {
    const variants = {
      primary:
        "hover:!bg-[#1a1a2e] hover:!text-white !bg-midnight !text-white ",
      secondary: "!text-midnight !bg-transparent hover:!bg-blue-50",
      modal_primary:
        "hover:!bg-[#1a1a2e] hover:!text-white !bg-[#155dfc] !text-white",
      danger: "!text-midnight !bg-transparent hover:!bg-red-50",
      danger_primary:
        "hover:!bg-[#d6e9fc] hover:!text-red-500 !bg-[#1a1a2e] !text-[#d6e9fc]",
      login_options: "!bg-[#f3f4f6] !text-black",
    };
    return variants[variant] || variants.primary;
  };

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant="contained"
      startIcon={icon}
      className={`
        !font-poppins
        !text-sm
        !px-4 !py-2 
        !h-11
        !rounded-lg
        !min-w-0 
        !shadow-sm
        !capitalize
        ${variant === "primary" ? " " : ""}
         ${variant === "login_options" ? "w-full" : ""}
        ${getVariantClasses()}
      `}
    >
      {title}
    </MuiButton>
  );
}

export default Button;
