import {
  ChannelCategoryDataMap,
  VoiceData,
} from "@/constants/channelcategories";
import { useVoices } from "@/services/voices/hooks";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useState, useRef, useEffect } from "react";
import Spinner from "@/modules/spinner/spinner";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import Skeleton from "@/common/Skeleton/Skeleton";

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

  console.log(Data, "DataVoices");

  return (
    <div>
      {loading ? (
        <>
          {" "}
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
            <div className="flex justify-center items-center  h-[calc(100vh-11.8rem)] ">
              <Skeleton
                widht={120}
                height={120}
                titleofPage="No Voice Data Found"
                TitleData="Suggestion"
              />
            </div>
          ) : (
            <>
              {" "}
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
                        className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2   w-[97%] `}
                      >
                        <div className="flex items-center">
                          <div>
                            {item?.labels?.gender === "male" &&
                            item?.labels?.age === "young" ? (
                              <Image
                                src="/black.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.gender === "female" &&
                              item?.labels?.age === "young" ? (
                              <Image
                                src="/whiteWomen.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.gender === "male" &&
                              item?.labels?.age === "old" ? (
                              <Image
                                src="/Old.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.age === "middle aged" &&
                              item?.labels?.gender === "female" ? (
                              <Image
                                src="/middleAgeWomen.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.age === "middle aged" &&
                              item?.labels?.gender === "male" ? (
                              <Image
                                src="/57.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.age === "middle aged" &&
                              item?.labels?.gender === "male" ? (
                              <Image
                                src="/british.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : item?.labels?.age === "young" &&
                              item?.labels?.gender === "female" ? (
                              <Image
                                src="/whiteWomen.png"
                                alt="channel"
                                width={40}
                                height={40}
                              />
                            ) : null}
                          </div>
                          <div className="ps-2">
                            <div className="pt-1 pb-1">
                              <p className="font-bold text-sm">{name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="ps-1 pe-1 pt-2">
                            <Image
                              src="/boy.png"
                              alt="round"
                              width={15}
                              height={15}
                            />
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Voice;
