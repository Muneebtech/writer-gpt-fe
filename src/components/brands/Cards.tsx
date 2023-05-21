import { generateRandomColors } from '@/utils/randomColor'
import Image from 'next/image'
import React from 'react'
interface CardProps {
    catergory: string,
    img: string,
    title: string,
    subscribers: string,
    discord: string,
    youtube: string,
    others: object
}
const Cards: React.FC<CardProps> = (data) => {
    const { backgroundColor, textColor } = generateRandomColors()

    return (
        <div className='h-60 w-52 flex flex-col justify-center items-center border border-gray-200 gap-2 rounded-lg'>
            <span style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }} className='px-4 py-2 rounded-3xl text-xs text-center flex justify-center items-center'>Category</span>
            <Image width={60} height={60} src="/profile.png" alt="none" />
            <div className='flex flex-col justify-center items-center mb-5'>
                <span className='text-lg font-medium'>Morning Prayer</span>
                <span className='text-xs text-gray-500'>Subscribers {data?.subscribers} </span>
            </div>
            <div className='flex gap-2'>
                <div className='rounded-2xl px-4 py-2 flex justify-center items-center border-gray-200 border'>
                    <Image width={12} height={12} src="/profile.png" alt="" />
                </div>
                <div className='rounded-2xl px-4 py-2 flex justify-center items-center border-gray-200 border'>
                    <Image width={12} height={12} src="/profile.png" alt="" />

                </div>
                <div className='rounded-2xl px-4 py-2 flex justify-center items-center border-gray-200 border'>
                    <Image width={12} height={12} src="/profile.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Cards