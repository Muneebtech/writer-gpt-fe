import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "@/common/Header/header";
import { ReviewDataTypes } from "@/constants/ReviewConstant";
import Image from "next/image";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { Job } from "@/components/Types/job.type";
import { useTopic } from "@/services/topic";
import { useModel } from "@/services/Script/hooks/useModel";
import { useGetOutro } from "@/services/outro";
import { Topic } from "@/constants/Topic";
import { Outros } from "@/constants/outro";
import { ModelList } from "@/constants/languageModel";
import { OutroItems } from "../../Types/Outro.type";
import { useGetChannels } from "@/services/channel";
import { Channel } from "@/constants/channelcategories";
import { useEffect } from "react";
interface ChildComponentProps {
  ScriptData: Job | null;
}
const Review: React.FC<ChildComponentProps> = ({ ScriptData }) => {
  const profileImage = ScriptData?.photoPath;
  const {
    isLoading: loading,
    data: Outrodata,
    isSuccess: success,
    mutate: mutateOutro,
  } = useGetOutro();

  const {
    data: topicData,
    isLoading: topicLoading,
    mutate: topicMutate,
  } = useTopic();
  const { data: modelData, isLoading: modelLoading } = useModel();
  const { data: channelData, isLoading: channelLoading } = useGetChannels({});

  let topic = topicData?.find((obj: Topic) => obj.id === ScriptData?.topic);
  let outro = Outrodata?.find(
    (obj: OutroItems) => obj.id === ScriptData?.outro
  );
  let model = modelData?.find((obj: ModelList) => obj.id === ScriptData?.model);
  let channel = channelData?.find(
    (obj: Channel) => obj.id === ScriptData?.channel
  );

  useEffect(() => {
    mutateOutro({});
    topicMutate({});
  }, []);
  const rotateAnimation = `spin 1s linear infinite`;

  return (
    <div>
      <div className="h-[calc(100vh-13.5rem)] mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">REVIEW</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
          <div className="ps-4">
            <div className="mt-1">
              <div key={"3234"} className="">
                <div className="flex items-center pt-1 pb-1 w-full">
                  <div className=" pt-1 pb-1 w-[10%]">
                    <p className="font-bold pe-3 font-text">
                      {ScriptData?.name ? "Script Name" : "Script Name"}
                    </p>
                  </div>

                  <div className=" pt-1 pb-1 flex  ml-1  w-[90%]">
                    <p>
                      {!ScriptData?.name ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                      ) : (
                        ScriptData?.name
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-[10%] flex  pt-1 pb-1">
                    <p className="font-bold  pe-3 font-text"> Thumbnail </p>
                  </div>
                  <div className=" ml-1 w-[90%] flex  pt-1 pb-1">
                    {!ScriptData?.photoPath ? (
                      <FaSpinner
                        size={16}
                        style={{
                          animation: rotateAnimation,
                          marginRight: "10px",
                        }}
                      ></FaSpinner>
                    ) : (
                      <Image
                        src={
                          ScriptData?.photoPath
                            ? URL?.createObjectURL(profileImage as any)
                            : ""
                        }
                        alt=""
                        width={25}
                        height={25}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1 w-full ">
                  <div className="w-[10%] flex">
                    <p className="font-bold pe-3 font-text ">
                      {channel?.channel ? "Channel " : "Channel "}
                    </p>
                  </div>

                  <div className=" pt-1 pb-1  ml-1  w-[90%]">
                    <p>
                      {!channel?.channel ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                      ) : (
                        channel?.channel
                      )}
                    </p>
                  </div>
                </div>
                {/* <div className="pt-1 pb-1">
                  <p>{ScriptData?.}</p>
                </div> */}
                <div className="flex items-center pt-1 pb-1 w-full">
                  <div className="pt-1 pb-1 w-[10%]">
                    <p className="font-bold pe-3 font-text">
                      {topic?.topic ? "Topic " : "Topic "}
                    </p>
                  </div>

                  <div className="pt-1 pb-1  ml-1  w-[90%]">
                    <p>
                      {!topic?.topic ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                      ) : (
                        topic?.topic
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1 w-full">
                  <div className="w-[10%] flex pt-1 pb-1">
                    <p className="font-bold pe-3 font-text">
                      {model?.model ? "Model " : "Model "}
                    </p>
                  </div>

                  <div className="pt-1 pb-1  ml-1  w-[90%]">
                    <p>
                      {!model?.model ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                      ) : (
                        model?.model
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div className="w-[10%]">
                    <p className="font-bold pe-2 font-text">
                      {outro?.outro ? "Outro " : "Outro "}
                    </p>
                  </div>
                  <div className="pt-1 pb-1  ml-1  w-[90%]">
                    <p>
                      {!outro?.outro ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                      ) : (
                        outro?.outro
                      )}
                    </p>
                  </div>
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
