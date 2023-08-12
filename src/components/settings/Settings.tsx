import Header from "@/common/Header/header";
import { Button, InputLabel, Switch, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import ProfileEidtModal from "./ProfileEidtModal";
import { decryptData } from "@/utils/localStorage";
// import { useSignIn } from "@/services/auth";
import { AuthTypes } from "@/utils/types";

const Setting = () => {
  const [showProfile, setShowprofile] = useState(true);
  const [userData, setUserData] = useState<AuthTypes>({});
  const [userTokens, setUserTokens] = useState(null);
  console.log(userData, "userData");

  const handleOpenProfile = () => {
    setShowprofile(false);
  };
  const handleCloseProfile = () => {
    setShowprofile(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const decryptedUserData = decryptData("userdata");
    const decryptedUserTokens = decryptData("token");

    if (decryptedUserData) {
      setUserData(decryptedUserData);
    }

    if (decryptedUserTokens) {
      setUserTokens(decryptedUserTokens);
    }
  }, []);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
  };

  return (
    <>
      <ProfileEidtModal
        userData={userData}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        openModal={openModal}
      />
      {showProfile ? (
        <>
          <div>
            <Header title="Settings" />
          </div>
          <div className="table-bb-gray mt-1 ms-4 me-4"></div>
          <div
            className="table-bb-gray mt-4 mb-4 cursor-pointer"
            onClick={handleOpenProfile}
          >
            <span className="text-xl font-bold pb-1 pt-1">Profile Setting</span>
            <p className="pt-2 pb-2 w-3/4 font-thin">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
              Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed
              gravida justo. Nulla tempor lobortis massa at imperdiet. Integer
              ut blandit dui.
            </p>
          </div>
          <div className="table-bb-gray mt-4 mb-4">
            <div className="flex justify-between pe-4">
              <span className="text-xl font-bold pb-1 pt-1">History</span>
              <Switch className="text-black" />
            </div>
            <p className="pt-2 pb-2 w-3/4 font-thin">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
              Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed
              gravida justo. Nulla tempor lobortis massa at imperdiet. Integer
              ut blandit dui.
            </p>
          </div>
          <div className="table-bb-gray mt-4 mb-4">
            <div className="flex justify-between pe-4">
              <span className="text-xl font-bold pb-1 pt-1">Lorem Ipsum</span>
              <Switch className="text-black" />
            </div>
            <p className="pt-2 pb-2 w-3/4 font-thin">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vestibulum sapien ligula, eu eleifend quam efficitur sit amet.
              Suspendisse et ligula eros. Duis sit amet aliquet libero. In sed
              gravida justo. Nulla tempor lobortis massa at imperdiet. Integer
              ut blandit dui.
            </p>
          </div>
        </>
      ) : (
        <div className="">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleCloseProfile}
          >
            <span className="ps-2 pe-2">
              <AiOutlineLeft />
            </span>
            <Header title="Profile History" />
          </div>
          <div className="table-bb-gray mt-1 ms-4 me-4"></div>
          <div className="mt-4">
            <InputLabel>Full Name</InputLabel>
            <TextField
              className="pt-2 pb-2 w-3/6 "
              label="Full Name"
            ></TextField>
          </div>
          <div className="mt-4 h-[calc(100vh-15rem)]">
            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleProfileImageChange}
                  />
                  <Image
                    width={145}
                    height={145}
                    className="rounded-full mr-2"
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : "/ProfileAvatar.png"
                    }
                    alt="Profile"
                  />
                  <div className="ps-3 pe-3">
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
            <div>
              <div className="pt-3">
                <Button
                  onClick={handleOpenModal}
                  variant="outlined"
                  className="mt-3 rounded-lg"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showProfile ? (
        <></>
      ) : (
        <>
          <div className="table-bb-gray mt-1 ms-4 me-4"></div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <Button
                className="text-black ms-2 me-2"
                variant="outlined"
                onClick={handleCloseProfile}
              >
                Back
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className="button-black ms-2 me-2"
                // onClick={handleNext}
              >
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Setting;
