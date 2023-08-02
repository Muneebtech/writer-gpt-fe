import Header from "@/common/Header/header";
import {
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FaTimes } from "react-icons/fa";
interface CHildModalProps {
  handleCloseEditodal: () => void;
  value: number;
  openEditModal: boolean;
  textValue: any;
  handleUpdateOutro: () => void;
  handleUpdateVideoTopic: () => void;
  handleAddManagersList: () => void;
  handleClearTextFieldData: () => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: number,
    text: string
  ) => void;
}
const EditBrands: React.FC<CHildModalProps> = ({
  handleCloseEditodal,
  value,
  openEditModal,
  textValue,
  handleUpdateOutro,
  handleUpdateVideoTopic,
  handleAddManagersList,
  handleClearTextFieldData,
  handleInputChange,
}) => {
  return (
    <div>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditodal}
        className="flex justify-center items-center w-full"
      >
        <div className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height-1 w-9/12 ">
          <Typography className="" variant="h6" gutterBottom>
            <div className="table-bb-gray mt-1 ms-3 me-4 flex items-center justify-between">
              {value === 1 ? (
                <>
                  {" "}
                  <Header title="Edit Outro" />
                </>
              ) : value === 3 ? (
                <>
                  <Header title="Edit Topic" />
                </>
              ) : value === 5 ? (
                <>
                  <Header title="Add Manager" />
                </>
              ) : null}
              <FaTimes
                onClick={handleCloseEditodal}
                className="cursor-pointer"
              />
            </div>
            <div>
              <div className="ms-4 me-4">
                <div className="pt-2 pb-2">
                  {value === 1 ? (
                    <>
                      {" "}
                      <TextField
                        onChange={event =>
                          handleInputChange(event, value, "edit")
                        }
                        id="outlined-multiline-static"
                        label="OUTRO"
                        multiline
                        rows={6}
                        value={textValue.outro as any}
                        className="w-full mt-2 mb-2"
                      />
                    </>
                  ) : value === 3 ? (
                    <>
                      <TextField
                        onChange={event =>
                          handleInputChange(event, value, "edit")
                        }
                        label="TOPIC"
                        value={textValue.topic as any}
                        className="w-full mt-2 mb-2"
                      />
                    </>
                  ) : value === 5 ? (
                    <>
                      <InputLabel className="font-bold pt-2 pb-2">
                        MANAGERS EMAIL
                      </InputLabel>
                      <TextField
                        value={textValue.manager as any}
                        onChange={event =>
                          handleInputChange(event, value, "edit")
                        }
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
                onClick={handleCloseEditodal}
                variant="outlined"
                className=" black text-black px-4 py-1 ms-1 me-1 border-black-btn"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  value === 1
                    ? handleUpdateOutro()
                    : value === 3
                    ? handleUpdateVideoTopic()
                    : value === 5
                    ? handleAddManagersList()
                    : null;
                  handleClearTextFieldData();
                }}
                variant="contained"
                className="button-black ps-4 pe-4"
              >
                {/* <FiPlus size={25} className="pe-1 ps-1" /> */}
                {value === 1
                  ? "UPDATE OUTRO"
                  : value === 3
                  ? "UPDATE TOPIC"
                  : value === 5
                  ? "UPDATE MANAGER"
                  : null}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditBrands;
