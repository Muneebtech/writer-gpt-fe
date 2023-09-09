import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
const FilterLibrarydata = () => {
  return (
    <div className="flex ">
      <div className="ps-5 pe-5">
        <FormGroup>
          <Typography className="pt-1 pb-2">Category</Typography>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Religion"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Religion"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Religion"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Religion"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Religion"
          />
        </FormGroup>
      </div>
      <div className="ps-5 pe-5">
        <FormGroup>
          <Typography className="pt-1 pb-2">Date</Typography>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Last Month"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Last Year"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Last Weak"
          />
        </FormGroup>
      </div>
      <div className="ps-5 pe-5">
        <FormGroup>
          <Typography className="pt-1 pb-2">Word Count</Typography>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="More than 1000"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Less than 1000"
          />
        </FormGroup>
      </div>
      <div className="ps-5 pe-5">
        <FormGroup>
          <Typography className="pt-1 pb-2">Language Model</Typography>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Main"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Alt 1"
          />
        </FormGroup>
      </div>
      <div className="ps-5 pe-5">
        <FormGroup>
          <Typography className="pt-1 pb-2">Outro</Typography>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Improved"
          />
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="Base"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default FilterLibrarydata;
