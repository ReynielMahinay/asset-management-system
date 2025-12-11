import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "./Button";
import { IoIosSearch } from "react-icons/io";

function SearchInput({
  onSearch,
  keyword,
  handleClear,
  setKeyword,
  handleSearchInput,
  bg_color,
}) {
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearchInput();
    } else if (e.key === "Escape") {
      handleClear();
    }
  };
  const handleClearText = (e) => {
    const value = e.target.value; // get the input value
    setKeyword(value);

    // If input is empty after deletion, reset search
    if (value.trim() === "") {
      onSearch("");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3 w-full">
      <div className="relative flex flex-row   w-full ">
        <IoIosSearch
          size={25}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          value={keyword}
          onChange={handleClearText}
          onKeyDown={handleKeydown}
          placeholder="Search asset by ID or Name"
          className={`w-full p-2 border border-[#99a1af] rounded-[10px] borderbg-gray-100 ${bg_color} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-poppins text-sm font-light pl-10`}
        />
      </div>

      {/* <Button title="Clear" onClick={handleClear} /> */}
    </div>
  );
}

export default SearchInput;
