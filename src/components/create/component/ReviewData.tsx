import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Job } from '@/components/Types/job.type'
import { useTopic } from '@/services/topic'
import { useModel } from '@/services/Script/hooks/useModel'
import { useGetOutro } from '@/services/outro'
import { Topic } from '@/constants/Topic'
import { OutroItems } from '@/./components/Types/Outro.type'
import { ModelList } from '@/constants/languageModel'
import { useGetChannels } from '@/services/channel'
import { Channel } from '@/constants/channelcategories'
import { Button, TextField } from '@mui/material'
import ScriptSuccessPage from './ScriptSuccessPage'
import LottieSpinner from '@/common/LottifliesSpinner/LottieSpinner'
import { useCommandJob, useRewriteJob } from '@/services/Jobs'
import { FaSpinner } from 'react-icons/fa'
import { data } from 'autoprefixer'

type AdditionalCommandsData = {
  commands?: string
}
type RewriteScript = {
  script: string
}

interface ChildComponentProps {
  ScriptData: Job | null
  Jobdata: {
    script: string
    id: string
  }
  setScriptData: (updatedState: Partial<Job>) => void
  isSuccess: boolean
  isLoading: boolean
}
const ReviewData: React.FC<ChildComponentProps> = ({
  ScriptData,
  Jobdata,
  isSuccess = true,
  setScriptData,
  isLoading
}) => {
  const profileImage = ScriptData?.photoPath
  const {
    isLoading: loading,
    data: Outrodata,
    isSuccess: success,
    mutate: mutateOutro
  } = useGetOutro()

  const {
    data: topicData,
    isLoading: topicLoading,
    mutate: topicMutate
  } = useTopic()
  const {
    mutate,
    isSuccess: rewriteSuccess,
    isLoading: rewriteLoading,
    data: rewriteData
  } = useRewriteJob()
  const {
    mutate: commandMutate,
    isSuccess: commandSuccess,
    isLoading: commandJobLoading,
    data: commandData
  } = useCommandJob()

  const { data: modelData } = useModel()
  const { data: channelData } = useGetChannels({})

  let topic = topicData?.find((obj: Topic) => obj.id === ScriptData?.topic)
  let outro = Outrodata?.find((obj: OutroItems) => obj.id === ScriptData?.outro)
  let model = modelData?.find((obj: ModelList) => obj.id === ScriptData?.model)
  let channel = channelData?.find(
    (obj: Channel) => obj.id === ScriptData?.channel
  )
  useEffect(() => {
    mutateOutro({})
    topicMutate({})
  }, [])

  const [NewCommand, setNewCommand] = useState<string | null>(null)

  const HandleAdditionalCommandData = () => {
    if (ScriptData) {
      const data = {
        id: Jobdata.id ?? undefined,
        user_text: NewCommand ?? undefined
      }
      commandMutate(data as any)
    }
    setNewCommand(null)
  }
  const handleRewrite = () => {
    if (ScriptData) {
      const data = {
        topic: ScriptData.topic ?? undefined,
        model: ScriptData.model ?? undefined,
        outro: ScriptData.outro ?? undefined,
        id: Jobdata.id ?? undefined
      }
      mutate(data)
    }
  }
  const rotateAnimation = `spin 1s linear infinite`
  useEffect(() => {
    if (commandSuccess) {
      setScriptData({ script: commandData.script })
    }
  }, [commandSuccess, commandData])
  useEffect(() => {
    if (rewriteSuccess) {
      setScriptData({ script: rewriteData.script })
    }
  }, [rewriteSuccess, rewriteData])
  return (
    <div>
      {(isLoading || rewriteLoading || commandJobLoading) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(200, 200, 200, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <LottieSpinner />
        </div>
      )}
      <div className='h-[calc(100vh-13.6rem)] mt-6 rounded-md border-2 '>
        <div>
          <div className='ps-3 pt-2'>
            <h4 className='font-bold'>REVIEW</h4>
          </div>
          <div className='table-bb-gray mt-4 ms-4 me-4'></div>
          <div className='ps-4 h-[calc(100vh-17.2rem)] overflow-scroll'>
            <div className='mt-1 overflow-scroll'>
              <div key={'3234'} className=''>
                <div className='flex items-center pt-1 pb-1 w-full'>
                  <div className=' pt-1 pb-1 w-[10%]'>
                    <p className='font-bold pe-3 font-text'>
                      {ScriptData?.name ? 'Script Name' : 'Script Name'}
                    </p>
                  </div>

                  <div className=' pt-1 pb-1 flex  ml-1  w-[90%]'>
                    <p>
                      {!ScriptData?.name ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: '10px'
                          }}
                        ></FaSpinner>
                      ) : (
                        ScriptData?.name
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex items-center w-full'>
                  <div className='w-[10%] flex  pt-1 pb-1'>
                    <p className='font-bold  pe-3 font-text'>Thumbnail</p>
                  </div>

                  <div className=' ml-1 w-[90%] flex  pt-1 pb-1'>
                    {!ScriptData?.photoPath ? (
                      <FaSpinner
                        size={16}
                        style={{
                          animation: rotateAnimation,
                          marginRight: '10px'
                        }}
                      ></FaSpinner>
                    ) : (
                      <Image
                        src={
                          ScriptData?.photoPath
                            ? URL?.createObjectURL(profileImage as any)
                            : ''
                        }
                        alt='No Image'
                        width={25}
                        height={25}
                      />
                    )}
                  </div>
                </div>
                <div className='flex items-center pt-1 pb-1 w-full '>
                  <div className='w-[10%] flex'>
                    <p className='font-bold pe-3 font-text '>
                      {channel?.channel ? 'Channel ' : 'Channel '}
                    </p>
                  </div>

                  <div className=' pt-1 pb-1  ml-1  w-[90%]'>
                    <p>
                      {!channel?.channel ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: '10px'
                          }}
                        ></FaSpinner>
                      ) : (
                        channel?.channel
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex items-center pt-1 pb-1 w-full'>
                  <div className='pt-1 pb-1 w-[10%]'>
                    <p className='font-bold pe-3 font-text'>
                      {topic?.topic ? 'Topic ' : 'Topic '}
                    </p>
                  </div>

                  <div className='pt-1 pb-1  ml-1  w-[90%]'>
                    <p>
                      {!topic?.topic ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: '10px'
                          }}
                        ></FaSpinner>
                      ) : (
                        topic?.topic
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex items-center pt-1 pb-1 w-full'>
                  <div className='w-[10%] flex pt-1 pb-1'>
                    <p className='font-bold pe-3 font-text'>
                      {model?.model ? 'Model ' : 'Model '}
                    </p>
                  </div>

                  <div className='pt-1 pb-1  ml-1  w-[90%]'>
                    <p>
                      {!model?.model ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: '10px'
                          }}
                        ></FaSpinner>
                      ) : (
                        model?.model
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex items-center pt-1 pb-1 w-full'>
                  <div className='pt-1 pb-1 w-[10%]'>
                    <p className='font-bold pe-3 font-text'>
                      {outro?.outro ? 'Outro ' : 'Outro '}
                    </p>
                  </div>

                  <div className='pt-1 pb-1  ml-1  w-[90%]'>
                    <p>
                      {!outro?.outro ? (
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: '10px'
                          }}
                        ></FaSpinner>
                      ) : (
                        outro?.outro
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex justify-between items-center '>
                  <div className='w-[10%] flex'>
                    <p className='font-bold pe-3 font-text'>{'Script'}</p>
                  </div>
                  {isSuccess ? (
                    <div className='pe-2'>
                      <div className='flex items-center'>
                        <Button
                          variant='outlined'
                          className='rounded-lg ms-1 me-1 button-gaps'
                          onClick={handleRewrite}
                        >
                          Re-write
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className=' flex pt-3 pb-3 w-full'>
                  <TextField
                    value={ScriptData?.script}
                    className='w-[97.7%]'
                    multiline
                  />
                </div>
                <>
                  {isSuccess ? (
                    <>
                      <div className='ps-1 pt-4 flex items-center justify-between'>
                        <div className='w-[100%]'>
                          <TextField
                            className='w-[100%]'
                            placeholder='Write Additional Command Here '
                            onChange={(
                              event: ChangeEvent<{
                                name?: string
                                value: string
                              }>
                            ) => setNewCommand(event.target.value)}
                          />
                        </div>
                        <div className='w-[20%] ps-3 pe-3'>
                          <Button
                            variant='contained'
                            onClick={HandleAdditionalCommandData}
                            className='button-black'
                          >
                            Run Command
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewData
