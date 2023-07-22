import { Outros } from "@/constants/outro";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { OutroItems, outroDataTypes } from "../../Types/Outro.type";
import { Job } from "@/components/Types/job.type";
import { useGetOutro } from "@/services/outro";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}
const Outro: React.FC<ChildComponentProps> = ({ setScriptData }) => {
  const { data: Outrodata, isLoading: outroLoading } = useGetOutro();
  console.log(Outrodata, "Outrodata");
  console.log(Outrodata, "Outrodata::Outrodata::Outrodata  ");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [dataList, setDataList] = useState<outroDataTypes[]>(Outrodata || []);
  const [newData, setNewData] = useState<outroDataTypes>({
    id: "0",
    outro: "",
    description: "",
    status: null,
  });
  const handleAddData = () => {
    if (newData?.description.trim() !== "") {
      const updatedDataList = [...dataList, newData];
      setDataList(updatedDataList);
      setNewData({
        id: (parseInt(newData?.id || "0") + 1).toString(),
        outro: "",
        description: "",
        status: null,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, description: event.target.value });
  };

  const ClearAllData = () => {
    setDataList([]);
  };

  const handleClearTextField = () => {
    setNewData({ ...dataList, description: "" });
  };

  const handleOutroData = (id: string) => {
    setScriptData({ outro: id });
    const selectedItem = dataList.find((item) => item.id === id);
    if (selectedItem) {
      setNewData({ ...selectedItem });
    }
  };

  useEffect(() => {
    if (Outrodata) {
      setDataList(Outrodata);
    }
  }, [Outrodata]);

  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-13.5rem)] overflow-hidden">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">ADD OUTRO</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
        </div>
        <div className="h-[calc(100vh-14.5rem)] overflow-scroll">
          <div className="ps-4 pe-4 pt-2">
            <TextField
              id="filled-multiline-static"
              label="Type outro here..."
              rows={4}
              multiline
              variant="filled"
              className="border-2 w-full"
              value={newData.description} // Pass the value from state to the TextField
              onChange={handleInputChange}
              defaultValue={newData.description}
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
                  {dataList?.map((items: outroDataTypes) => {
                    const isHovered = items.id === hoveredId;
                    return (
                      <>
                        <div
                          onClick={() => handleOutroData(items?.id || "")}
                          onMouseEnter={() => setHoveredId(items?.id || "")}
                          onMouseLeave={() => setHoveredId(null)}
                          key={items?.id}
                          className="outro-item mt-2 mb-2 ms-2 me-2 cursor-pointer"
                        >
                          <div className="flex ps-2 pe-2 pt-2 pb-2">
                            <p>{items?.description}</p>
                            <div
                              className="pt-1 cursor-pointer ps-2"
                              onClick={() => handleOutroData(items?.id || "")}
                            >
                              {isHovered && <FaPlus />}
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
    </div>
  );
};

export default Outro;
