import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Cards from "./Cards";
import Header from "@/common/Header/header";
import Card from "@mui/material/Card";
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
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { categoryDataTypess } from "../Types/category.type";
// import BrandsLibrary from "../brandsLibrary/brandsLibrary";
import { useCategories } from "@/services/category/hooks/useCategories";
import { ChannelServices, useCreateChannel } from "@/services/channel";
import { useGetChannels } from "@/services/channel/hooks/useGetChannels";
import { getChannelTypes } from "../Types/channel.types";
import Spinner from "@/modules/spinner/spinner";
import ScrollSpinner from "@/modules/spinner/ScrollSpinner";
import { useDeletechannels } from "@/services/channel/hooks/useDeleteChaneel";
import { isAdminOrManager } from "@/utils/authorisation";
import { decryptData } from "@/utils/localStorage";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import Toaster from "@/common/Toaster/Toaster";
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
  const {
    data: ChannelData,
    mutate,
    isLoading: ChannelCreateLoading,
    isSuccess: ChannelCreateSuccess,
  } = useCreateChannel();
  const {
    data: DataChannels,
    isLoading,
    isSuccess: successChaneel,
    fetchNextPage,
    currentPage,
    totalPages,
    isFetchingNextPage,
    isFetching,
  } = useGetChannels({ page: 1, limit: 10 });
  const CategoryData = Data?.results ?? [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const youtubeLinkSelectRef = useRef<HTMLSelectElement>(null);
  const discordLinkInputRef = useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
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
  const [closePopover, setClosePopover] = useState(false);
  console.log(closePopover, "closePopover");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const {
    mutate: mutateChannel,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
  } = useDeletechannels();
  const [formData, setFormData] = useState<FormData>({
    channel: "",
    category: "",
    discordLink: "",
    youtubeLink: "",
    photoPath: "",
  });
  const [validationChannel, setvalidationChannel] = useState({
    channel: false,
    category: false,
    discordLink: false,
    youtubeLink: false,
    photoPath: false,
  });

  const [showValidation, setShowValidation] = useState(false);
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
        // Reach the bottom of the div
        if (!isFetchingNextPage && currentPage !== totalPages) {
          fetchNextPage();
        }
      }
    }
  };
  /* eslint-disable */
  useEffect(() => {
    const div = divRef.current;
    div?.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      div?.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, currentPage, totalPages]);
  const handleInputChange = (
    event: ChangeEvent<{ name?: string; value: string }>
  ) => {
    const { name, value } = event.target;
    if (validationChannel[name as keyof typeof validationChannel] && value) {
      setvalidationChannel((prevFields) => ({
        ...prevFields,
        [name as keyof typeof validationChannel]: false,
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    if (name === "category") {
      setvalidationChannel((prevFields) => ({
        ...prevFields,
        category: false,
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    const { channel, category, youtubeLink, discordLink, photoPath } = formData;

    const NewValidationFeilds = {
      channel: channel === "",
      category: category === "",
      youtubeLink: youtubeLink === "",
      discordLink: discordLink === "",
      photoPath: photoPath === "",
    };
    if (
      channel === "" ||
      category === "" ||
      youtubeLink === "" ||
      discordLink === "" ||
      photoPath === ""
    ) {
      setvalidationChannel(NewValidationFeilds);
    } else {
      event.preventDefault();
      const formdata = new FormData();
      formdata.append("channel", formData.channel as string);
      formdata.append("category", formData.category as string);
      formdata.append("youtubeUrl", formData.youtubeLink as string);
      formdata.append("discordUrl", formData.discordLink as string);
      formdata.append("photoPath", profileImage as File);
      mutate(formdata);
      setFormData({
        channel: "",
        category: "",
        discordLink: "",
        youtubeLink: "",
        photoPath: "",
      });
      setProfileImage(null);
    }
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
  const HandleDeleteChannel = (id: string) => {
    const updatedData = DataChannels?.filter((channel) => channel?.id !== id);

    const newFormData: FormData = {
      ...formData,
      channel: updatedData?.map((channel) => channel.channel).join(","),
    };

    setFormData(newFormData);
    mutateChannel(id);
  };
  const rotateAnimation = `spin 1s linear infinite`;
  const handleOpenPopover = () => {
    setClosePopover(true);
  };
  const handleClosePopover = () => {
    setClosePopover(false);
  };
  useEffect(() => {
    if (ChannelCreateSuccess) {
      handleCloseModal();
    }
  }, [ChannelCreateSuccess]);
  return (
    <>
      {ChannelCreateSuccess && (
        <>
          <Toaster
            Success={true}
            title="Channel Created Successfully"
            Color="green"
          />
        </>
      )}
      {isLoading ? (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(200, 200, 200, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <LottieSpinner />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col text-black gap-5 fade-in">
            <div className="flex items-center justify-between">
              <Header
                title="CHANNELS"
                showSearch={true}
                searchKeyword="Search"
                onSearch={handleSearch}
              />
              {isAdminOrManager() ? (
                <>
                  <Button
                    onClick={handleOpenModal}
                    variant="contained"
                    className="button-black ps-4 pe-4"
                  >
                    <FiPlus size={25} className="pe-1 ps-1" />
                    Add Channel
                  </Button>
                </>
              ) : null}
            </div>
            <div className=" table-bb-gray mt-1 ms-4 me-4 "></div>{" "}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              className="flex justify-center items-center"
            >
              <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-9/12">
                <Typography className="" variant="h6" gutterBottom>
                  <div className="table-bb-gray mt-1 ms-3 me-4 flex items-center justify-between">
                    <Header title="ADD CHANNELS" />
                    <FaTimes
                      onClick={() => {
                        handleCloseModal();
                        handleClosePopover();
                      }}
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
                        {validationChannel?.channel ? (
                          <>
                            <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                              <AiOutlineExclamationCircle />{" "}
                              <span className="ps-1">
                                Please Enter Channel Name!
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between w-10/12">
                          <InputLabel
                            htmlFor="name"
                            className="pt-2 pb-2 font-bold text-sm"
                          >
                            Category
                          </InputLabel>
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
                        {validationChannel?.category ? (
                          <>
                            <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                              <AiOutlineExclamationCircle />{" "}
                              <span className="ps-1">
                                Please Enter Channel Category!
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
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
                        {validationChannel?.youtubeLink ? (
                          <>
                            <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                              <AiOutlineExclamationCircle />{" "}
                              <span className="ps-1">
                                Please Enter Youtube Link!
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
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
                                {validationChannel?.photoPath ? (
                                  <>
                                    <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                                      <AiOutlineExclamationCircle />{" "}
                                      <span className="ps-1">
                                        Please Add Image!
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
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
                        {validationChannel?.discordLink ? (
                          <>
                            <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                              <AiOutlineExclamationCircle />{" "}
                              <span className="ps-1">
                                Please Enter Discord Link!
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
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
                    onClick={() => {
                      handleCloseModal();
                    }}
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
                    {ChannelCreateLoading ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <FiPlus size={25} className="pe-1 ps-1" />
                      </>
                    )}
                    {ChannelCreateLoading ? (
                      <>
                        <div className="flex items-center">
                          <FaSpinner
                            size={16}
                            style={{
                              animation: rotateAnimation,
                              marginRight: "10px",
                            }}
                          ></FaSpinner>
                          <span className="ms-1"> Creating Channel...</span>
                        </div>
                      </>
                    ) : (
                      <>Create Channel</>
                    )}
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
              className="flex flex-wrap items-start w-full h-[calc(100vh-11.5rem)] "
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                  <ScrollSpinner />
                </div>
              ) : (
                filteredData?.map((data: getChannelTypes) => (
                  <Cards
                    handleClosePopover={handleClosePopover}
                    handleOpenPopover={handleOpenPopover}
                    closePopover={closePopover}
                    HandleDeleteChannel={HandleDeleteChannel}
                    data={data}
                    key={data.id}
                  />
                ))
              )}
            </div>
            {isFetching ? (
              <div className="flex justify-center items-center">
                <ScrollSpinner />
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Brands;
