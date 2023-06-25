
import Button from "@mui/material/Button";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Channel } from "@/constants/channelcategories";
import { useState } from "react";
import { useGetChannels } from "@/services/channel";
import Spinner from "@/modules/spinner/spinner";

import { Job } from "@/components/Types/job.type";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}
const ChannelAndCategory: React.FC<ChildComponentProps> = ({
  setScriptData,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const {
    isLoading: loading,
    data: Data,
    isSuccess: success,
  } = useGetChannels({});

  const handleClick = (id: string) => {
    setSelectedItemId(id === selectedItemId ? null : id);
    setScriptData({ channel: id });
  };
  return (
    <div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {" "}
          <div className="mt-6 rounded-md border-2">
            <div>
              <div className="ps-3 pt-2">
                <h4 className="font-bold">SELECT YOUR CHANNEL</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            <div className="flex flex-wrap justify-center mt-4 mb-4">
              {Data?.map((item: Channel) => {
                const { id, channel, description } = item;
                return (
                  <div
                    onClick={() => handleClick(id)}
                    key={id}
                    className="flex
                            cursor-pointer justify-between items-center pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card"
                  >
                    <div className="flex items-center">
                      <div>
                        <Image
                          src="/chaneel.png"
                          alt="channel"
                          width={40}
                          height={40}
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
                      {selectedItemId === item.id ? (
                        <img
                          src="/SelectCard.png"
                          alt="round"
                          width={12}
                          height={12}
                        />
                      ) : (
                        <img
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
export default ChannelAndCategory;
