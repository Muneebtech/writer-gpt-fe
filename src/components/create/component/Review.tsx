import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "@/common/Header/header";
import { ReviewData, ReviewDataTypes } from "@/constants/ReviewConstant";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Job } from "@/components/Types/job.type";
import { useTopic } from "@/services/topic";
import { useModel } from "@/services/Script/hooks/useModel";
import { useOutro } from "@/services/outro";
import { Topic } from "@/constants/Topic";
import { OutroItems } from "@/constants/outro";
import { ModelList } from "@/constants/languageModel";
import { useGetChannels } from "@/services/channel";
import { Channel } from "@/constants/channelcategories";
interface ChildComponentProps {
  ScriptData: Job | null;
}
const Review: React.FC<ChildComponentProps> = ({ ScriptData }) => {
  console.log(ScriptData,"hahah");
  
  const {
    isLoading: loading,
    data: Outrodata,
    isSuccess: success,
  } = useOutro();

  const { data: topicData, isLoading: topicLoading } = useTopic();
  const { data: modelData, isLoading: modelLoading } = useModel();
  const { data: channelData, isLoading: channelLoading } = useGetChannels();

  let topic = topicData?.find((obj: Topic) => obj.id === ScriptData?.topic);
  let outro = Outrodata?.find((obj: OutroItems) => obj.id === ScriptData?.outro);
  let model = modelData?.find((obj: ModelList) => obj.id === ScriptData?.model);
  let channel = channelData?.find(
    (obj: Channel) => obj.id === ScriptData?.channel
  );
  console.log(topic,outro,model,channel);
  
  return (
    <div>
      <div className="height-box mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">REVIEW</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
          <div className="flex items-center">
            <div className="pt-5">
              <div className="">
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Script Name :
                  </p>
                </div>
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Thumbnail :
                  </p>
                </div>
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Channel :
                  </p>
                </div>
                {/* <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Category :
                  </p>
                </div> */}
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Topic :
                  </p>
                </div>
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Language modal :
                  </p>
                </div>
                <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Outros :
                  </p>
                </div>
                {/* <div className="">
                  <p className="ps-3 pe-6 text-md font-bold pt-1 pb-1">
                    Voice :
                  </p>
                </div> */}
              </div>
            </div>
            <div className="mt-6">
              <div key={"3234"} className="">
                <div className=" pt-1 pb-1">
                  <p>{ScriptData?.name}</p>
                </div>
                <div className=" pt-1 pb-1">
                  <Image
                    src="/ground.png"
                    alt="ground"
                    width={45}
                    height={45}
                  />
                </div>
                <div className=" pt-1 pb-1">
                  <p>{channel?.channel}</p>
                </div>
                {/* <div className="pt-1 pb-1">
                  <p>{ScriptData?.}</p>
                </div> */}
                <div className="pt-1 pb-1">
                  <p>{topic?.topic}</p>
                </div>
                <div className="pt-1 pb-1">
                  <p>{model?.model}</p>
                </div>
                <div className="pt-1 pb-1">
                  <p>{outro?.outro}</p>
                </div>
                {/* <div className="pt-1 pb-1">
                  <p>{ScriptData?.Voice}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;
