import { outroDataTypes } from "@/components/Types/Outro.type";
import { UseDeleteOutro, useGetOutro } from "@/services/outro";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import { useState } from "react";
import { useTopic } from "@/services/topic";
import { Box, Button, Modal, Popover, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { UseDeleteTopic } from "@/services/topic/hooks/useDeleteTopic";
import { LoadingButton } from "@mui/lab";
interface TopicDataListProps {
  data: Topic[];
  TopicFilterData: Topic[];
  showTopicDeleteModal: boolean;
  handleTopicDeleteModalclose: () => void;
  handleTopicDeleteModalopen: (id: string) => void;
  handlePopoverOpenTopic: (
    id: string,
    event: React.MouseEvent<HTMLDivElement>,
    data: any
  ) => void;
  openPopover: string;
  handleEditTopic: (id: string) => void;
  popoverAnchorElTopic: HTMLDivElement | null;
  isPopoverOpenTopic: boolean;
  setIsPopoverOpenTopic: (value: boolean) => void;
  openPopoverTopic: string;
}
const VideoTopic: React.FC<TopicDataListProps> = ({
  data,
  TopicFilterData,
  showTopicDeleteModal,
  handleTopicDeleteModalclose,
  handlePopoverOpenTopic,
  handleEditTopic,
  isPopoverOpenTopic,
  popoverAnchorElTopic,
  setIsPopoverOpenTopic,
  openPopoverTopic,
  handleTopicDeleteModalopen,
}) => {
  const handlePopoverClosed = () => {
    setIsPopoverOpenTopic(false);
  };
  // const handleClick = (id: string) => {
  //   setSelectTopic(id === selectTopic ? null : id);
  //   setScriptData({ topic: id });
  // };
  const { mutate, isLoading, isSuccess } = UseDeleteTopic();

  const HandleDeleteTopic = (id: string) => {
    const Deletetopic = TopicFilterData?.filter((items) => items?.id !== id);
    mutate(id);
  };
  const { isLoading: TopicDataLoading } = useTopic();
  return (
    <>
      {TopicDataLoading ? (
        <></>
      ) : (
        <>
          <div>
            {isSuccess ? (
              <></>
            ) : (
              <>
                <Modal
                  open={showTopicDeleteModal}
                  onClose={handleTopicDeleteModalclose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="flex justify-center items-center"
                >
                  <Box className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-1/2">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      DELETING CHANNEL
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you want to delete this channel? Delete
                      Cancel
                    </Typography>
                    <div className="flex justify-end pt-4">
                      <div className="pe-2 ps-2">
                        <Button
                          onClick={() => HandleDeleteTopic(openPopoverTopic)}
                          className="flex items-center border-red-600 border-btn-red"
                          variant="outlined"
                        >
                          <FaTrash className="text-red-600" />{" "}
                          <span className="ps-2 pe-2 text-red-600">
                            {isLoading ? (
                              <LoadingButton
                                loading
                                loadingIndicator="Loading…"
                                variant="outlined"
                                color="error"
                              ></LoadingButton>
                            ) : (
                              "Delete"
                            )}
                          </span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={handleTopicDeleteModalclose}
                          variant="contained"
                          className="btn-black button-black-modal"
                        >
                          <span className="ps-2 pe-2">Cancel</span>
                        </Button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </>
            )}
            {isSuccess ? (
              <></>
            ) : (
              <>
                <Popover
                  open={isPopoverOpenTopic}
                  anchorEl={popoverAnchorElTopic}
                  onClose={handlePopoverClosed}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box className="bg-white p-4 rounded-lg overflow-y-auto modal-max-height w-96">
                    <Typography
                      onClick={() => handleEditTopic(openPopoverTopic)}
                      className="cursor-pointer"
                      id="modal-modal-description"
                      sx={{ mt: 1 }}
                    >
                      Edit
                    </Typography>
                    <Typography
                      onClick={() =>
                        handleTopicDeleteModalopen(openPopoverTopic)
                      }
                      className="cursor-pointer"
                      id="modal-modal-description"
                      sx={{ mt: 1 }}
                    >
                      Delete
                      {/* {isLoading ? "Deleting..." : "Delete"} */}
                    </Typography>
                  </Box>
                </Popover>
              </>
            )}

            <div className="mt-6 rounded-md border-2 h-[calc(100vh-11.5rem)]">
              <div className="flex items-center justify-between pe-16 ps-6 pt-4">
                <div className="flex items-center ">
                  <p className="pe-6">No.</p>
                  <p>Topics</p>
                </div>
                <div className="pe-6">
                  <p>Status</p>
                </div>
              </div>
              <div className="table-bb-gray mt-2 ms-4 me-4"></div>
              <div className="overflow-scroll h-[calc(100vh-14.5rem)]">
                <>
                  {(TopicFilterData?.length > 0 ? TopicFilterData : data)?.map(
                    (item: Topic, index) => {
                      const { id, topic, description } = item;
                      return (
                        <>
                          <div
                            key={id}
                            className="border-b-2 pt-2 pb-2 mt-2 mb-2 ms-2 me-2"
                          >
                            <div className="flex pe-12 ps-6 items-center">
                              <div className="pt-2 ">
                                <p>{index + 1}</p>
                              </div>
                              <div className="ps-10 pe-10 pt-1 pb-1 w-[100%]">
                                <p className="text-sm">{description}</p>
                                <p className="text-sm">{topic}</p>
                              </div>
                              {/* <div>
                        <p className="bg-black text-white text-xs pt-1 pb-1 ps-2  mt-1 me-4  pe-2 rounded-xl">
                          {item?.status === null
                            ? "New" || items?.status === "New"
                              ? " New"
                              : "Used"
                            : ""}
                        </p>
                      </div> */}
                              <div
                                className="pt-2 cursor-pointer "
                                onClick={(event) =>
                                  handlePopoverOpenTopic(id || "", event, item)
                                }
                              >
                                <BsThreeDotsVertical />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  )}
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoTopic;
