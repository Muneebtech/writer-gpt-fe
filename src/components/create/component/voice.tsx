import { ChannelCategoryDataMap, ChaneelData } from '@/constants/channelcategories';
import { useVoices } from '@/services/voices/hooks';
import Image from 'next/image';

import { useState, useRef } from 'react';
const Voice = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectCard, setSelectCard] = useState<number | null>(null)
  const { isLoading: loading, data: Data, isSuccess: success } = useVoices()
  console.log(Data, "Data")
  const HandleShowCard = (voice_id : number) => {
    if (voice_id === selectCard) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setSelectCard(null);
    } else {
      setSelectCard(voice_id);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };
  // console.log("data", Data)
  return (
    <div>
      <div className='mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <h4 className='font-bold'>SELECT YOUR VOICE</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4">
          </div>
        </div>
        <div className='flex flex-wrap justify-start mt-4 mb-4'>

          {Data?.map((item: ChaneelData) => {
            const { name, preview_url, voice_id
            } = item;
            return (
              <div
                onClick={() => HandleShowCard(voice_id)}
                key={voice_id
                }
                className={`flex justify-between items-center cursor-pointer pt-4 
                   pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card 
            }`}
              >
                <div className='flex items-center'>
                  <div>
                    <Image src='/57.png' alt='channel' width={40} height={40} />
                  </div>
                  <div className='ps-2'>
                    <div className='pt-1 pb-1'>
                      <p className='font-bold text-sm'>{name}</p>
                    </div>
                    <div>
                      {/* <p className='text-green-400 text-xs'>{descrp}</p> */}
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
                  <audio id="clickSound" ref={audioRef} src={preview_url} />
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  )
}
export default Voice