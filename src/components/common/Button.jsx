import React from "react";

function Button({ title, icon, variant }) {
  const variants = {
    primary:
      "text-midnight bg-[#d6e9fc] hover:bg-midnight hover:text-[#d6e9fc]",
    secondary: "text-blue-500",
    danger: "text-red-500",
  };
  return (
    <div
      className={`flex flex-row justify-center items-center gap-1  ${variants[variant]} px-4 py-2  text-sm rounded-lg cursor-pointer  text-[.8rem]`}
    >
      {icon}
      {title}
    </div>
  );
}

export default Button;
