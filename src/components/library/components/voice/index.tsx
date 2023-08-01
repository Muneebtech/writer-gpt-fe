import { VoiceData } from "@/constants/channelcategories";
import { TableListData } from "@/constants/library";
import Spinner from "@/modules/spinner/spinner";
import { useGenerateVoice, useVoices } from "@/services/voices/hooks";
import { Button } from "@mui/material";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
interface ChildComponentProps {
  selectedRow: TableListData | undefined;
  handleCloseModal: () => void;
}
const Voice = ({ handleCloseModal, selectedRow }: ChildComponentProps) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [selectCard, setSelectCard] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const { isLoading: loading, data: Data, isSuccess: success } = useVoices();
  const voiceData = useGenerateVoice();
  const handleShowCard = (voice_id: string) => {
    if (voice_id === selectCard) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      }
      setSelectCard("");
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
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.addEventListener("ended", () => {
          setCurrentAudio(null);
        });
      }
    });
  }, []);

  const handleSubmit = () => {
    if (selectedRow) {
      const data = {
        job_id: selectedRow?.id,
        voiceover_script: selectedRow?.script,
        voice_id: selectCard,
      };
      voiceData.mutate(data);
    }
  };
  const [audioUrl, setAudioUrl] = useState<string>();

  useEffect(() => {
    if (voiceData.data) {
      // Create a new Blob URL from the provided Blob
      setAudioUrl(voiceData.data?.file_link);
    }
  }, [voiceData.data]);
  const rotateAnimation = `spin 1s linear infinite`;
  return (
    <div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div className="mt-6 rounded-md border-2 h-[calc(100vh-13.5rem)]">
            <div className="h-[10%]">
              <div className="ps-3 pt-2">
                <h4 className="font-bold">SELECT YOUR VOICE</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            <div className="flex h-[90%] flex-wrap justify-center mt-4 mb-4 overflow-scroll">
              {Data?.map((item: VoiceData) => {
                const { name, voice_id } = item;
                return (
                  <div
                    onClick={() => handleShowCard(voice_id)}
                    key={voice_id}
                    className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card `}
                  >
                    <div className="flex items-center">
                      <div>
                        <Image
                          src="/57.png"
                          alt="channel"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ps-2">
                        <div className="pt-1 pb-1">
                          <p className="font-bold text-sm">{name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="ps-1 pe-1">
                        <Image
                          src="/boy.png"
                          alt="round"
                          width={15}
                          height={15}
                        />
                      </div>
                      <div className="ps-1 pe-1">
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
          <div className="flex justify-end mt-2 ms-1 me-1 gap-2">
            <div>
              {audioUrl ? (
                <audio controls src={audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              ) : null}
            </div>
            <Button
              className="text-black "
              variant="outlined"
              onClick={handleCloseModal}
              disabled={voiceData.isLoading}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="button-black "
              onClick={handleSubmit}
              disabled={voiceData.isLoading}
            >
              {voiceData.isLoading && (
                <FaSpinner
                  size={16}
                  style={{
                    animation: rotateAnimation,
                    marginRight: "10px",
                  }}
                ></FaSpinner>
              )}
              Generate
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Voice;
