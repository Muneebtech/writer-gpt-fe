import { Job } from "@/components/Types/job.type";
import { Topic } from "@/constants/Topic";
import { ModelList } from "@/constants/languageModel";
import { OutroItems } from "@/constants/outro";
import Spinner from "@/modules/spinner/spinner";
import { useModel } from "@/services/Script/hooks/useModel";
import { useOutro } from "@/services/outro";
import { useTopic } from "@/services/topic";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}
const Script: React.FC<ChildComponentProps> = ({ setScriptData }) => {
  const [selectedValues, setSelectedValues] = useState({
    outro: "",
    model: "",
    videoTopic: "",
  });
  const {
    isLoading: loading,
    data: Outrodata,
    isSuccess: success,
  } = useOutro();
  
  const { data: topicData, isLoading: topicLoading } = useTopic();
  const { data: modelData, isLoading: modelLoading } = useModel();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setScriptData({ ...selectedValues, [name]: value });
  };
  return (
    <div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div className="height-box mt-6 rounded-md border-2">
            <div>
              <div className="ps-3 pt-2">
                <h4 className="font-bold">ENTER SCRIPT DETAILS</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            <div className="flex items-center">
              <div className="w-9/12 ps-4 pe-4 flex items-center">
                <FormControl className="w-full">
                  <label className="pt-2 pb-2 text-lg font-medium">
                    Script Topic
                  </label>
                  {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
                  <Select
                    // labelId="multi-input-label"
                    // multiple
                    // value={selectedValues}
                    onChange={handleSelectChange}
                    // renderValue={(selected) => selected.join(', ')}
                  >
                    {topicData?.map((obj: Topic) => (
                      <MenuItem value={obj.id}>{obj.topic}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-9/12 ps-4 pe-4 flex items-center">
                <FormControl className="w-full">
                  <label className="pt-2 pb-2 text-lg font-medium">
                    Language Models
                  </label>
                  {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
                  <Select
                    // labelId="multi-input-label"
                    // multiple
                    // value={selectedValues}
                    onChange={handleSelectChange}
                    // renderValue={(selected) => selected.join(', ')}
                  >
                    {modelData?.map((obj: ModelList) => (
                      <MenuItem value={obj.id}>{obj.model}</MenuItem>
                    ))}
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
                  {Outrodata?.map((obj: OutroItems) => (
                    <MenuItem value={obj.id}>{obj.outro}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Script;
