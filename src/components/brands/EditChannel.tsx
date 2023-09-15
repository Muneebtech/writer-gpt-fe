import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Cards from "./Cards";
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
import { FaSpinner, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { categoryDataTypess } from "../Types/category.type";
// import BrandsLibrary from "../brandsLibrary/brandsLibrary";
import { useCategories } from "@/services/category/hooks/useCategories";
import { useGetChannels } from "@/services/channel/hooks/useGetChannels";
import { getChannelTypes } from "../Types/channel.types";
import { useUpdateChannel } from "@/services/channel/hooks/useUpdateChannel";
import Toaster from "@/common/Toaster/Toaster";
interface FormData {
  channel: string;
  category: string;
  youtubeUrl: string;
  discordUrl: string;
  photoPath: File | any;
}

type EditChannelProps = {
  handleClosePopover: () => void;
  handleShowEditModal: (id: string, data: getChannelTypes) => void;
  handleHideEditModal: () => void;
  showeditModal: boolean;
  selectedData: getChannelTypes | null;
};
const EditChannel: React.FC<EditChannelProps> = ({
  handleShowEditModal,
  handleHideEditModal,
  showeditModal,
  selectedData,
  handleClosePopover,
}) => {
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
    isLoading,
    isSuccess,
  } = useUpdateChannel();
  const { fetchNextPage, currentPage, totalPages, isFetchingNextPage } =
    useGetChannels({ page: 1, limit: 10 });
  const CategoryData = Data?.results ?? [];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const youtubeUrlSelectRef = useRef<HTMLSelectElement>(null);
  const discordUrlInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    channel: "",
    category: "",
    discordUrl: "",
    youtubeUrl: "",
    photoPath: "",
  });

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
    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const src = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${selectedData?.photoPath}`;

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("channel", formData.channel as string);
    formdata.append("category", formData.category as string);
    formdata.append("youtubeUrl", formData.youtubeUrl as string);
    formdata.append("discordUrl", formData.discordUrl as string);
    formdata.append("photoPath", profileImage as File);
    const finalData = { id: selectedData?.id as string, newData: formdata };
    mutate(finalData);
    setFormData({
      channel: "",
      category: "",
      discordUrl: "",
      youtubeUrl: "",
      photoPath: "",
    });
    handleHideEditModal();
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
    if (fieldName === "discordUrl" && discordUrlInputRef.current) {
      textToCopy = discordUrlInputRef.current.value;
    } else if (fieldName === "youtubeUrl" && youtubeUrlSelectRef.current) {
      textToCopy = youtubeUrlSelectRef.current.value;
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

  useEffect(() => {
    if (selectedData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        photoPath: selectedData?.photoPath,
        discordUrl: selectedData?.discordUrl,
        youtubeUrl: selectedData?.youtubeUrl,
        channel: selectedData?.channel,
        category: selectedData?.category?.id,
      }));
    }
  }, [selectedData]);
  const rotateAnimation = `spin 1s linear infinite`;
  useEffect(() => {
    if (isSuccess) {
      handleHideEditModal();
    }
  }, [isSuccess]);
  return (
    <div>
      {isSuccess && (
        <>
          <Toaster
            Success={true}
            title="Channel Updated Successfully"
            Color="green"
          />
        </>
      )}
      <Modal
        open={showeditModal}
        onClose={handleHideEditModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-[70%]">
          <Typography className="" variant="h6" gutterBottom>
            <div className="table-bb-gray mt-1 ms-3 me-4 flex items-center justify-between">
              <Header title="ADD CHANNELS" />
              <FaTimes
                onClick={() => {
                  handleHideEditModal();
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
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Insert Youtube Link"
                    // inputRef={youtubeUrlSelectRef}
                    className="py-1  px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
                  />
                  <Button
                    onClick={() => copyToClipboard("youtubeUrl")}
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
                      <span className="font-bold text-base">Channel Image</span>
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
                            src={
                              formData?.photoPath
                                ? URL.createObjectURL(profileImage)
                                : "/channel.jpg"
                            }
                            loader={() =>
                              formData?.photoPath
                                ? URL.createObjectURL(profileImage)
                                : "/channel.jpg"
                            }
                            alt="no image"
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
                    name="discordUrl"
                    value={formData.discordUrl}
                    onChange={handleInputChange}
                    id="discord"
                    type="text"
                    placeholder="Insert Discord Link"
                    inputRef={discordUrlInputRef}
                    className="py-1 px-3 border  border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
                  />
                  <Button
                    onClick={() => copyToClipboard("discordUrl")}
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
                handleHideEditModal();
                handleClosePopover();
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
              {isLoading ? (
                <>
                  {" "}
                  <FaSpinner
                    size={16}
                    style={{
                      animation: rotateAnimation,
                      marginRight: "10px",
                    }}
                  ></FaSpinner>
                  Updating Channel...
                </>
              ) : (
                <>
                  {" "}
                  <FiPlus size={25} className="pe-1 ps-1" />
                </>
              )}
              Update Channel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditChannel;
