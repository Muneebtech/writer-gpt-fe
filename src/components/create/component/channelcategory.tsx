import Button from "@mui/material/Button";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Channel } from "@/constants/channelcategories";
import { useState, useEffect } from "react";
import { useGetChannels } from "@/services/channel";
import Spinner from "@/modules/spinner/spinner";

import { Job } from "@/components/Types/job.type";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import { useRouter } from "next/router";
import Skeleton from "@/common/Skeleton/Skeleton";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
  setChannelId: (channelId: string) => void;
}

type ChannelId = {
  id: string;
};
const ChannelAndCategory: React.FC<ChildComponentProps> = ({
  setScriptData,
  setChannelId,
}) => {
  const [selectedItemIdChannel, setSelectedItemIdChannel] =
    useState<ChannelId | null>(null);
  const selectedItemIdChannelAsString =
    selectedItemIdChannel?.toString() ?? "No selected item";

  console.log(
    typeof selectedItemIdChannelAsString,
    "selectedItemIdChannel::::::::::"
  );

  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    if (data) {
      try {
        const channelData = JSON.parse(data as string);
        // Assuming channelData has an 'id' property
        if (channelData.id) {
          setSelectedItemIdChannel(channelData.id);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [data]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  console.log(selectedItemId, "selectedItemId");

  const {
    isLoading: loading,
    data: Data,
    isSuccess: success,
  } = useGetChannels({});

  useEffect(() => {
    if (selectedItemIdChannelAsString) {
      setScriptData({ channel: selectedItemIdChannelAsString });
    }
  }, [selectedItemIdChannelAsString]);

  const handleClick = (id: string) => {
    setSelectedItemId(id === selectedItemId ? null : id);
    setScriptData({ channel: id });
    setChannelId(id);
  };

  return (
    <div>
      {loading ? (
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
          </div>
        </>
      ) : (
        <>
          {Data?.length === 0 ? (
            <div className="flex justify-center items-center  h-[calc(100vh-11.6rem)] ">
              <Skeleton
                widht={120}
                height={120}
                titleofPage="No Channel Record Found"
                TitleData="Suggestion"
              />
            </div>
          ) : (
            <>
              {" "}
              <div
                // style={{ height: `${divHeight}px` }}
                className="mt-6 rounded-md border-2 h-[calc(100vh-13.5rem)]"
              >
                <div className="h-[10%]">
                  <div className="ps-3 pt-2">
                    <h4 className="font-bold">SELECT YOUR CHANNEL</h4>
                  </div>
                  <div className="table-bb-gray mt-4 ms-4 me-4"></div>
                </div>
                <div></div>
                {Data?.length > 0 ? (
                  <div className="flex flex-wrap flex-start mt-4 mb-4 h-[90%] overflow-scroll">
                    {Data?.map((item: Channel) => {
                      const { id, channel, description } = item;
                      const isSelected = selectedItemId === id;
                      return (
                        <div
                          onClick={() => {
                            handleClick(id);
                          }}
                          key={id}
                          className={`flex cursor-pointer justify-between items-center pt-2 pb-2 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card ${
                            isSelected ? "Selected" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div>
                              <Image
                                src="/chaneel.png"
                                alt="channel"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="ps-2 ">
                              <div className="pt-1 pb-1">
                                <p className=" font-bold text-sm">{channel}</p>
                              </div>
                              <div>
                                <p className="text-green-400 text-xs">
                                  {description}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* SelectCard */}
                          <div className="">
                            {selectedItemId === item.id ||
                            selectedItemIdChannelAsString === item?.id ? (
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
                ) : (
                  <>
                    <div className="flex justify-center items-center h-[80%]">
                      <p className="font-[600] text-[15px]">
                        No Channel Data Available
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
          )}{" "}
        </>
      )}
    </div>
  );
};
export default ChannelAndCategory;
