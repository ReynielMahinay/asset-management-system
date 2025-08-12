import React from "react";

function Button({ title, icon }) {
  return (
    <div className=" flex flex-row justify-center items-center gap-1 text-[#577a9c] bg-[#d6e9fc] px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-[#577a9c] hover:text-[#d6e9fc] text-[.8rem]">
      {icon}
      {title}
    </div>
  );
}

export default Button;
