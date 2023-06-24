// components/Sidebar.tsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import './../../../public/profile.png'
import { FiSettings, FiLogOut, FiPlayCircle, FiFolder, FiTv, FiBook, FiHome, FiEdit, FiHash, FiMessageSquare } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { decryptData } from '@/utils/localStorage';
import { useLogout } from '@/services/auth';
import Cookies from 'js-cookie';
const Sidebar: React.FC = () => {
    const router = useRouter();
    const userData = decryptData("userdata")
    const token = decryptData("token")
    console.log(userData, '------', token);
    const { mutate, isSuccess } = useLogout()
    const handleLogout = () => {
        mutate({ refreshToken: token?.refresh?.token })
        Cookies.remove('userdata')
        Cookies.remove('token')
    }
    useEffect(() => {
        if (isSuccess) {
            router.push('/signin')
        }
    }, [isSuccess])

    return (
        <div className="w-48 h-screen flex flex-col bg-black text-white ">
            <div className="p-4">
                {/* Profile section */}
                <div className="flex items-center mb-4">
                    <Image width={500}
                        height={300}
                        className="w-10 h-10 rounded-full mr-2"
                        src="/profile.png"
                        alt="Profile"
                    />
                    <span className="font-semibold">Rana Muneeb Tahir</span>
                </div>
            </div>
            <nav className="px-4 flex-grow">
                {/* Navigation section */}
                <ul className="">
                    {/* <li>
                        <Link href="/">
                            <span className={` ${router.pathname === '/' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiHome />
                                </span>
                                Home
                            </span>
                        </Link>
                    </li> */}
                    <li>
                        <Link href="/brands">
                            <span className={` ${router.pathname === '/brands' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiTv />
                                </span>
                                Brands
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/library">
                            <span className={` ${router.pathname === '/library' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiBook />
                                </span>
                                Library
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/script/create">
                            <span className={` ${router.pathname === '/script/create' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiEdit />
                                </span>
                                Create
                            </span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/topics">
                            <span className={` ${router.pathname === '/topics' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiHash />
                                </span>
                                Topics
                            </span>
                        </Link>
                    </li> */}
                    {/* Add more navigation options here */}
                </ul>
            </nav>
            <div className="p-4">
                {/* Bottom section */}
                <ul className="space-y-1 ">
                    <li>
                        <Link href="/settings">
                            <span className={` ${router.pathname === '/settings' ? 'selected' : ''} font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600`}>
                                <span className="w-6 mr-2">
                                    <FiSettings />
                                </span>
                                Settings
                            </span>
                        </Link>
                    </li>
                </ul>
                <ul className="space-y-1 ">
                    <li onClick={handleLogout}>
                        <span className=" flex items-center cursor-pointer font-semibold flex items-center hover:bg-neutral-800 rounded-md p-2 border-l-4 border-transparent hover:border-neutral-600" >
                            <FiLogOut className="mr-2" />
                            <span className='ps-1 pe-1'> Logout</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
