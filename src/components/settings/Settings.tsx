import Header from "@/common/Header/header";
import { Button, InputLabel, Switch, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import ProfileEidtModal from "./ProfileEidtModal";
import { decryptData } from "@/utils/localStorage";
// import { useSignIn } from "@/services/auth";
import { AuthTypes, ProfileuserName } from "@/utils/types";
import { useProfileUpdate } from "@/services/Profile";
import { FaSpinner } from "react-icons/fa";
import Toaster from "@/common/Toaster/Toaster";

const Setting = () => {
  const [updateProfileUserName, setUpdateProfileUserName] =
    useState<ProfileuserName>({
      name: "",
      id: "",
    });
  console.log(
    updateProfileUserName,
    "updateProfileUserName::updateProfileUserName"
  );

  const {
    mutate: profileIsUpdate,
    isLoading: profileIsLoading,
    isSuccess: profileIsSuccess,
  } = useProfileUpdate();
  const [showProfile, setShowprofile] = useState(true);
  const [userData, setUserData] = useState<AuthTypes>({});
  const [userTokens, setUserTokens] = useState(null);
  const [showToaster, setShowtoaster] = useState(false);
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

  const [updateProfileName, setUpdateProfileName] = useState({
    id: userData?.id,
    name: "",
  });
  useEffect(() => {
    if (updateProfileName) {
      setUpdateProfileUserName(updateProfileName);
    }
  }, [updateProfileName]);
  console.log(updateProfileName, "updateProfileName");

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
  const HandleChangeUserName = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const SearchValues = event.target.value;
    console.log(SearchValues, "SearchValues");

    setUpdateProfileName((prevProfile) => ({
      ...prevProfile,
      name: SearchValues,
      id: userData?.id,
    }));
  };

  const HandleSubmitUserName = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (updateProfileUserName.name === userData?.firstName) {
      setShowtoaster(true);
    } else if (updateProfileUserName?.name === "") {
      setShowtoaster(true);
    } else if (updateProfileUserName) {
      profileIsUpdate(updateProfileUserName);
    }
  };
  useEffect(() => {
    if (profileIsSuccess) {
      setUpdateProfileName({
        id: "",
        name: "",
      });
    }
  }, [profileIsSuccess]);
  return (
    <>
      {showToaster && (
        <>
          {" "}
          <>
            <Toaster Error={true} Color="red" title="User Name Already Exist" />
          </>
        </>
      )}
      {showToaster && (
        <>
          {" "}
          <>
            <Toaster Error={true} Color="red" title="Please Add User Name" />
          </>
        </>
      )}
      {profileIsSuccess ? (
        <>
          <>
            <Toaster
              Success={true}
              Color="green"
              title="Profile Updated Successfully"
            />
          </>
        </>
      ) : null}
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
            className=" cursor-pointer mt-4 mb-4"
            onClick={handleOpenProfile}
          >
            <span className="text-xl font-bold pb-1 pt-1">Profile Setting</span>
          </div>
          <div className="table-bb-gray mt-4 mb-4"></div>
          <div className="table-bb-gray mt-4 mb-4">
            <div className="flex justify-between pe-4 mt-4 mb-4">
              <span className="text-xl font-bold pb-1 pt-1">History</span>
              <Switch className="text-black" />
            </div>
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
            <InputLabel className="pt-2 pb-2">Full Name</InputLabel>
            <TextField
              name="name"
              value={updateProfileName.name}
              onChange={HandleChangeUserName}
              variant="outlined"
              autoComplete="off"
              className="pt-1 pb-1 w-3/6 "
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
                onClick={HandleSubmitUserName}
              >
                {profileIsLoading ? (
                  <>
                    <>
                      <FaSpinner
                        size={16}
                        className="rotate"
                        style={{
                          marginRight: "10px",
                        }}
                      ></FaSpinner>
                      Saving...
                    </>
                  </>
                ) : (
                  <> Save</>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Setting;
