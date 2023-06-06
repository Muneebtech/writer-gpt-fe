import React, { ChangeEvent, FormEvent, useRef } from "react";
import Cards from "./Cards";
import { categories } from "@/constants/categories";
import Header from "@/common/Header/header";
import { Box, Button, InputLabel, MenuItem, Modal, Select, Typography, Input, SelectChangeEvent, Popover } from "@mui/material";
import { FiCopy, FiPlus } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image"
interface FormData {
  name: string;
  categorylist: string;
  youtubeLink: string;
  discordLink: string;
  learningVideos: string;
  videoTopic: string;
}
const Brands = () => {
  const [openModal, setOpenModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const youtubeLinkSelectRef = useRef<HTMLSelectElement>(null);
  const discordLinkInputRef = useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const colors =
    ['gray', 'indigo', 'purple', 'pink', "silver", "black",
      "crimson", "Lavender", "Orange", "Cyan", "Gold", "Violet"];
  const [profileimage, setProfileImage] = useState<File | null>(null);
  // const { isLoading, data, isSuccess } = useCreateChannel()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    categorylist: '',
    youtubeLink: "",
    discordLink: "",
    learningVideos: "",
    videoTopic: ""
  });
  const [userData, setUserData] = useState<FormData[]>([])
  const handleInputChange = (event: ChangeEvent<{ name?: string; value: string }>) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name || '']: value,
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name || '']: value,
    }));
  };
  console.log("UserData", userData)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newFormData = {
      name: formData.name,
      categorylist: formData.categorylist,
      youtubeLink: formData.youtubeLink,
      discordLink: formData.discordLink,
      learningVideos: formData.learningVideos,
      videoTopic: formData.videoTopic,
      profileimage: profileimage ? URL.createObjectURL(profileimage) : ''
    };

    setUserData(prevData => [...prevData, newFormData]);
    setFormData({
      name: '',
      categorylist: '',
      youtubeLink: '',
      discordLink: '',
      learningVideos: '',
      videoTopic: ''
    });
    setProfileImage(null);
  };
  const handleUploadPictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setProfileImage(selectedImage);

      setFormData(prevFormData => ({
        ...prevFormData,
        profileimage: URL.createObjectURL(selectedImage)
      }));
    }
  };
  const copyToClipboard = (fieldName: string) => {
    let textToCopy = '';

    if (fieldName === 'discordLink' && discordLinkInputRef.current) {
      textToCopy = discordLinkInputRef.current.value;
    } else if (fieldName === 'youtubeLink' && youtubeLinkSelectRef.current) {
      textToCopy = youtubeLinkSelectRef.current.value;
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard:', textToCopy);
        })
        .catch((error) => {
          console.error('Error copying text to clipboard:', error);
        });
    }
  };
  const style = {
    position: "absolute" as "absolute",
    // top: "50%",
    height: 400,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  }
  const handlepopOverOpne = () => {
    setPopoverOpen(true)
  }
  const handlePopoverClose = () => {
    setPopoverOpen(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const data = {
    catergory: "Education",
    img: "@/public/profile.png",
    title: "Morning Prayers",
    subscribers: "1.5k",
    discord: "link",
    youtube: "link",
    others: {},
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Header title="CHANNELS" showSearch={true} searchKeyword="Search" />
        <Button onClick={handleOpenModal} variant="contained" className="bg-black text-white ps-4 pe-4">
          <FiPlus size={25} className="pe-1 ps-1" />
          Add Channel
        </Button>
      </div>
      <div className=" table-bb-gray mt-4 ">

      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-11/12">
          <Typography className="" variant="h6" gutterBottom>
            <div className="table-bb-gray flex items-center justify-between">
              <Header title="ADD CHANNELS" />
              <FaTimes
                onClick={handleCloseModal}
                className="cursor-pointer" />
            </div>
            <div className="flex items-center pb-6 pt-6 ">
              <div className="Side-spacing ">
                <div className="pt-2 pb-2">
                  <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold text-sm">
                    Name
                  </InputLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    className="border ps-4 pe-4 pt-2 pb-2 input-size "
                  />
                </div>
                <div >
                  <div className="flex items-center justify-between w-10/12">
                    <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold text-sm">
                      Category
                    </InputLabel>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={handlepopOverOpne}
                    >
                      <span className="border-b-2 border-gray-400 text-sm ">
                        Select Color
                      </span>
                      <div className="bg-gray-600 rounded-full ps-2 pe-2 pt-2 pb-2  ms-1 me-1">
                        <div>
                          <span style={{ color: selectedColor }}>
                            {selectedColor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Select
                    name="categorylist"
                    value={formData.categorylist}
                    onChange={handleSelectChange}
                    placeholder="Select category"
                    className="input-size"
                  >
                    <MenuItem value="category">Category</MenuItem>
                  </Select>
                  <Popover onClose={handlePopoverClose} open={popoverOpen} hideBackdrop={true}>
                    <span className="font-bold ps-2 pe-2 pt-4">Select Color</span>
                    <div className="flex justify-between flex-wrap w-11/12 pt-2 pb-2 ps-2 pe-2">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full mr-2 mt-2 mb-2"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </Popover>
                </div>
                <div className="pt-2 pb-2">
                  <InputLabel className="pt-2 pb-2 font-bold text-sm" htmlFor="youtube">
                    Youtube link
                  </InputLabel>
                  <Input
                    id="youtube"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Insert Youtube Link"
                    // inputRef={youtubeLinkSelectRef}
                    className="py-1  px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
                  />
                  <Button
                    onClick={() => copyToClipboard('youtubeLink')}
                    title="Copy Link"
                    className="bg-gray-200 position-btn border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
                  >
                    <FiCopy />
                  </Button>
                </div>
              </div >
              {/* Left Side */}
              < div className="Side-spacing " >
                <div className="flex items-center">
                  <div>
                    <div className="ms-4 mb-1 mt-1">
                      <span className="font-bold text-base">Profile Picture</span>
                    </div>
                    <div className=" ">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfileImageChange}
                      />
                      <Image
                        width={150}
                        height={150}
                        className="rounded-full mr-2"
                        src="/profileAvatar.png"
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div className=" ps-6 pe-6">
                    <div className="flex items-center pt-2 pb-2 cursor-pointer">
                      <AiOutlineUpload size={20} />
                      <span
                        onClick={handleUploadPictureClick}
                        className="ps-1 pe-1 border-b-2 border-gray-400 text-sm ">
                        Upload Picture
                      </span>
                    </div>
                    <div className="flex items-center pt-2 pb-2 cursor-pointer">
                      <AiOutlineUpload size={20} />
                      <span className="ps-1 pe-1 border-b-2 border-gray-400 text-sm">
                        Select Picture
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <InputLabel htmlFor="discord" className="pt-2 pb-2 font-bold text-sm">
                    Discord Link
                  </InputLabel>
                  <Input
                    name="discordLink"
                    value={formData.discordLink}
                    onChange={handleInputChange}
                    id="discord"
                    type="text"
                    placeholder="Insert Discord Link"
                    inputRef={discordLinkInputRef}
                    className="py-1 px-3 border  border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
                  />
                  <Button
                    onClick={() => copyToClipboard('discordLink')}
                    title="Copy Link"
                    className="bg-gray-200 position-btn border Discord-link  border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
                  >
                    <FiCopy />
                  </Button>
                </div>
              </div >
            </div>
          </Typography>
          <div className="table-bb-gray "></div>
          <div className="flex justify-between items-center pt-4 pb-2">
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              className=" black text-black px-4 py-1 ms-1 me-1"
            >
              Cancel
            </Button>
            <Button variant="contained" className="bg-black text-white ps-4 pe-4">
              <FiPlus size={25} className="pe-1 ps-1" />
              Create Channel
            </Button>
          </div>
        </div>
      </Modal>
      <div className="pt-4 flex flex-col text-black gap-5">
        <div className="flex flex-wrap gap-2 justify-between">
          {categories.map((obj) => (
            <span className="px-4 py-2 border rounded-3xl text-xs text-center">
              {obj}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <Cards {...data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Brands;
