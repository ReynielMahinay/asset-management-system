import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function Dropdown({ value, options, bg_color, placeholder }) {
  return (
    <div className="relative text-gray-700 font-poppins font-semibold w-[160px]">
      <select
        id="dropdown"
        defaultValue=""
        name={value}
        className={`relative py-2 px-2 border border-[#cdd2d7] rounded-xl h-9 text-sm font-open-sans ${bg_color} appearance-none w-[150px] `}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.id}
            value={opt.value}
            className={`  cursor-pointer hover:bg-blue-50 `}
          >
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <IoIosArrowDown />
      </div>
    </div>
  );
}

export default Dropdown;
