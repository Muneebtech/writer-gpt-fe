import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { AiOutlineUpload } from "react-icons/ai";
import { useRef, useState } from "react";
import { Job } from "@/components/Types/job.type";
interface FormData {
  name: string;
  photoPath: File | null;
  // Add more properties with their respective data types
}
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}
const BasicData: React.FC<ChildComponentProps> = ({ setScriptData }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    photoPath: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadPictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleInputChange = (
    event: ChangeEvent<{ name?: string; value: string }>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name || ""]: value,
    }));
    setScriptData({ name: value });
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setProfileImage(selectedImage);
      setFormData({ ...formData, photoPath: selectedImage });
      setScriptData({ photoPath: selectedImage });
    }
  };

  return (
    <div>
      <div className="h-[calc(100vh-14.5rem)] mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">BASIC</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
        </div>
        <div className="w-9/12 ps-4 pe-4 flex items-center">
          <FormControl className="w-4/6">
            <label className="pt-2 text-lg font-medium">
              Video/Script Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter script name"
              className="py-1 px-3 border  border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
            />
          </FormControl>
        </div>
        <div className="flex items-center mt-3 ps-2">
          <div>
            <div className="ms-4 mb-1 mt-1">
              <span className="font-bold">Icon</span>
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
                    width={170}
                    height={90}
                    style={{ height: "150px" }}
                    // className="rounded-full mr-2"
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                  />
                </div>
              ) : (
                <div className="profileImage">
                  <Image
                    width={170}
                    height={90}
                    style={{ height: "150px" }}
                    // className="rounded-full mr-2"
                    src="/ProfileAvatar.png"
                    alt="Profile"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="ps-6 pe-6">
            <div className="flex items-center pt-2 pb-2 cursor-pointer">
              <AiOutlineUpload size={20} />
              <span
                onClick={handleUploadPictureClick}
                className="ps-1 pe-1 border-b-2 border-gray-400"
              >
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
      </div>
    </div>
  );
};

export default BasicData;
