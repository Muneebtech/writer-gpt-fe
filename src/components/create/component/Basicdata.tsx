import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import Image from "next/image"
import { AiOutlineUpload } from 'react-icons/ai'
import { useRef, useState } from "react"
interface FormData {
  name: string;
  categorylist: string;
  youtubeLink: string;
  discordLink: string;
  learningVideos: string;
  videoTopic: string;
  // Add more properties with their respective data types
}
const BasicData = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categorylist: '',
    youtubeLink: '',
    discordLink: '',
    learningVideos: '',
    videoTopic: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        profileimage: URL.createObjectURL(selectedImage),
      }));
    }
  };
  return (
    <div>
      <div className='height-box mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <h4 className='font-bold'>BASIC</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4">
          </div>
        </div>
        <div className="w-9/12 ps-4 pe-4 flex items-center">
          <FormControl className="w-4/6">
            <label className="pt-2 pb-2 text-lg font-medium">Video/Script Name</label>
            {/* <InputLabel id="multi-input-label">Search and add Topic</InputLabel> */}
            <Select
            // labelId="multi-input-label"
            // multiple
            // value={selectedValues}
            // onChange={handleSelectChange}
            // renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="value1">Value 1</MenuItem>
              <MenuItem value="value2">Value 2</MenuItem>
              <MenuItem value="value3">Value 3</MenuItem>
              <MenuItem value="value4">Value 4</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center mt-6 ps-6">
          <div>
            <div className="ms-4 mb-1 mt-1">
              <span className="font-bold">Icon</span>
            </div>
            <div className="">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleProfileImageChange}
              />
              {profileImage ? (
                <div className="profileImage">
                  <Image
                    width={150}
                    height={150}
                    style={{ height: "150px" }}
                    // className="rounded-full mr-2"
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
          <div className="ps-6 pe-6">
            <div className="flex items-center pt-2 pb-2 cursor-pointer">
              <AiOutlineUpload size={20} />
              <span onClick={handleUploadPictureClick} className="ps-1 pe-1 border-b-2 border-gray-400">
                Upload Picture
              </span>
            </div>
            <div className="flex items-center pt-2 pb-2 cursor-pointer">
              <AiOutlineUpload size={20} />
              <span className="ps-1 pe-1 border-b-2 border-gray-400">Select Picture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicData