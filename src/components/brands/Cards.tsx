import { generateRandomColors } from "@/utils/randomColor";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Modal,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useDeleteChannels } from "@/services/channel/hooks/useDeleteChaneel";
import { getChannelTypes } from "../Types/channel.types";
import EditChannel from "./EditChannel";
import { isAdminOrManager } from "@/utils/authorisation";
import { decryptData } from "@/utils/localStorage";
interface CardProps {
  data: {
    id: string;
    channel: string;
    category: {
      category: string;
      id: string;
    };
    youtubeUrl: string;
    discordUrl: string;
    photoPath: File | any;
    subscribers: string;
  };
  handleClosePopover: () => void;
  closePopover: boolean;
  handleOpenPopover: () => void;
  key: string;
  HandleDeleteChannel: (id: string) => void;
  isLoadingDelete: boolean;
  isSuccessDelete: boolean;
}
const Cards: React.FC<CardProps> = ({
  data,
  key,
  HandleDeleteChannel,
  closePopover,
  handleOpenPopover,
  handleClosePopover,
  isLoadingDelete,
  isSuccessDelete,
}) => {
  const [selectedData, setSelectedData] = useState<getChannelTypes | null>(
    null
  );
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const { isLoading, isSuccess, mutate } = useDeleteChannels();
  const [showeditModal, setShowEditModal] = useState(false);
  const [showdeleteModal, setDeleteModal] = useState(false);
  const { backgroundColor, textColor } = generateRandomColors();
  const router = useRouter();

  const src = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${data?.photoPath}`;
  const handleCardClick = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    router.push(`/brands/${id}`);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };
  const isPopoverOpen = Boolean(popoverAnchorEl);
  const HandleDeleteModal = (id: string) => {
    if (id) {
      setDeleteModal(true);
    }
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const handleShowEditModal = (id: string, data: getChannelTypes) => {
    setSelectedData(data);
    setShowEditModal(true);
  };
  useEffect(() => {}, []);
  const handleHideEditModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    if (isSuccessDelete) {
      handleClosePopover();
      handleCloseDeleteModal();
    }
  }, [isSuccessDelete]);
  const rotateAnimation = `spin 1s linear infinite`;

  return (
    <>
      <EditChannel
        handleClosePopover={handleClosePopover}
        handleShowEditModal={handleShowEditModal}
        handleHideEditModal={handleHideEditModal}
        showeditModal={showeditModal}
        selectedData={selectedData}
      />
      <Modal
        open={showdeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-1/2">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            DELETING CHANNEL
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this channel? Delete Cancel
          </Typography>
          <div className="flex justify-end pt-4">
            <div className="pe-2 ps-2">
              <Button
                onClick={() => HandleDeleteChannel(data?.id)}
                className="flex items-center border-red-600 border-btn-red"
                variant="outlined"
              >
                {isLoadingDelete ? (
                  <>
                    <span className="ps-2 pe-2 text-red-600 flex items-center">
                      <>
                        {" "}
                        <FaSpinner
                          size={16}
                          style={{
                            animation: rotateAnimation,
                            marginRight: "10px",
                          }}
                        ></FaSpinner>
                        Deleting...
                      </>
                    </span>
                  </>
                ) : (
                  <div className="flex items-center">
                    <FaTrash className="text-red-600" />
                    <span className="ps-2 pe-2 text-red-600">Delete</span>
                  </div>
                )}{" "}
              </Button>
            </div>
            <div>
              <Button
                onClick={handleCloseDeleteModal}
                variant="contained"
                className="btn-black button-black-modal"
              >
                <span className="ps-2 pe-2">Cancel</span>
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {isLoading ? (
        <></> // Render nothing when isLoading is true
      ) : (
        <>
          {isSuccess ? (
            <></> // Render nothing when isSuccess is true
          ) : (
            <></>
          )}
        </>
      )}
      {closePopover ? (
        <>
          {" "}
          <Popover
            open={
              isPopoverOpen &&
              data?.category?.id ===
                popoverAnchorEl?.getAttribute("data-category-id")
            }
            anchorEl={popoverAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-96">
              <Typography
                onClick={() => handleShowEditModal(data?.id, data)}
                className="cursor-pointer"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                Edit
              </Typography>
              <Typography
                onClick={() => HandleDeleteModal(data?.category?.id)}
                className="cursor-pointer"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                Delete
              </Typography>
            </Box>
          </Popover>
        </>
      ) : (
        <></>
      )}
      <div
        onClick={(event) => handleCardClick(data?.id, event)}
        key={key}
        className="w-1/6 h-[calc(100vh-17.7rem)] flex flex-col justify-between items-center border border-gray-200 gap-2 rounded-lg mx-4 my-2 p-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
        <span
          style={{
            backgroundColor: `${backgroundColor}`,
            color: `${textColor}`,
          }}
          className="px-4 py-2 rounded-3xl text-xs text-center flex justify-center items-center whitespace-nowrap overflow-hidden"
        >
          {data?.category?.category}
        </span>
        <div className="w-24 h-24 relative">
          <Image
            fill
            style={{ objectFit: "cover", borderRadius: "50%" }}
            src={data?.photoPath ? src : "/channel.jpg"}
            loader={() => (data?.photoPath ? src : "/channel.jpg")}
            alt="no image"
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <Tooltip title={data?.channel}>
            <span className="text-lg font-medium w-full truncate-text-2 text-center">
              {data?.channel?.length > 15
                ? data?.channel?.slice(0, 15)
                : data?.channel}{" "}
              {data?.channel?.length > 15 && "..."}
            </span>
          </Tooltip>
          <span className="text-xs text-gray-500">
            Subscribers {data?.subscribers}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={data?.youtubeUrl}
            className="rounded-2xl px-2 py-1 flex justify-center items-center border-gray-200 border"
          >
            <Image width={20} height={20} src="/youtube.png" alt="" />
          </a>
          <a
            href={data?.discordUrl}
            className="rounded-2xl px-2 py-1 flex justify-center items-center border-gray-200 border"
          >
            <Image width={20} height={20} src="/discord.png" alt="" />
          </a>
          {isAdminOrManager() ? (
            <>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  handlePopoverOpen(event);
                  handleOpenPopover();
                }}
                className="rounded-2xl px-3 z-1000 py-1 flex justify-center items-center border-gray-200 border popover-trigger"
                data-category-id={data?.category?.id}
              >
                <Image width={15} height={15} src="/dots.png" alt="" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Cards;
