import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import Header from "@/common/Header/header"
import Image from "next/image"
import ChannelAndCategory from "./component/channelcategory"
import Script from "./component/Script"
import Voice from "./component/voice"
import BasicData from "./component/Basicdata"
import Review from "./component/Review"
import { Button } from "@mui/material"
const Create = () => {
    const [data, setData] = useState(1)

    const handleIncreaseTab = () => {
        if (data < 5) {
            setData(data + 1)
        }

    }
    const HandleBackData = () => {
        if (data > 1) {
            setData(data - 1)
        }
    }

    return (
        <div>
            <div>
                <Header title="Create SCRIPT AND VOICEOVER" />
            </div>
            <div className="table-bb-gray mt-4">
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex items-center cursor-pointer" >
                    <div className={data === 1 ? `border-number bg-black text-white` : `unactive-block`} >
                        <span>1</span>
                    </div>
                    <div><span className={data === 1 ? `active` : 'unactive'}>channel & Category</span></div>
                </div>
                <div className="flex items-center cursor-pointer" >
                    <div className={data === 2 ? `border-number bg-black text-white` : `unactive-block`}>
                        <span >2</span>
                    </div>
                    <div><span className={data === 2 ? `active` : 'unactive'}>Script</span></div>
                </div>
                <div className="flex items-center cursor-pointer" >
                    <div className={data === 3 ? `border-number bg-black text-white` : `unactive-block`}>
                        <span >3</span>
                    </div>
                    <div><span className={data === 3 ? `active` : 'unactive'}>Voice</span></div>
                </div>
                <div className="flex items-center cursor-pointer" >
                    <div className={data === 4 ? `border-number bg-black text-white` : `unactive-block`}>
                        <span>4</span>
                    </div>
                    <div><span className={data === 4 ? `active` : 'unactive'}>Basic</span></div>
                </div>
                <div className="flex items-center cursor-pointer" >
                    <div className={data === 5 ? `border-number bg-black text-white` : `unactive-block`}>
                        <span>5</span>
                    </div>
                    <div><span className={data === 5 ? `active` : 'unactive'}>Review</span></div>
                </div>
            </div>
            {data === 1 ? <><ChannelAndCategory /></> : data === 2 ? <><Script /></> : data === 3 ? <><Voice /></>
                : data === 4 ? <><BasicData /></>
                    : data === 5 ? <>  <Review /></> : null}
            <div className="table-bb-gray mt-4">
            </div>

            <div className='flex justify-between mt-4'>
                <div>
                    <Button variant="outlined" className='text-black'>Cancel</Button>
                </div>
                <div className='flex items-center'>
                    <div className='ps-2 pe-2'>
                        <Button variant="outlined" className='text-black' onClick={HandleBackData}>Back</Button>
                    </div>
                    <div className='ps-2 pe-2'>
                        <Button variant="contained" className='text-white bg-black' onClick={handleIncreaseTab}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create