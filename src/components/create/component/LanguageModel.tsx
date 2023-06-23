import { TopicData, TopicModalData } from "@/constants/Topic"
import Image from "next/image"
const LanguageModel = () => {
    return (
        <div>
            <div className='mt-6 rounded-md border-2'>
                <div>
                    <div className='ps-3 pt-2'>
                        <h4 className='font-bold'>Select Your Channel</h4>
                    </div>
                    <div className="table-bb-gray mt-4 ms-4 me-4">
                    </div>
                </div>
                <div className='flex flex-wrap justify-start mt-4 mb-4'>
                    {TopicData?.map((item: TopicModalData) => {
                        const { id, title2 } = item
                        return (
                            <div key={id} className='flex justify-between items-center pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card'>
                                <div className='flex items-center'>
                                    <div className='ps-2 '>
                                        <div className='pt-1 pb-1'>
                                            <p className='font-bold text-sm'>
                                                {title2}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <Image src="/Round.png" alt='round' width={15} height={15} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LanguageModel