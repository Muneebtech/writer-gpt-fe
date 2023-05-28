import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-3 py-2 rounded-3xl bgSearch focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
