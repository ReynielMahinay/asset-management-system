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

  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <div className="flex flex-row justify-center items-center  w-full border border-gray-300 rounded-lg bg-gray-100">
        <CiSearch size={25} className="m-2" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeydown}
          className="w-full p-2 border-t-0 border-r-0 border-b-0 border-gray-300 rounded-lg
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-poppins text-sm font-light"
          placeholder="Search asset by ID or Name"
        />
      </div>

      <Button title="Search" variant="primary" onClick={handleSearch} />
      <Button title="Clear" onClick={handleClear} />
    </div>
  );
}

export default SearchInput;
