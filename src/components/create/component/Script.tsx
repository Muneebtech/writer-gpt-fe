import Header from "@/common/Header/header"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { FaPlus } from "react-icons/fa";


const Script = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setSelectedValues(prevState => ({
      ...prevState,
      [name || '']: value,
    }));
  };
  return (
    <div>
      <div className='height-box mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <Header title='Enter Script details' />
          </div>
          <div className="table-bb-gray mt-4">
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-9/12 ps-4 pe-4 flex items-center">
            <FormControl className="w-full">
              <label className="pt-2 pb-2 text-lg font-medium">Script Topic</label>
              {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
              <Select
                // labelId="multi-input-label"
                // multiple
                // value={selectedValues}
                onChange={handleSelectChange}
              // renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="value1">Value 1</MenuItem>
                <MenuItem value="value2">Value 2</MenuItem>
                <MenuItem value="value3">Value 3</MenuItem>
                <MenuItem value="value4">Value 4</MenuItem>
              </Select>
            </FormControl>

          </div>
          <div className="w-9/12 ps-4 pe-4 flex items-center">
            <FormControl className="w-full">
              <label className="pt-2 pb-2 text-lg font-medium">Language Models</label>
              {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
              <Select
                // labelId="multi-input-label"
                // multiple
                // value={selectedValues}
                onChange={handleSelectChange}
              // renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="value1">Value 1</MenuItem>
                <MenuItem value="value2">Value 2</MenuItem>
                <MenuItem value="value3">Value 3</MenuItem>
                <MenuItem value="value4">Value 4</MenuItem>
              </Select>
            </FormControl>

          </div>
        </div>
        <div className="w-9/12 ps-4 pe-4">
          <FormControl className="w-4/6">
            <label className="pt-2 pb-2 text-lg font-medium">Outros</label>
            {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
            <Select
              // labelId="multi-input-label"
              // multiple
              // value={selectedValues}
              onChange={handleSelectChange}
            // renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="value1">Value 1</MenuItem>
              <MenuItem value="value2">Value 2</MenuItem>
              <MenuItem value="value3">Value 3</MenuItem>
              <MenuItem value="value4">Value 4</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Script