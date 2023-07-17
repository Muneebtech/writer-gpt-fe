import Header from "@/common/Header/header";
import {
  Button,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

interface ChildProps {
  openModal: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  HandleAddOutro: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  handleAddNewVideoTopic: () => void;
  handleClearTextFieldData: () => void;
  handleAddManagerDataLists: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleAddManagersList: () => void;
  handleAddTopic: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrandsModal: React.FC<ChildProps> = ({
  openModal,
  handleCloseModal,
  handleOpenModal,
  HandleAddOutro,
  handleInputChange,
  handleAddNewVideoTopic,
  handleAddTopic,
  handleClearTextFieldData,
  handleAddManagersList,
  handleAddManagerDataLists,
  value,
}) => {
  return (
    <div>
      {" "}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center w-full"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height-1 w-11/12 ">
          <Typography className="" variant="h6" gutterBottom>
            <div className="table-bb-gray mt-1 ms-3 me-4 flex items-center justify-between">
              {value === 1 ? (
                <>
                  {" "}
                  <Header title="Add Outro" />
                </>
              ) : value === 3 ? (
                <>
                  <Header title="Add Topic" />
                </>
              ) : value === 5 ? (
                <>
                  <Header title="Add Manager" />
                </>
              ) : null}
              <FaTimes onClick={handleCloseModal} className="cursor-pointer" />
            </div>
            <div>
              <div className="ms-4 me-4">
                <div className="pt-2 pb-2">
                  {value === 1 ? (
                    <>
                      {" "}
                      <TextField
                        onChange={handleInputChange}
                        id="outlined-multiline-static"
                        label="ADD OUTRO"
                        multiline
                        rows={6}
                        className="w-full mt-2 mb-2"
                      />
                    </>
                  ) : value === 3 ? (
                    <>
                      <TextField
                        onChange={handleAddTopic}
                        label="ADD TOPIC HERE"
                        className="w-full mt-2 mb-2"
                      />
                    </>
                  ) : value === 5 ? (
                    <>
                      <InputLabel className="font-bold pt-2 pb-2">
                        MANAGERS EMAIL
                      </InputLabel>
                      <TextField
                        onChange={handleAddManagerDataLists}
                        label="abc@gmail.com"
                        className="w-full"
                      />
                    </>
                  ) : null}
                </div>
              </div>
              {/* Left Side */}
            </div>
          </Typography>
          <div>
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
                onClick={() => {
                  value === 1
                    ? HandleAddOutro()
                    : value === 3
                    ? handleAddNewVideoTopic()
                    : value === 5
                    ? handleAddManagersList()
                    : null;
                  handleClearTextFieldData();
                }}
                variant="contained"
                className="button-black ps-4 pe-4"
              >
                <FiPlus size={25} className="pe-1 ps-1" />
                {value === 1
                  ? "ADD OUTRO"
                  : value === 3
                  ? "ADD TOPIC"
                  : value === 5
                  ? "ADD MANAGER"
                  : null}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BrandsModal;