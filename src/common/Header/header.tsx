import SearchBar from "@/common/SearchBar/searchBar";
import { Container, Typography, Input, Grid, ListItem } from "@mui/material";
import React from "react";
interface HeaderProps {
  title: string;
  searchKeyword?: string;
  data?: object;
  showSearch?:boolean
}
const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="flex gap-8 items-center w-full table-bb-gray border-gray-200 py-4">
        <span className="font-medium text-2xl uppercase font-roboto">
          {props.title}
        </span>
        {props.showSearch && <SearchBar />}
      </div>
    </>
  );
};

export default Header;
