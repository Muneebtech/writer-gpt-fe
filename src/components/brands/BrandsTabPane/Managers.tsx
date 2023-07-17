import { ManagerType } from "@/components/Types/manager.type";
import {
  ChannelCategoryDataMap,
  VoiceData,
} from "@/constants/channelcategories";
import { UseGetManagers } from "@/services/managers";
import { useVoices } from "@/services/voices/hooks";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
interface ManagerDataChildProps {
  managerDataList: ManagerType[];
}
const Manager: React.FC<ManagerDataChildProps> = ({ managerDataList }) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [selectCard, setSelectCard] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  console.log(managerDataList, "managerDataList");

  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-11.5rem)] overflow-scroll">
        <div className="flex items-center justify-between pe-16 ps-6 pt-4">
          <div className="flex items-center ">
            <p className="pe-6">No.</p>
            <p>Managers</p>
          </div>
          <div className="pe-6">
            <p>Status</p>
          </div>
        </div>
        <div className="table-bb-gray mt-2 ms-4 me-4"></div>
        <div className="flex flex-col justify-start mb-4 ms-4 ">
          {managerDataList?.map((item: ManagerType) => {
            const { email, firstName, id, active } = item;
            return (
              <div
                // onClick={() => handleShowCard(voice_id)}
                key={id}
                className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border-b-2 rounded ms-2 me-2 mt-2 mb-2   w-[92%] `}
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src="/manager.png"
                      alt="channel"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ps-3">
                    <div className="pt-1 pb-1">
                      <p className="font-bold text-sm">{firstName}</p>
                      <p className="font-extralight text-sm">{email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ps-1 pe-1"></div>
                  <div className="ps-1 pe-1">
                    <p>{active}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Manager;
