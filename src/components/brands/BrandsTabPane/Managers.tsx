import { ManagerType } from "@/components/Types/manager.type";

import Image from "next/image";

import { useState, useRef } from "react";
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
        <div className="flex items-center justify-between pe-12 ps-6 pt-4">
          <div className="flex items-center ">
            <p className="pe-6">No.</p>
            <p>Managers</p>
          </div>
          <div className="">
            <p>Status</p>
          </div>
        </div>
        <div className="table-bb-gray mt-2 ms-4 me-4"></div>
        <div className="flex flex-col justify-start mb-4 ms-4 ">
          {managerDataList?.map((item: ManagerType) => {
            const { email, firstName, id, status } = item;
            return (
              <div
                // onClick={() => handleShowCard(voice_id)}
                key={id}
                className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border-b-2 rounded ms-2 me-2 mt-2 mb-2`}
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
                  <div className="ps-1 pe-6"></div>
                  <div className="ps-1 pe-6">
                    <p>{status}</p>
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
