import { outroDataTypes } from "@/components/Types/Outro.type";
import { useGetOutro } from "@/services/outro";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import { useState } from "react";
import { useTopic } from "@/services/topic";

interface TopicDataListProps {
  data: Topic[];
  TopicFilterData: Topic[];
}
const VideoTopic: React.FC<TopicDataListProps> = ({
  data,
  TopicFilterData,
}) => {
  // const handleClick = (id: string) => {
  //   setSelectTopic(id === selectTopic ? null : id);
  //   setScriptData({ topic: id });
  // };
  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-11.5rem)]">
        <div className="flex items-center justify-between pe-16 ps-6 pt-4">
          <div className="flex items-center ">
            <p className="pe-6">No.</p>
            <p>Topics</p>
          </div>
          <div className="pe-6">
            <p>Status</p>
          </div>
        </div>
        <div className="table-bb-gray mt-2 ms-4 me-4"></div>
        <div className="overflow-scroll h-[calc(100vh-14.5rem)]">
          <>
            {(TopicFilterData?.length > 0 ? TopicFilterData : data)?.map(
              (item: Topic, index) => {
                const { id, topic } = item;
                return (
                  <>
                    <div
                      key={id}
                      className="border-b-2 pt-2 pb-2 mt-2 mb-2 ms-2 me-2"
                    >
                      <div className="flex pe-12 ps-6 items-center">
                        <div className="pt-2 ">
                          <p>{index + 1}</p>
                        </div>
                        <div className="ps-10 pe-10 pt-1 pb-1 w-[100%]">
                          <p className="text-sm">{topic}</p>
                        </div>
                        {/* <div>
                        <p className="bg-black text-white text-xs pt-1 pb-1 ps-2  mt-1 me-4  pe-2 rounded-xl">
                          {item?.status === null
                            ? "New" || items?.status === "New"
                              ? " New"
                              : "Used"
                            : ""}
                        </p>
                      </div> */}
                        <div className="pt-2 cursor-pointer ">
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default VideoTopic;
