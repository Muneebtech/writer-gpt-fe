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
import { AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { AuthTypes, ChangePasswordTypes } from "@/utils/types";
import { FaSpinner } from "react-icons/fa";
import Toaster from "@/common/Toaster/Toaster";
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
  const { mutate, isLoading, isSuccess } = useChangePassword();
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    reenterPassword: false,
  });
  const [changepassword, setchangePassword] = useState<ChangePasswordTypes>({
    oldPassword: "",
    newPassword: "",
    renterPassword: "",
  });

  const HandleEmptyFeild = () => {
    setchangePassword({
      oldPassword: "",
      newPassword: "",
      renterPassword: "",
    });
  };
  const [userChangePassword, setUserChangePassword] = useState<
    ChangePasswordTypes[]
  >([]);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    oldPassword: false,
    newPassword: false,
    renterPassword: false,
  });
  console.log(userChangePassword, "userChangePassword");

  console.log(changepassword, "changepassword::changepassword");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const SearchValue = event.target.value;
    if (SearchValue) {
      setPasswordCheck(false);
    }
    if (emptyFields[name as keyof typeof emptyFields] && value) {
      setEmptyFields((prevFields) => ({
        ...prevFields,
        [name]: false,
      }));
    }
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
      newPassword: changepassword.newPassword,
    };
    setUserChangePassword([...userChangePassword, NewFile]);
    const { oldPassword, newPassword, renterPassword } = changepassword;
    const newEmptyFields = {
      oldPassword: oldPassword === "",
      newPassword: newPassword === "",
      renterPassword: renterPassword === "",
    };
    setEmptyFields(newEmptyFields);
    if (newPassword === "" || oldPassword === "" || renterPassword === "") {
    } else if (changepassword.newPassword !== changepassword.renterPassword) {
      setPasswordCheck(true);
    } else if (changepassword.newPassword === changepassword.renterPassword) {
      setchangePassword({
        newPassword: "",
        oldPassword: "",
        renterPassword: "",
      });
      return mutate(NewFile);
    }
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-9/12 Profile_modal">
          {isSuccess ? (
            <>
              <div
                className={`bg-white rounded-lg ${
                  isSuccess ? `h-5/6` : `h-5/6`
                } `}
              >
                <p className="font-bold flex justify-center  ">
                  Change Password Successfully
                </p>
              </div>
            </>
          ) : (
            <>
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
                {emptyFields.oldPassword ? (
                  <>
                    <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                      <AiOutlineExclamationCircle />{" "}
                      <span className="ps-1"> Fill Old Password Field</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="pt-2 pb-2">
                <InputLabel>Enter New Password</InputLabel>
                <TextField
                  autoComplete="off"
                  value={changepassword.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
                  placeholder="Enter New Password"
                  className="w-full"
                  type={showPasswords.newPassword ? "text" : "password"}
                  error={passwordCheck}
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
                {emptyFields.newPassword ? (
                  <>
                    <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                      <AiOutlineExclamationCircle />{" "}
                      <span className="ps-1">Fill Password Field</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="pt-2 pb-2">
                <InputLabel>Re-enter New Password</InputLabel>
                <TextField
                  autoComplete="off"
                  value={changepassword.renterPassword}
                  name="renterPassword"
                  onChange={handleInputChange}
                  placeholder="Re-enter New Password"
                  className="w-full"
                  type={showPasswords.reenterPassword ? "text" : "password"}
                  error={passwordCheck}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPasswords.reenterPassword ? (
                          <RiEyeCloseLine
                            onClick={() =>
                              handleTogglePassword("reenterPassword")
                            }
                            className="eye-icon cursor-pointer"
                          />
                        ) : (
                          <RiEyeLine
                            onClick={() =>
                              handleTogglePassword("reenterPassword")
                            }
                            className="eye-icon cursor-pointer"
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                {passwordCheck ? (
                  <>
                    <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                      <AiOutlineExclamationCircle />{" "}
                      <span className="ps-1">Password Dose Not Match !</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {emptyFields.renterPassword ? (
                  <>
                    <div className="text-red-700 text-sm mt-1 flex items-center ps-1">
                      <AiOutlineExclamationCircle />{" "}
                      <span className="ps-1">Fill Re-Enter Password Field</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="table-bb-gray mt-2"></div>
              <div className="flex justify-end items-center pt-4 pb-2">
                <Button
                  onClick={() => {
                    handleCloseModal();
                    HandleEmptyFeild();
                  }}
                  variant="outlined"
                  className=" black text-black px-4 py-1 ms-1 me-1 border-black-btn"
                >
                  Cancel
                </Button>
                <Button
                  onClick={()=>{SubmitChangePasswordData()}}
                  variant="contained"
                  className="button-black ps-2 pe-2 ms-1 me-1"
                >
                  <>
                    {isLoading ? (
                      <>
                        {" "}
                        <div className="flex items-center">
                          <FaSpinner
                            size={16}
                            className="rotate"
                            style={{
                              marginRight: "10px",
                            }}
                          ></FaSpinner>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                  <>Change Password</>
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProfileEidtModal;
