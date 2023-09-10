import SearchBar from "@/common/SearchBar/searchBar";
import { Container, Typography, Input, Grid, ListItem } from "@mui/material";
import React from "react";
import GlobalButton from "./Button/Button";
import { useRouter } from "next/router";
interface HeaderProps {
  title?: string;
  searchKeyword?: string;
  data?: object;
  showSearch?: boolean;
  showButton?: boolean;
  showFilterButn?: boolean;
  onSearch?: (keyword: string) => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  const { pathname } = router;
  const handleSearch = (keyword: string) => {
    if (props.onSearch) {
      props.onSearch(keyword);
    }
  };
  return (
    <>
      <div className="border-gray-200 ">
        <div
          className={
            pathname === "/library"
              ? `flex items-center justify-between`
              : ` flex items-center`
          }
        >
          <div className="flex items-center">
            <span className="font-medium text-lg uppercase font-roboto pe-4">
              {props.title}
            </span>
            {props.showSearch && <SearchBar onSearch={handleSearch} />}
          </div>
          {props.showButton && <GlobalButton />}
          {props.showFilterButn && <GlobalButton />}
        </div>
      </div>
    </>
  );
};

export default Header;
