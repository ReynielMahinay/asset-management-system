import React from "react";

function Dropdown({ value, options, label }) {
  return (
    <div className="relative text-midnight">
      {/* <fieldset className="border border-gray-500 rounded-lg">
        <legend className="text-[.6rem]">{label}</legend> */}
      <label
        htmlFor="dropdown"
        className="text-[.6rem] absolute top-[-8px] left-3 bg-white"
      >
        {label}
      </label>
      <select
        id="dropdown"
        name={value}
        className="px-4 py-2 border border-[#577a9c] rounded-lg h-9 text-sm font-open-sans"
      >
        {options.map((opt) => (
          <option
            key={opt.id}
            value={opt.value}
            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 `}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {/* </fieldset> */}
    </div>
  );
}

export default Dropdown;
