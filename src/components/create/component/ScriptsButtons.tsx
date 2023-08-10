import { Button } from "@mui/material";
import React from "react";

const ScriptsButtons = () => {
  return (
    <div>
      <div className="flex items-center">
        <Button variant="outlined" className="rounded-lg ms-1 me-1">
          Re-write
        </Button>
        <Button variant="outlined" className="rounded-lg ms-1 me-1">
          Write More
        </Button>
        <p className="ms-1 me-1 font-bold">1500 Words</p>
      </div>
    </div>
  );
};

export default ScriptsButtons;
