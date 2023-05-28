import { OutroItems, Outros } from "@/constants/outro";
import { useState } from "react";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: string) => void;
};
const Modal = ({ isOpen, onClose, onSelect }: ModalProps) => {

  const handleSelect = (item: string) => {
    onSelect(item);
    onClose();
  };

  return (
    <div
      className={`flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className=" bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select an option</h2>
        <ul>
          {Outros.map((item: OutroItems, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded"
              onClick={() => handleSelect(item.value)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Modal;
