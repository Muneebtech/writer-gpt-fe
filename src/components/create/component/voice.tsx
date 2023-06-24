import { ChannelCategoryDataMap, VoiceData } from '@/constants/channelcategories';
import { useVoices } from '@/services/voices/hooks';
import Image from 'next/image';

import { useState, useRef, useEffect } from 'react';
interface ChildComponentProps {
  setScriptData: React.Dispatch<React.SetStateAction<number>>;
}
const Voice = ({setScriptData}:ChildComponentProps) => {

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [selectCard, setSelectCard] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
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
      audio.addEventListener('ended', () => {
        setCurrentAudio(null);
      });
      audioRefs.current[voice_id] = audio;
    });
  }, [Data]);

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.addEventListener('ended', () => {
          setCurrentAudio(null);
        });
      }
    });
  }, []);

  return (
    <div>
      <div className='mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <h4 className='font-bold'>SELECT YOUR VOICE</h4>
          </div>
          <div className='table-bb-gray mt-4 ms-4 me-4'></div>
        </div>
        <div className='flex flex-wrap justify-start mt-4 mb-4'>
          {Data?.map((item: VoiceData) => {
            const { name, voice_id } = item;
            return (
              <div
                onClick={() => handleShowCard(voice_id)}
                key={voice_id}
                className={`flex justify-between items-center cursor-pointer pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card`}
              >
                <div className='flex items-center'>
                  <div>
                    <Image src='/57.png' alt='channel' width={40} height={40} />
                  </div>
                  <div className='ps-2'>
                    <div className='pt-1 pb-1'>
                      <p className='font-bold text-sm'>{name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='ps-1 pe-1'>
                    <Image src='/boy.png' alt='round' width={15} height={15} />
                  </div>
                  <div className='ps-1 pe-1'>
                    {selectCard === voice_id ? (
                      <img src='/SelectCard.png' alt='round' width={12} height={12} />
                    ) : (
                      <Image src='/Round.png' alt='round' width={12} height={12} />
                    )}
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
