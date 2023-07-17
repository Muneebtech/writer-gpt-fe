import {
  ChannelCategoryDataMap,
  VoiceData,
} from "@/constants/channelcategories";
import { useVoices } from "@/services/voices/hooks";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useState, useRef, useEffect } from "react";

const Voice = () => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [selectCard, setSelectCard] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const { isLoading: loading, data: Data, isSuccess: success } = useVoices();

  const handleShowCard = (voice_id: string) => {
    if (voice_id === selectCard) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      }
      setSelectCard(null);
    } else {
      setSelectCard(voice_id);
      const audio = audioRefs.current[voice_id];
      if (audio) {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        setCurrentAudio(audio);
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  useEffect(() => {
    Data?.forEach((item: VoiceData) => {
      const { voice_id, preview_url } = item;
      const audio = new Audio(preview_url);
      audio.addEventListener("ended", () => {
        setCurrentAudio(null);
      });
      audioRefs.current[voice_id] = audio;
    });
  }, [Data]);

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.addEventListener("ended", () => {
          setCurrentAudio(null);
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-11.5rem)] overflow-scroll">
        <div className="flex items-center justify-between pe-16 ps-6 pt-4">
          <div className="flex items-center ">
            <p className="pe-6">No.</p>
            <p>Voice</p>
          </div>
        </div>
        <div className="table-bb-gray mt-2 ms-4 me-4"></div>
        <div className="flex flex-col justify-start mt-4 mb-4 ms-4 ">
          {Data?.map((item: VoiceData) => {
            const { name, voice_id } = item;
            return (
              <div
                onClick={() => handleShowCard(voice_id)}
                key={voice_id}
                className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2   w-[95%] `}
              >
                <div className="flex items-center">
                  <div>
                    <Image src="/57.png" alt="channel" width={40} height={40} />
                  </div>
                  <div className="ps-2">
                    <div className="pt-1 pb-1">
                      <p className="font-bold text-sm">{name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ps-1 pe-1 pt-2">
                    <Image src="/boy.png" alt="round" width={15} height={15} />
                  </div>
                  <div className="ps-1 pe-6 pt-2">
                    {selectCard === voice_id ? (
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
                  <div className="pt-2 cursor-pointer ">
                    <BsThreeDotsVertical />
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

export default Voice;