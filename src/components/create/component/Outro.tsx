import { Outros } from "@/constants/outro";
import { Button, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { OutroItems } from "../../Types/Outro.type";

const Outro = () => {
  const [dataList, setDataList] = useState<OutroItems[]>(Outros);
  const [newData, setNewData] = useState<OutroItems>({ id: 0, value: "" });

  const handleAddData = () => {
    if (newData.value.trim() !== "") {
      const updatedDataList = [...dataList, newData];
      setDataList(updatedDataList);
      setNewData({ id: newData.id + 1, value: "" });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, value: event.target.value });
  };

  const ClearAllData = () => {
    setDataList([]);
  };

  const handleClearTextField = () => {
    setNewData({ ...newData, value: "" });
  };

  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-14.5rem)] overflow-scroll">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">ADD OUTRO</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
        </div>
        <div className="ps-4 pe-4 pt-2">
          <TextField
            id="filled-multiline-static"
            label="Type outro here..."
            rows={4}
            multiline
            variant="filled"
            className="border-2 w-full"
            value={newData.value} // Pass the value from state to the TextField
            onChange={handleInputChange}
          />
        </div>
        <div className="ps-4 pe-4 pt-2 flex justify-end mt-2 mb-2">
          <Button
            onClick={ClearAllData}
            variant="outlined"
            className="border-black-btn text-black ms-3 me-3"
          >
            Clear All
          </Button>
          <Button
            onClick={() => {
              handleAddData();
              handleClearTextField();
            }}
            variant="outlined"
            className="border-black-btn text-black"
          >
            Add Outro
          </Button>
        </div>
        <div className="ps-4 pe-4 pt-2">
          <div className="border-2 overflow-scroll height-outro">
            {dataList?.length < 0 ? (
              <>
                <div>
                  <p>No Outro to Show</p>
                </div>
              </>
            ) : (
              <>
                {dataList?.map((items: OutroItems) => {
                  return (
                    <>
                      <div
                        key={items?.id}
                        className="border-2 mt-2 mb-2 ms-2 me-2"
                      >
                        <div className="flex ps-2 pe-2 pt-2 pb-2">
                          <p>{items?.value}</p>
                          <div className="pt-1 cursor-pointer ps-2">
                            <FaPlus />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outro;
