import { categories } from "@/constants/categories";
import { OutroItems, Outros } from "@/constants/outro";
import {
  Box,
  Button,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Typography,
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
    setTextareaValue(selectedOption);
    setModalOpen(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between gap-2 items-center w-full">
          <div className="flex flex-col gap-2 w-half">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" placeholder="Enter name here"></Input>
            <InputLabel htmlFor="name">Category</InputLabel>
            <Select placeholder="Select category">
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <InputLabel htmlFor="youtube">Youtube link</InputLabel>
            <div className="flex items-center">
              <Input
                id="youtube"
                type="text"
                placeholder="Insert Youtube Link"
                ref={InputRef}
                className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
              />
              <Button
                onClick={copyToClipboard}
                title="Copy Link"
                className="bg-gray-200 border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
              >
                <FiCopy />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-half">
            <div>
              <InputLabel htmlFor="discord">Discord Link</InputLabel>
              <Input
                id="discord"
                type="text"
                placeholder="Insert Discord Link"
                ref={InputRef}
                className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
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
            <Select id="topic" placeholder="Select topic">
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <InputLabel htmlFor="outro">Outro</InputLabel>
        <Select
          id="outro"
          className="w-full"
          placeholder="Select outro"
        ></Select>

        <div className="container mx-auto mt-8">
          <textarea
            value={textareaValue}
            onChange={handleTextareaChange}
            className="border w-full border-gray-300 rounded p-2 mb-4"
          ></textarea>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          >
            Change
          </button>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            className="flex justify-center items-center"
          >
            <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-80 max-w-4xl">
              <Typography variant="h6" gutterBottom>
                Select an option
              </Typography>
              <List>
                {Outros.map((item: OutroItems, index) => {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleSelectOption(item.value)}
                    >
                      <ListItemText primary={item.value} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Script;
