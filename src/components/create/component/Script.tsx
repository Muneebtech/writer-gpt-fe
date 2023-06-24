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
    topic: "",
  });

  const { data: Outrodata } = useOutro();

  const { data: topicData } = useTopic();
  const { data: modelData, isLoading: modelLoading } = useModel();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setScriptData({ ...selectedValues, [name]: value });
  };
  console.log(topicData, modelData, Outrodata, "dataaaaaaaaaa");

  return (
    <div>
      {modelLoading ? (
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

                  <Select
                    value={selectedValues.topic}
                    name="topic"
                    onChange={handleSelectChange}
                  >
                    {topicData?.map((obj: Topic) => (
                      <MenuItem value={obj.id} key={obj.id}>
                        {obj.topic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-9/12 ps-4 pe-4 flex items-center">
                <FormControl className="w-full">
                  <label className="pt-2 pb-2 text-lg font-medium">
                    Language Models
                  </label>

                  <Select
                    value={selectedValues.model}
                    name="model"
                    onChange={handleSelectChange}
                  >
                    {modelData?.map((obj: ModelList) => (
                      <MenuItem key={obj.id} value={obj.id}>
                        {obj.model}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-9/12 ps-4 pe-4">
              <FormControl className="w-4/6">
                <label className="pt-2 pb-2 text-lg font-medium">Outros</label>

                <Select
                  value={selectedValues.outro}
                  name="outro"
                  onChange={handleSelectChange}
                >
                  {Outrodata?.map((obj: OutroItems) => (
                    <MenuItem key={obj.id} value={obj.id}>
                      {obj.outro}
                    </MenuItem>
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
