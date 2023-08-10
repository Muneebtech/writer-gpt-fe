import Header from "@/common/Header/header";
import { useChangePassword } from "@/services/ChangePassword/hooks/hooks";
import {
  Button,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { AuthTypes, ChangePasswordTypes } from "@/utils/types";
interface ChildProps {
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  openModal: boolean;
  userData: AuthTypes;
}
type PasswordField = "oldPassword" | "newPassword" | "reenterPassword";
const ProfileEidtModal: React.FC<ChildProps> = ({
  handleCloseModal,
  openModal,
  userData,
}) => {
  // const { mutate, isLoading, isSuccess } = useChangePassword();
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    reenterPassword: false,
  });
  const [changepassword, setchangePassword] = useState<ChangePasswordTypes>({
    oldPassword: "",
    password: "",
    renterpassword: "",
  });
  const [userChangePassword, setUserChangePassword] = useState<
    ChangePasswordTypes[]
  >([]);
  console.log(userChangePassword, "userChangePassword");

  console.log(changepassword, "changepassword::changepassword");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setchangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = (field: PasswordField) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  const SubmitChangePasswordData = () => {
    const NewFile: ChangePasswordTypes = {
      oldPassword: changepassword.oldPassword,
      email: userData?.email || "", // Provide a default value if userData?.email is undefined
      password: changepassword.password,
      renterpassword: changepassword.renterpassword,
    };
    setUserChangePassword([...userChangePassword, NewFile]);
  };
  useEffect(() => {});
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-9/12 Profile_modal">
          <Header title="Change Password" />
          <div className=" table-bb-gray mt-1"></div>
          <div className="pt-2 pb-2">
            <InputLabel>Enter Old Password</InputLabel>
            <TextField
              autoComplete="off"
              value={changepassword.oldPassword}
              name="oldPassword"
              onChange={handleInputChange}
              placeholder="Enter Old Password"
              className="w-full"
              type={showPasswords.oldPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPasswords.oldPassword ? (
                      <RiEyeCloseLine
                        onClick={() => handleTogglePassword("oldPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => handleTogglePassword("oldPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pt-2 pb-2">
            <InputLabel>Enter New Password</InputLabel>
            <TextField
              autoComplete="off"
              value={changepassword.password}
              name="password"
              onChange={handleInputChange}
              placeholder="Enter New Password"
              className="w-full"
              type={showPasswords.newPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPasswords.newPassword ? (
                      <RiEyeCloseLine
                        onClick={() => handleTogglePassword("newPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => handleTogglePassword("newPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pt-2 pb-2">
            <InputLabel>Re-enter New Password</InputLabel>
            <TextField
              autoComplete="off"
              value={changepassword.renterpassword}
              name="renterpassword"
              onChange={handleInputChange}
              placeholder="Re-enter New Password"
              className="w-full"
              type={showPasswords.reenterPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPasswords.reenterPassword ? (
                      <RiEyeCloseLine
                        onClick={() => handleTogglePassword("reenterPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => handleTogglePassword("reenterPassword")}
                        className="eye-icon cursor-pointer"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="table-bb-gray mt-2"></div>
          <div className="flex justify-end items-center pt-4 pb-2">
            <Button
              onClick={SubmitChangePasswordData}
              variant="contained"
              className="button-black ps-2 pe-2"
            >
              <> {/* <FiPlus size={25} className="pe-1 ps-1" /> */}</>
              <>
                <div className="flex items-center">
                  {/* <FaSpinner
                                size={16}
                                style={{
                                  animation: rotateAnimation,
                                  marginRight: "10px",
                                }}
                  ></FaSpinner> */}
                </div>
              </>
              <>Change Password</>
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              className=" black text-black px-4 py-1 ms-1 me-1 border-black-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileEidtModal;
