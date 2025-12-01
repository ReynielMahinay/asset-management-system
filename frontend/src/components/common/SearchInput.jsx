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
  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <CiSearch size={25} />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-poppins text-sm font-light"
        placeholder="Search asset by ID or Name"
      />

      <Button title="Search" variant="primary" onClick={handleSearch} />
    </div>
  );
}

export default SearchInput;
