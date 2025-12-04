import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "./Button";

function SearchInput({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const trimmedKeyword = keyword.trim();
    console.log("Searching for:", trimmedKeyword);
    onSearch(trimmedKeyword);
  };

  const handleClear = () => {
    setKeyword("");
    onSearch("");
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
    <div className="flex flex-row justify-center items-center gap-3">
      <div className="relative flex flex-row   w-full ">
        <CiSearch
          size={25}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          value={keyword}
          onChange={handleClearText}
          onKeyDown={handleKeydown}
          placeholder="Search asset by ID or Name"
          className="w-full p-2 border border-gray-300 rounded-lg borderbg-gray-100 bg-[#f1f5f9] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-poppins text-sm font-light pl-10"
        />
      </div>

      <Button title="Search" variant="primary" onClick={handleSearch} />
      <Button title="Clear" onClick={handleClear} />
    </div>
  );
}

export default SearchInput;
