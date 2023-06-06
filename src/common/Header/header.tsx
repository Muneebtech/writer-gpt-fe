import SearchBar from "@/common/SearchBar/searchBar";
import { Container, Typography, Input, Grid, ListItem } from "@mui/material";
import React from "react";
import GlobalButton from "./Button/Button";
interface HeaderProps {
  title: string;
  searchKeyword?: string;
  data?: object;
  showSearch?: boolean
  showButton?: boolean
}
const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="border-gray-200 ">
        <div className="flex items-center">
          <span className="font-medium text-2xl uppercase font-roboto pe-4">
            {props.title}
          </span>
          {props.showSearch && <SearchBar />}

          {props.showButton && <GlobalButton />}
        </div>
      </div>
    </>
  );
};

export default Header;
