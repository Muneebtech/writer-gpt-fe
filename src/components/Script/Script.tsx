import { categories } from "@/constants/categories"
import { OutroItems, Outros } from "@/constants/outro"
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
  Typography
} from "@mui/material"
import React, { useRef, useState } from "react"
import { FiCopy } from "react-icons/fi"
import { AiOutlineUpload } from "react-icons/ai"

import Image from "next/image"

const Script = () => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")

  const handleOpenColorModal = () => {
    setIsOpen(true)
  }

  const handleCloseColorModal = () => {
    setIsOpen(false)
  }

  const copyToClipboard = () => {
    if (InputRef.current !== null) {
      InputRef?.current.select()
      InputRef?.current.setSelectionRange(0, 99999)
    }
    document.execCommand("copy")
    alert("Link copied to clipboard!")
  }
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
    p: 4
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)
    setTextareaValue(selectedOption)
    setModalOpen(false)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
  }
  function generateRandomColors(count) {
    const colors = []
    const letters = "0123456789ABCDEF"

    for (let i = 0; i < count; i++) {
      let color = "#"

      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      colors.push(color)
    }

    return colors
  }

  const colors = generateRandomColors(10)
  console.log(colors, "Colors")

  return (
    <>
      {/* Right-section */}
      <div className="flex items-center">
        <div className="Side-spacing ">
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
              Name
            </InputLabel>
            <Input
              placeholder="Enter Your Name"
              className="border ps-4 pe-4 pt-3 pb-3 input-size "
            />
          </div>
          <div className="pt-2 pb-2">
            <div className="flex items-center justify-between w-10/12">
              <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
                Category
              </InputLabel>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleOpenColorModal()}
              >
                <span className="border-b-2 border-gray-400 text-sm ">
                  Select Color
                </span>
                <div className="bg-gray-600 rounded-full ps-2 pe-2 pt-2 pb-2  ms-1 me-1">
                  <div>
                    <span style={{ color: selectedColor }}>
                      {selectedColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isOpen ? (
              <div className={`modal ${isOpen ? "open" : ""}`}>
                <div className="modal-content">
                  <h2>Colors</h2>
                  <div className="color-container">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                        // onClick={() => onColorSelect(color)}
                      />
                    ))}
                    .
                  </div>
                  <button
                    className="close-button"
                    onClick={handleCloseColorModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            <Select placeholder="Select category" className="input-size ">
              {categories.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="pt-2 pb-2">
            <InputLabel className="pt-2 pb-2 font-bold" htmlFor="youtube">
              Youtube link
            </InputLabel>
            <Input
              id="youtube"
              type="text"
              placeholder="Insert Youtube Link"
              ref={InputRef}
              className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
            />
            <Button
              onClick={copyToClipboard}
              title="Copy Link"
              className="bg-gray-200 position-btn border border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
            >
              <FiCopy />
            </Button>
          </div>
          <div className="pt-2 pb-2 ">
            <InputLabel htmlFor="topic" className="pt-2 pb-2 font-bold">
              Learning
            </InputLabel>
            <Select
              id="topic"
              placeholder="Select topic"
              className="input-size "
            >
              {categories.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {/* Left Side */}
        <div className="Side-spacing ">
          <div className="flex items-center">
            <div>
              <div className="ms-4 mb-1 mt-1">
                <span className="font-bold ">Profile Picture</span>
              </div>
              <div className=" ">
                <Image
                  width={200}
                  height={200}
                  className="rounded-full mr-2"
                  src="/profile.png"
                  alt="Profile"
                />
              </div>
            </div>
            <div className=" ps-6 pe-6">
              <div className="flex items-center pt-2 pb-2 cursor-pointer">
                <AiOutlineUpload size={20} />
                <span className="ps-1 pe-1 border-b-2 border-gray-400">
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
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="discord" className="pt-2 pb-2 font-bold">
              Discord Link
            </InputLabel>
            <Input
              id="discord"
              type="text"
              placeholder="Insert Discord Link"
              ref={InputRef}
              className="py-2 px-3 border  border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow input-size "
            />
            <Button
              onClick={copyToClipboard}
              title="Copy Link"
              className="bg-gray-200 border Discord-link  border-gray-300 rounded-r-md p-2 ml-1 hover:bg-gray-300"
            >
              <FiCopy />
            </Button>
          </div>
          <div className="pt-2 pb-2">
            <InputLabel htmlFor="name" className="pt-2 pb-2 font-bold">
              Video Topic
            </InputLabel>
            <Select id="topic" label="Select topic" className="input-size ">
              {categories.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div></div>
      </div>
      <div className="container mx-auto mt-8">
        <InputLabel className="pt-2 pb-2 font-bold">Outros</InputLabel>
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          className="border w-full border-gray-300 rounded p-2 mb-4"
        ></textarea>
        <span
          onClick={handleOpenModal}
          className=" text-black rounded px-4 py-2"
        >
          Change
        </span>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          className="flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-96 max-w-4xl">
            <Typography variant="h6" gutterBottom>
              Select Outros
            </Typography>
            <List>
              {Outros.map((item: OutroItems, index) => {
                return (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSelectOption(item.value)}
                  >
                    <ListItemText
                      className="border-2 ps-2 pe-2 pt-2 pb-2"
                      primary={item.value}
                    />
                  </ListItem>
                )
              })}
              <div className="flex justify-end">
                <Button
                  variant="outlined"
                  color="primary"
                  className="text-primary px-4 py-2 ms-1 me-1"
                >
                  Cancel
                </Button>
                <Button className="bg-black hover:bg-black:200 text-white px-4 py-2 ">
                  Submit
                </Button>
              </div>
            </List>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Script
