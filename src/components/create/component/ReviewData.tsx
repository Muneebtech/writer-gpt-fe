import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "@/common/Header/header";
import { CreateReviewData, ReviewDataTypes } from "@/constants/ReviewConstant";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Job } from "@/components/Types/job.type";
import { useTopic } from "@/services/topic";
import { useModel } from "@/services/Script/hooks/useModel";
import { useGetOutro } from "@/services/outro";
import { Topic } from "@/constants/Topic";
import { OutroItems } from "@/constants/outro";
import { ModelList } from "@/constants/languageModel";
import { useGetChannels } from "@/services/channel";
import { Channel } from "@/constants/channelcategories";
import { scriptType } from "@/components/Types/script.type";
interface ChildComponentProps {
  ScriptData: Job | null;
  Jobdata: {
    script: string;
  };
}
const ReviewData: React.FC<ChildComponentProps> = ({ ScriptData, Jobdata }) => {
  const { data: Outrodata } = useGetOutro();
  const profileImage = ScriptData?.photoPath;
  const { data: topicData } = useTopic();
  const { data: modelData } = useModel();
  const { data: channelData } = useGetChannels({});

  let topic = topicData?.find((obj: Topic) => obj.id === ScriptData?.topic);
  let outro = Outrodata?.find(
    (obj: OutroItems) => obj.id === ScriptData?.outro
  );
  let model = modelData?.find((obj: ModelList) => obj.id === ScriptData?.model);
  let channel = channelData?.find(
    (obj: Channel) => obj.id === ScriptData?.channel
  );
  return (
    <div>
      <div className="height-box mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">REVIEW</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
          <div className="ps-4 pt-2">
            <div className="mt-1">
              <div key={"3234"} className="">
                <div className="flex items-center pt-1 pb-1">
                  <div className=" pt-1 pb-1">
                    <p className="font-bold pe-3">
                      {ScriptData?.name ? "Script Name :" : "Script Name :"}
                    </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <p>{ScriptData?.name}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold  pe-3"> Thumbnail : </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <Image
                      src={
                        ScriptData?.photoPath
                          ? URL?.createObjectURL(profileImage as any)
                          : ""
                      }
                      alt="ground"
                      width={45}
                      height={45}
                    />
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">
                      {channel?.channel ? "Channel :" : "Channel :"}
                    </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <p>{channel?.channel}</p>
                  </div>
                </div>
                {/* <div className="pt-1 pb-1">
                  <p>{ScriptData?.}</p>
                </div> */}
                <div className="flex items-center pt-1 pb-1">
                  <div className="pt-1 pb-1">
                    <p className="font-bold pe-3">
                      {topic?.topic ? "Topic :" : "Topic :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{topic?.topic}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">
                      {model?.model ? "Model :" : "Model :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{model?.model}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div className="pt-1 pb-1">
                    <p className="font-bold pe-3">
                      {outro?.outro ? "Outro :" : "Outro :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{outro?.outro}</p>
                  </div>
                </div>
                {/* <div className="pt-2 pb-2 border ps-2 pe-2">
                  <p>{Jobdata?.script}</p>
                </div> */}
                <div className="pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">Script :</p>
                  </div>
                  <div className="pt-2 pb-2 border ps-2 pe-2 scriptData me-3">
                    <p>{Jobdata?.script}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewData;
