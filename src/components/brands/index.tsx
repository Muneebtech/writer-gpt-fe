import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Cards from "./Cards";
import { categories } from "@/constants/categories";
import Header from "@/common/Header/header";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  Input,
  SelectChangeEvent,
  Popover,
} from "@mui/material";
import { FiCopy, FiPlus } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { categoryDataTypess } from "../Types/category.type";
// import BrandsLibrary from "../brandsLibrary/brandsLibrary";
import { CardsData, CardsDatatype } from "@/constants/Cards";
import { useCategories } from "@/services/category/hooks/useCategories";
import { ChannelServices, useCreateChannel } from "@/services/channel";
import { useGetChannels } from "@/services/channel/hooks/useGetChannels";
import { createChannelTypes, getChannelTypes } from "../Types/channel.types";
import Spinner from "@/modules/spinner/spinner";
interface FormData {
  channel: string;
  category: string;
  youtubeLink: string;
  discordLink: string;
  photoPath: File | any;
}
const Brands = () => {
  const {
    isLoading: loading,
    data: Data,
    isSuccess: success,
  } = useCategories();
  const { data: ChannelData, mutate } = useCreateChannel();
  const { isLoading, isSuccess, data: DataChannels } = useGetChannels({});
  // console.log(DataChannels, "DataChannels");

  const CategoryData = Data?.results ?? [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBrands, setShowBrands] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const youtubeLinkSelectRef = useRef<HTMLSelectElement>(null);
  const discordLinkInputRef = useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [userData, setUserData] = useState<FormData[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const colors = [
    "gray",
    "indigo",
    "purple",
    "pink",
    "silver",
    "black",
    "crimson",
    "Lavender",
    "Orange",
    "Cyan",
    "Gold",
    "Violet",
  ];
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    channel: "",
    category: "",
    discordLink: "",
    youtubeLink: "",
    photoPath: "",
  });

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
  };
  const filteredData = useMemo(() => {
    let filtered = DataChannels;
    if (searchKeyword) {
      filtered = filtered.filter((data: getChannelTypes) =>
        data?.channel?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (data: getChannelTypes) =>
          data?.category?.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }
    return filtered;
  }, [searchKeyword, selectedCategory, DataChannels]);
  // modal funtionality on Add channel
  const handleInputChange = (
    event: ChangeEvent<{ name?: string; value: string }>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newFormData = {
      channel: formData.channel,
      category: formData.category,
      youtubeLink: formData.youtubeLink,
      discordLink: formData.discordLink,
      photoPath: profileImage ? profileImage : "",
    };
    mutate(newFormData);
    setFormData({
      channel: "",
      category: "",
      discordLink: "",
      youtubeLink: "",
      photoPath: "",
    });
    setProfileImage(null);
  };

  const handleUploadPictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setProfileImage(selectedImage);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photoPath: selectedImage,
      }));
    }
  };

  const copyToClipboard = (fieldName: string) => {
    let textToCopy = "";
    if (fieldName === "discordLink" && discordLinkInputRef.current) {
      textToCopy = discordLinkInputRef.current.value;
    } else if (fieldName === "youtubeLink" && youtubeLinkSelectRef.current) {
      textToCopy = youtubeLinkSelectRef.current.value;
    }
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard:", textToCopy);
        })
        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
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
    p: 4,
  };
  const handlepopOverOpne = () => {
    setPopoverOpen(true);
  };
  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {" "}
          <div className="pt-4 flex flex-col text-black gap-5 fade-in">
            <div className="flex items-center justify-between">
              <Header
                title="CHANNELS"
                showSearch={true}
                searchKeyword="Search"
                onSearch={handleSearch}
              />
              <Button
                onClick={handleOpenModal}
                variant="contained"
                className="button-black ps-4 pe-4"
              >
                <FiPlus size={25} className="pe-1 ps-1" />
                Add Channel
              </Button>
            </div>
            <div className=" table-bb-gray mt-4 "></div>
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
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center pb-6 pt-6 ">
                    <div className="Side-spacing ">
                      <div className="pt-2 pb-2">
                        <InputLabel
                          htmlFor="name"
                          className="pt-2 pb-2 font-bold text-sm"
                        >
                          Name
                        </InputLabel>
                        <Input
                          name="channel"
                          value={formData.channel}
                          onChange={handleInputChange}
                          placeholder="Enter Your Name"
                          className="border ps-4 pe-4 pt-2 pb-2 input-size "
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between w-10/12">
                          <InputLabel
                            htmlFor="name"
                            className="pt-2 pb-2 font-bold text-sm"
                          >
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
                          name="category"
                          value={formData.category}
                          onChange={handleSelectChange}
                          placeholder="Select category"
                          className="input-size"
                        >
                          {CategoryData?.map((item: categoryDataTypess) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.category}
                            </MenuItem>
                          ))}
                        </Select>
                        <Popover
                          onClose={handlePopoverClose}
                          open={popoverOpen}
                        >
                          <span className="font-bold ps-2 pe-2 pt-4">
                            Select Color
                          </span>
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
                        <InputLabel
                          className="pt-2 pb-2 font-bold text-sm"
                          htmlFor="youtube"
                        >
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
                          onClick={() => copyToClipboard("youtubeLink")}
                          title="Copy Link"
                          className="bg-gray-200 position-btn border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
                        >
                          <FiCopy />
                        </Button>
                      </div>
                    </div>
                    {/* Left Side */}
                    <div className="Side-spacing ">
                      <div className="flex items-center">
                        <div>
                          <div className="ms-4 mb-1 mt-1">
                            <span className="font-bold text-base">
                              Profile Picture
                            </span>
                          </div>
                          <div className="">
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleProfileImageChange}
                            />
                            {profileImage ? (
                              <div className="profileImage">
                                <Image
                                  width={150}
                                  height={150}
                                  style={{ height: "150px" }}
                                  className="rounded-full mr-2"
                                  src={URL.createObjectURL(profileImage)}
                                  alt="Profile"
                                />
                              </div>
                            ) : (
                              <div className="profileImage">
                                <Image
                                  width={150}
                                  height={150}
                                  style={{ height: "150px" }}
                                  // className="rounded-full mr-2"
                                  src="/ProfileAvatar.png"
                                  alt="Profile"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" ps-6 pe-6">
                          <div className="flex items-center pt-2 pb-2 cursor-pointer">
                            <AiOutlineUpload size={20} />
                            <span
                              onClick={handleUploadPictureClick}
                              className="ps-1 pe-1 border-b-2 border-gray-400 text-sm "
                            >
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
                        <InputLabel
                          htmlFor="discord"
                          className="pt-2 pb-2 font-bold text-sm"
                        >
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
                          onClick={() => copyToClipboard("discordLink")}
                          title="Copy Link"
                          className="bg-gray-200 position-btn border Discord-link  border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
                        >
                          <FiCopy />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Typography>
                <div className="table-bb-gray "></div>
                <div className="flex justify-between items-center pt-4 pb-2">
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    className=" black text-black px-4 py-1 ms-1 me-1 border-black-btn"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="button-black ps-4 pe-4"
                  >
                    <FiPlus size={25} className="pe-1 ps-1" />
                    Create Channel
                  </Button>
                </div>
              </div>
            </Modal>
            <div className="flex flex-wrap gap-2 justify-between cursor-pointer">
              {[{ category: "All", id: "4234" }, ...CategoryData]?.map(
                (obj: categoryDataTypess) => (
                  <span
                    onClick={() => handleCategoryFilter(obj?.category)}
                    className={`px-4 py-2 border rounded-3xl text-xs text-center ${
                      selectedCategory === obj?.category
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    key={obj?.id}
                  >
                    {obj?.category}
                  </span>
                )
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 cursor-pointer">
              {filteredData?.map((data: getChannelTypes) => {
                return <Cards data={data} key={data.id} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Brands;
