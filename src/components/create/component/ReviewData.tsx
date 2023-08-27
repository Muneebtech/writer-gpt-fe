import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Job } from "@/components/Types/job.type";
import { useTopic } from "@/services/topic";
import { useModel } from "@/services/Script/hooks/useModel";
import { useGetOutro } from "@/services/outro";
import { Topic } from "@/constants/Topic";
import { OutroItems } from "@/./components/Types/Outro.type";
import { ModelList } from "@/constants/languageModel";
import { useGetChannels } from "@/services/channel";
import { Channel } from "@/constants/channelcategories";
import { Button, TextField } from "@mui/material";
import ScriptSuccessPage from "./ScriptSuccessPage";

type AdditionalCommandsData = {
  commands?: string;
};

interface ChildComponentProps {
  ScriptData: Job | null;
  Jobdata: {
    script: string;
  };
  isSuccess: boolean;
}
const ReviewData: React.FC<ChildComponentProps> = ({
  ScriptData,
  Jobdata,
  isSuccess,
}) => {
  console.log(Jobdata?.script);

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
  useEffect(() => {
    mutateOutro({});
    topicMutate({});
  }, []);

  const [ScriptDataCount, setScriptDataCount] = useState<any>();

  const HandleScriptNumber = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const SearchValue = event.target.value;
    setScriptDataCount(SearchValue);
  };
  const getWordCount = () => {
    // Split the text by whitespace and filter out empty strings
    const words = ScriptDataCount?.trim()?.split(/\s+/)?.filter(Boolean);
    return words?.length;
  };

  const [additionalCommand, setAdditionalCommands] =
    useState<AdditionalCommandsData>();

  const HandleAdditionalCommandData = () => {};

  return (
    <div>
      <div className="h-[calc(100vh-13.6rem)] mt-6 rounded-md border-2 ">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">REVIEW</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
          {isSuccess ? (
            <>
              <ScriptSuccessPage />

              <div className="ps-1 pt-4 flex items-center justify-between">
                <div className="w-[100%]">
                  <TextField
                    className="w-[100%]"
                    placeholder="Write Additional Command Here "
                  />
                </div>
                <div className="w-[20%] ps-3 pe-3">
                  <Button variant="contained" className="button-black">
                    Run Command
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="ps-4 h-[calc(100vh-17.2rem)] overflow-scroll">
                <div className="mt-1 overflow-scroll">
                  <div key={"3234"} className="">
                    <div className="flex items-center pt-1 pb-1 w-full">
                      <div className=" pt-1 pb-1 w-[10%]">
                        <p className="font-bold pe-3 font-text">
                          {ScriptData?.name ? "Script Name" : "Script Name"}
                        </p>
                      </div>

                      <div className=" pt-1 pb-1 flex  ml-1  w-[90%]">
                        <p>{ScriptData?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center w-full">
                      <div className="w-[10%] flex  pt-1 pb-1">
                        <p className="font-bold  pe-3 font-text"> Thumbnail </p>
                      </div>

                      <div className=" ml-1 w-[90%] flex  pt-1 pb-1">
                        <Image
                          src={
                            ScriptData?.photoPath
                              ? URL?.createObjectURL(profileImage as any)
                              : ""
                          }
                          alt="No Image"
                          width={25}
                          height={25}
                        />
                      </div>
                    </div>
                    <div className="flex items-center pt-1 pb-1 w-full ">
                      <div className="w-[10%] flex">
                        <p className="font-bold pe-3 font-text ">
                          {channel?.channel ? "Channel " : "Channel "}
                        </p>
                      </div>

                      <div className=" pt-1 pb-1  ml-1  w-[90%]">
                        <p>{channel?.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-1 pb-1 w-full">
                      <div className="pt-1 pb-1 w-[10%]">
                        <p className="font-bold pe-3 font-text">
                          {topic?.topic ? "Topic " : "Topic "}
                        </p>
                      </div>

                      <div className="pt-1 pb-1  ml-1  w-[90%]">
                        <p>{topic?.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-1 pb-1 w-full">
                      <div className="w-[10%] flex pt-1 pb-1">
                        <p className="font-bold pe-3 font-text">
                          {model?.model ? "Model " : "Model "}
                        </p>
                      </div>

                      <div className="pt-1 pb-1  ml-1  w-[90%]">
                        <p>{model?.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-1 pb-1 w-full">
                      <div className="pt-1 pb-1 w-[10%]">
                        <p className="font-bold pe-3 font-text">
                          {outro?.outro ? "Outro " : "Outro "}
                        </p>
                      </div>

                      <div className="pt-1 pb-1  ml-1  w-[90%]">
                        <p>{outro?.outro}</p>
                      </div>
                    </div>
                    {/* <div className="pt-2 pb-2 border ps-2 pe-2">
                  <p>{Jobdata?.script}</p>
                </div> */}
                    <div className="flex justify-between items-center ">
                      <div className="w-[10%] flex">
                        <p className="font-bold pe-3 font-text">{"Script"}</p>
                      </div>
                      <div className="pe-2">
                        <div className="flex items-center">
                          <Button
                            variant="outlined"
                            className="rounded-lg ms-1 me-1"
                          >
                            Re-write
                          </Button>
                          <Button
                            variant="outlined"
                            className="rounded-lg ms-1 me-1"
                          >
                            Write More
                          </Button>
                          <p className="ms-1 me-1 font-bold">
                            {getWordCount()} Words
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex pt-1 pb-1 w-full h-[70%]">
                      <TextField
                        onChange={(event) => HandleScriptNumber(event)}
                        value={Jobdata?.script}
                        className="w-[97.7%]"
                        multiline
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewData;
