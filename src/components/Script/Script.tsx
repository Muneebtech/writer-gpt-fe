import { categories } from "@/constants/categories";
import { languageModel } from "@/constants/languageModel";
import { OutroItems, Outros } from "@/constants/outro";
import {
  Box,
  Button,
  FormControlLabel,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";

const Script = () => {
  const InputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const copyToClipboard = () => {
    if (InputRef.current !== null) {
      InputRef?.current.select();
      InputRef?.current.setSelectionRange(0, 99999);
    }
    document.execCommand("copy");
    alert("Link copied to clipboard!");
  };
  const style = {
    position: "absolute" as "absolute",
    // top: "50%",
    height: 400,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  const handleSelect = () => {
    setTextareaValue(selectedOption);
    setModalOpen(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between gap-2 items-centers w-full">
          <div className="flex flex-col gap-2 w-half">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter name here"
              className="inputField"
            ></input>
            <InputLabel htmlFor="name">Category</InputLabel>
            <Select className="inputField" placeholder="Select category">
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <InputLabel htmlFor="modal">Language Model</InputLabel>
            <Select
              id="modal"
              className="inputField"
              placeholder="Select language model"
            >
              {languageModel.map((item) => (
                <MenuItem value={item.script}>{item.modelTitle}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-half">
            <InputLabel htmlFor="discord">Discord Link</InputLabel>
            <div className="inputField flex items-center">
              <input
                id="discord"
                type="text"
                placeholder="Insert Discord Link"
                ref={InputRef}
                className="focus:outline-none w-full"
              />
              <Button
                onClick={copyToClipboard}
                title="Copy Link"
                className="bg-gray-200 border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
              >
                <FiCopy />
              </Button>
            </div>
            <InputLabel htmlFor="youtube">Youtube link</InputLabel>
            <div className="inputField flex items-center">
              <input
                id="youtube"
                placeholder="Insert Youtube Link"
                ref={InputRef}
                className="focus:outline-none w-full"
              />
              <Button
                onClick={copyToClipboard}
                title="Copy Link"
                className="bg-gray-200 border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
              >
                <FiCopy />
              </Button>
            </div>
            <InputLabel htmlFor="topic">Topic</InputLabel>
            <Select
              id="topic"
              placeholder="Select topic"
              className="inputField"
            >
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="container mx-auto">
          <InputLabel htmlFor="outro">Outro</InputLabel>
          <textarea
            id="outro"
            value={textareaValue}
            onChange={handleTextareaChange}
            className="textField focus:outline-none"
          ></textarea>
          <Button
            onClick={handleOpenModal}
            sx={{
              color: "white",
              fontSize: "12px",
            }}
            className="bg-black hover:bg-black"
          >
            Change
          </Button>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            className="flex justify-center items-center"
          >
            <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-80 max-w-4xl">
              <Typography variant="h6" gutterBottom>
                Select an option
              </Typography>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => handleSelectOption(e.target.value)}
              >
                <List>
                  {Outros.map((item: OutroItems, index) => (
                    <ListItem button key={index}>
                      <FormControlLabel
                        value={item.value}
                        control={
                          <Radio
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label={item.value}
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
              <div className="flex justify-end gap-2">
                <Button
                  sx={{
                    color: "black",
                    border: "1px solid #DADADA",
                  }}
                  className="bg-white hover:bg-white"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  sx={{
                    color: "white",
                  }}
                  className="bg-black hover:bg-black"
                  onClick={() => handleSelect()}
                >
                  Select
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <Button
          sx={{
            color: "white",
            width:'200px'
          }}
          className="bg-black hover:bg-black place-self-end"
        >
          CREATE
        </Button>
      </div>
    </>
  );
};

export default Script;
