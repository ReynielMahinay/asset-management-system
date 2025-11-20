import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <CiSearch size={25} />
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-poppins text-sm font-light"
        placeholder="Search asset by ID or Name"
      />
    </div>
  );
}

export default SearchInput;
