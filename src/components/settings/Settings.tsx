import Header from "@/common/Header/header"
import { Button, Switch } from "@mui/material"
import { useState } from "react"
import { AiOutlineLeft } from "react-icons/ai"
import Image from "next/image"


const Setting = () => {
    const [showProfile, setShowprofile] = useState(true)

    const handleOpenProfile = () => {
        setShowprofile(false)
    }
    const handleCloseProfile = () => {
        setShowprofile(true)
    }
    return (
        <>
            {showProfile ? <>
                <div>
                    <Header title="Settings" />
                </div>
                <div className="table-bb-gray mt-4">
                </div>
                <div className="table-bb-gray mt-4 mb-4 cursor-pointer" onClick={handleOpenProfile}>
                    <span className="text-xl font-bold pb-1 pt-1">Profile Setting</span>
                    <p className="pt-2 pb-2 w-3/4 font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
                        Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed gravida justo.
                        Nulla tempor lobortis massa at imperdiet. Integer ut blandit dui.</p>
                </div>
                <div className="table-bb-gray mt-4 mb-4">
                    <div className="flex justify-between pe-4">
                        <span className="text-xl font-bold pb-1 pt-1">History</span>
                        <Switch className="text-black" />
                    </div>
                    <p className="pt-2 pb-2 w-3/4 font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
                        Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed gravida justo.
                        Nulla tempor lobortis massa at imperdiet. Integer ut blandit dui.</p>
                </div>
                <div className="table-bb-gray mt-4 mb-4">
                    <div className="flex justify-between pe-4">
                        <span className="text-xl font-bold pb-1 pt-1">Lorem Ipsum</span>
                        <Switch className="text-black" />
                    </div>
                    <p className="pt-2 pb-2 w-3/4 font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
                        Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed gravida justo.
                        Nulla tempor lobortis massa at imperdiet. Integer ut blandit dui.</p>
                </div>
            </> : <>
                <div className="flex items-center cursor-pointer" onClick={handleCloseProfile}>
                    <span className="ps-2 pe-2">
                        <AiOutlineLeft />
                    </span>
                    <Header title="Profile History" />
                </div>
                <div className="table-bb-gray mt-4">
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <div className="">
                            <div className="flex items-center">
                                <Image
                                    width={170}
                                    height={170}
                                    className="rounded-full mr-2"
                                    src="/ProfileAvatar.png"
                                    alt="Profile"
                                />
                                <div className="ps-4 ">
                                    <div>
                                        <span className="text-2xl font-bold">Joe Harrison</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Manager</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <Button className="button-black ps-4 pe-4 pt-2 pb-2">Edit</Button>
                        </div>
                    </div>
                    <div className="flex mt-6" >
                        <div className="border-e-2 ps-3 pe-3">
                            <div className="pt-2 pb-2 ps-2 pe-2">
                                <span className="font-medium">Email</span>
                            </div>
                            <div className="pt-2 pb-2 ps-2 pe-2">
                                <span className="font-medium">Number</span>
                            </div>
                        </div>
                        <div className="table-bb-gray"></div>
                        <div className="ps-3 pe-3">
                            <div className="pt-2 pb-2 ps-2 pe-2">
                                <span className="font-medium">joeharrison@gmail.com</span>
                            </div>
                            <div className="pt-2 pb-2 ps-2 pe-2">
                                <span className="font-medium">+154826846849</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

        </>
    )
}
export default Setting