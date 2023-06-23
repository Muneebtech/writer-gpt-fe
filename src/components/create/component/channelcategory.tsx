import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "@/common/Header/header";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import {
  ChaneelData,
  ChannelCategoryDataMap,
} from "@/constants/channelcategories";
import { useState } from "react";
import { useGetChannels } from "@/services/channel";

const ChannelAndCategory = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const {
    isLoading: loading,
    data: Data,
    isSuccess: success,
  } = useGetChannels("");

  console.log('====================================');
  console.log(Data);
  console.log('====================================');

  const handleClick = (id: number) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };
  console.log(selectedItemId, "IdSelected");
  return (
    <div>
      <div className="mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">SELECT YOUR CHANNEL</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
        </div>
      
        <div className="ps-2 pb-6">
          x
          <div>
            <Button
              variant="outlined"
              className="widht-card pt-2 pb-2 text-black"
            >
              <FaPlus size={30} className="ps-2 pe-2" /> Add Channel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChannelAndCategory;
