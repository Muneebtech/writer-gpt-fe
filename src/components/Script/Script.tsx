import { categories } from "@/constants/categories"
import { OutroItems, Outros } from "@/constants/outro"
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
  Popover
} from "@mui/material"
import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import { FiCopy, FiCheck } from "react-icons/fi"
import { AiOutlineUpload } from "react-icons/ai"
import Image from "next/image"
import { useCreateChannel } from "@/services/channel"
import Header from "@/common/Header/header"
import { useOutro } from "@/services/outro"
interface FormData {
  name: string;
  categorylist: string;
  youtubeLink: string;
  discordLink: string;
  learningVideos: string;
  videoTopic: string;
  // Add more properties with their respective data types
}
const Script = () => {
  const { isLoading: loading, data: Data, isSuccess: success } = useOutro()
  console.log(Data, "datadata")
  const Outrodata = Data?.results
  console.log("OutrosData", Outrodata)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const youtubeLinkSelectRef = useRef<HTMLSelectElement>(null);
  const discordLinkInputRef = useRef<HTMLInputElement>(null);
  const InputRef = useRef<HTMLInputElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isOpen, setIsOpen] = useState(false)
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
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
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
    event.preventDefault();
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

  const handleOpenModal = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handlepopOverOpne = () => {
    setPopoverOpen(true)
  }
  const handlePopoverClose = () => {
    setPopoverOpen(false)
  }
  const handleSelectOption = (option: string) => {
    setSelectedOption(option)
    setTextareaValue(option)
  }
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
  }
  return (
    <>
      <div>
        <Header title="Create CHANNEL" />
      </div>
      <div className="table-bb-gray mt-4">
      </div>
      {/* Right-section */}
      <div className="flex items-center pt-4">
        <div className="Side-spacing ">
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
              Name
            </InputLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              className="border ps-4 pe-4 pt-3 pb-3 input-size "
            />
          </div>
          <div className="pt-2 pb-2">
            <div className="flex items-center justify-between w-10/12">
              <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
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
            <Popover open={popoverOpen} hideBackdrop={true}>
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
            <InputLabel className="pt-2 pb-2 font-bold" htmlFor="youtube">
              Youtube link
            </InputLabel>
            <Input
              id="youtube"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleInputChange}
              type="text"
              placeholder="Insert Youtube Link"
              inputRef={youtubeLinkSelectRef}
              className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
            />
            <Button
              onClick={() => copyToClipboard('youtubeLink')}
              title="Copy Link"
              className="bg-gray-200 position-btn border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
            >
              <FiCopy />
            </Button>
          </div>
          <div className="pt-2 pb-2 ">
            <InputLabel htmlFor="topic" className="pt-2 pb-2 font-bold">
              Learning
            </InputLabel>
            <Select
              name="learningVideos"
              value={formData.learningVideos}
              onChange={handleSelectChange}
              id="topic"
              placeholder="Select topic"
              className="input-size "
            >
              <MenuItem value="learning">Learning</MenuItem>
            </Select>
          </div>
        </div >
        {/* Left Side */}
        <div className="Side-spacing " >
          <div className="flex items-center">
            <div>
              <div className="ms-4 mb-1 mt-1">
                <span className="font-bold ">Profile Picture</span>
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
                  width={170}
                  height={170}
                  className="rounded-full mr-2"
                  src="/ProfileAvatar.png"
                  alt="Profile"
                />
              </div>
            </div>
            <div className=" ps-6 pe-6">
              <div className="flex items-center pt-2 pb-2 cursor-pointer">
                <AiOutlineUpload size={20} />
                <span onClick={handleUploadPictureClick} className="ps-1 pe-1 border-b-2 border-gray-400">
                  Upload Picture
                </span>
              </div>
              <div className="flex items-center pt-2 pb-2 cursor-pointer">
                <AiOutlineUpload size={20} />
                <span className="ps-1 pe-1 border-b-2 border-gray-400">
                  Select Picture
                </span>
              </div>
            </div>
          </div>
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="discord" className="pt-2 pb-2 font-bold">
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
              className="py-2 px-3 border  border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
            />
            <Button
              onClick={() => copyToClipboard('discordLink')}
              title="Copy Link"
              className="bg-gray-200 position-btn border Discord-link  border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
            >
              <FiCopy />
            </Button>
          </div>
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
              Video Topic
            </InputLabel>
            <Select
              name="videoTopic"
              value={formData.videoTopic}
              onChange={handleSelectChange}
              id="topic" label="Select topic" className="input-size ">
              <MenuItem value="video">Vidoes</MenuItem>
            </Select>
          </div>
        </div >
        <div></div>
      </div >
      <div className="container mx-auto mt-8">
        <InputLabel className="pt-2 pb-2 font-bold">Outros</InputLabel>
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          className="border w-full border-gray-300 rounded p-2 mb-4"
        ></textarea>
        <div className="flex justify-end items-center pb-8">
          <span onClick={handleOpenModal} className="ps-1 pe-1 border-b-2 border-gray-800 me-2 ms-2">
            Edit
          </span>
          <span onClick={handleOpenModal} className="ps-1 pe-1 border-b-2 border-gray-800 me-2 ms-2">
            Change
          </span>
        </div>
        <div className="pt-6 pb-6 flex justify-end">
          <Button onClick={handleSubmit}
            className="button-black ps-8 pe-8 pt-2 pb-2 "
            variant="contained">Create</Button>
        </div>
        <Modal
          open={modalOpen}
          className="flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-3/4">
            <Typography variant="h6" gutterBottom>
              Select Outros
            </Typography>
            <List className="custom-scrollbar">
              {Outrodata?.map((item: OutroItems) => {
                return (
                  <ListItem button key={item?.id}>
                    <Checkbox color="default" onClick={() => handleSelectOption(item.description)}></Checkbox>
                    <ListItemText className="border-2 ps-2 pe-2 pt-2 pb-2" primary={item.description} />
                  </ListItem>
                );
              })}
              <div className="flex justify-end">
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="primary"
                  className="text-primary px-4 py-2 ms-1 me-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleCloseModal} className="button-black px-4 py-2">
                  Submit
                </Button>
              </div>
            </List>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Script
