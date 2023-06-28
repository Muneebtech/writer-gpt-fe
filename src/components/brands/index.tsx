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
import { useState, useCallback } from "react";
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
  const divRef = useRef<HTMLDivElement>(null);
  const limit = 10;
  const {
    isLoading: loading,
    data: Data,
    isSuccess: success,
  } = useCategories();
  const { data: ChannelData, mutate } = useCreateChannel();
  const {
    data: DataChannels,
    isLoading,
    isSuccess,
    fetchNextPage,
  } = useGetChannels({ page: 1, limit: 10 });
  // console.log(DataChannels, "DataChannels");

  const CategoryData = Data?.results ?? [];
  // const TotalPages = DataChannels?.flatMap((page) => page.pages) ?? [];
  // const pages = DataChannels?.flatMap((page) => page.totalPages) ?? [];
  // console.log(TotalPages,"PagesCount",pages)

  console.log(DataChannels, "data::::Hahahahah");
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
  const handleScroll = () => {
    const div = divRef.current;
    if (div) {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        console.log("trigger");
        // Reach the bottom of the div
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    const div = divRef.current;
    div?.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      div?.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);
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
            <div
              ref={divRef}
              id="Cards-channel"
              style={{ overflow: "scroll" }}
              className="grid grid-cols-5 gap-2 h-[calc(100vh-13rem)] "
            >
              {isLoading ? (
                <div></div>
              ) : (
                filteredData?.map((data: getChannelTypes) => (
                  <Cards data={data} key={data.id} />
                ))
              )}
              {isSuccess ? (
                <div>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Brands;
