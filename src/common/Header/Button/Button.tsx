import { FiPlus, FiFilter, FiArrowDown } from "react-icons/fi";
import { Button } from "@mui/material";

const FilterButton = () => {
  return (
    <div className="flex justify-end">
      <Button variant="outlined" className="ps-4 pe-4">
        <FiFilter />
        <span className="ps-2 pe-2">Filters</span>
        <FiArrowDown />
      </Button>
    </div>
  );
};
export default FilterButton;
