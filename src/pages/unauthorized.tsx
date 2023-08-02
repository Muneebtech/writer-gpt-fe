import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const UnauthorizedPage = () => {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ fontSize: "82px", fontWeight: "bold" }}>401</h1>
        <h6 style={{ fontWeight: "bold" }}>Unauthorized</h6>
      </div>
      <p>You are not authorized to access this page.</p>
      <Link href={"/signin"}>
        <Button color="info">
          Redirect to Login Page{" "}
          <FaArrowRight style={{ marginLeft: "10px" }}></FaArrowRight>
        </Button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
