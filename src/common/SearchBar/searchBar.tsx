import React, { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    onSearch(keyword);
  };

  return (
    <div className="searchBar">
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-3 py-2 rounded-3xl bgSearch focus:outline-none focus:border-blue-500"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;