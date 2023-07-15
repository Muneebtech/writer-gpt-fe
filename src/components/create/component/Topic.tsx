import { Job } from "@/components/Types/job.type";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import Spinner from "@/modules/spinner/spinner";
import { useTopic } from "@/services/topic";
import { Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}

const Topic: React.FC<ChildComponentProps> = ({ setScriptData }) => {
  const [selectTopic, setSelectTopic] = useState<string | null>(null);
  const { data: topicData, isLoading } = useTopic();
  console.log(topicData, "topicDat:::");

  const handleClick = (id: string) => {
    setSelectTopic(id === selectTopic ? null : id);
    setScriptData({ topic: id });
  };
  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div
            // style={{ height: `${divHeight}px` }}
            className="mt-6 rounded-md border-2 h-[calc(100vh-14.5rem)]"
          >
            <div>
              <div className="ps-3 pt-2">
                <h4 className="font-bold">Select Topic</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            <div className="flex flex-wrap justify-center mt-4 mb-4 height-table">
              {topicData?.map((item: Topic) => {
                const { id, topic, description } = item;
                return (
                  <div
                    onClick={() => handleClick(id)}
                    key={id}
                    className="flex
                            cursor-pointer justify-between items-center pt-2 pb-2 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card"
                  >
                    <div className="flex items-center">
                      <div className="ps-2 ">
                        <div className="pt-1 pb-1">
                          <p className=" font-bold text-sm">{topic}</p>
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
