import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import { Job } from "@/components/Types/job.type";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import Spinner from "@/modules/spinner/spinner";
import { useGetChannelById } from "@/services/channel";
import { useTopic } from "@/services/topic";
import { Button } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
  channelId: string;
}
const Topic: React.FC<ChildComponentProps> = ({ setScriptData, channelId }) => {
  const [selectTopic, setSelectTopic] = useState<string | null>(null);
  const { data: topicData, isLoading, mutate } = useTopic();
  console.log(topicData, "topicDat:::");

  const handleClick = (id: string) => {
    setSelectTopic(id === selectTopic ? null : id);
    setScriptData({ topic: id });
  };

  useEffect(() => {
    if (channelId) {
      mutate({ channel: channelId });
    }
  }, [channelId]);

  return (
    <div>
      {isLoading ? (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(200, 200, 200, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <LottieSpinner />
          </div>{" "}
        </>
      ) : (
        <>
          <div
            // style={{ height: `${divHeight}px` }}
            className="mt-6 rounded-md border-2 h-[calc(100vh-13.5rem)]"
          >
            <div className="h-[10%]">
              <div className="ps-3 pt-2">
                <h4 className="font-bold">Select Topic</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            {topicData?.length > 0 ? (
              <div className="overflow-scroll h-[90%]">
                <div className="flex flex-wrap justify-start mt-4 mb-4 ">
                  {topicData?.map((item: Topic) => {
                    const { id, topic, description } = item;
                    return (
                      <div
                        onClick={() => handleClick(id)}
                        key={id}
                        className="flex h-[20%]
                            cursor-pointer justify-between items-center ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card"
                      >
                        <div className="flex items-center">
                          <div className="ps-2 ">
                            <div className="pt-1 pb-1">
                              <Tooltip title={topic}>
                                <p className=" font-bold text-sm truncate-text">
                                  {topic}
                                </p>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        {/* SelectCard */}
                        <div className="">
                          
                          {selectTopic === item.id ? (
                            <Image
                              src="/SelectCard.png"
                              alt="round"
                              width={12}
                              height={12}
                            />
                          ) : (
                            <Image
                              src="/Round.png"
                              alt="round"
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center h-[80%]">
                  <p className="font-[600] text-[15px]">
                    No Topic Data Available
                  </p>
                </div>
              </>
            )}

            {/* <div className="ps-2 pb-6">
              <div>
                <Button
                  variant="outlined"
                  className="widht-card pt-2 pb-2 text-black border-black-btn"
                >
                  <FaPlus size={30} className="ps-2 pe-2" /> Add Channel
                </Button>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};
export default Topic;
