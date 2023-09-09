import { outroDataTypes } from "@/components/Types/Outro.type";
import { UseDeleteOutro, useGetOutro } from "@/services/outro";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Box, Button, Modal, Popover, Typography } from "@mui/material";
import { FaSpinner, FaTrash } from "react-icons/fa";
import Toaster from "@/common/Toaster/Toaster";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import Skeleton from "@/common/Skeleton/Skeleton";
interface OutroProps {
  handleOpenPopOver: () => void;
  closePopOver: boolean;
  data: outroDataTypes[];
  FilterData: outroDataTypes[];
  setIsPopoverOpen: (value: boolean) => void;
  isPopoverOpen: boolean;
  popoverAnchorEl: HTMLDivElement | null;
  handlePopoverOpen: (
    id: string,
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => void;
  openPopover: string;
  outroLoading: boolean;
  handleCloseDeleteModal: () => void;
  HandleDeleteModal: (id: string) => void;
  showdeleteOutroModal: boolean;
  handleOpenEditModal: (description: outroDataTypes) => void;
}

const Outros: React.FC<OutroProps> = ({
  data,
  FilterData,
  isPopoverOpen,
  setIsPopoverOpen,
  popoverAnchorEl,
  handlePopoverOpen,
  openPopover,
  outroLoading,
  handleCloseDeleteModal,
  HandleDeleteModal,
  showdeleteOutroModal,
  handleOpenEditModal,
  closePopOver,
  handleOpenPopOver,
}) => {
  const rotateAnimation = `spin 1s linear infinite`;
  const [totalPagesCount, setTotalPages] = useState(1);
  const { mutate, isSuccess, isLoading, isError } = UseDeleteOutro();
  const [currentPage, setCurrentPage] = useState(1);
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPagesCount);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }
  // Generate an array of visible page numbers
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPagesCount) {
      handlePageChange(currentPage + 1);
    }
  };
  const handlePopoverClosed = () => {
    setIsPopoverOpen(false);
  };

  const EditModalId = data?.map((item: outroDataTypes) => {
    return item?.id;
  });

  const HandleDeleteChannel = (id: string) => {
    const DeleteOutroData = FilterData?.filter((items) => items?.id !== id);
    mutate(id);
  };
  useEffect(() => {
    if (isSuccess || isError) {
      handleCloseDeleteModal();
      handlePopoverClosed();
    }
  }, [isSuccess, isError]);
  return (
    <div>
      {outroLoading && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(200, 200, 200, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <LottieSpinner />
          </div>
        </>
      )}
      {!outroLoading && (
        <>
          <>
            {/* Modal-Delete */}
            {isSuccess && (
              <>
                {" "}
                <Toaster
                  Success={true}
                  title="Outro Deleted SuccessFully"
                  Color="green"
                />
              </>
            )}
            {isError && (
              <>
                {" "}
                <Toaster
                  Error={true}
                  title="An Error Occurred During Outro Deletion"
                  Color="red"
                />
              </>
            )}
            <>
              <Modal
                open={showdeleteOutroModal}
                onClose={handleCloseDeleteModal}
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
                    Are you sure you want to delete this channel? Delete Cancel
                  </Typography>
                  <div className="flex justify-end pt-4">
                    <div className="pe-2 ps-2">
                      <Button
                        disabled={isLoading}
                        onClick={() => HandleDeleteChannel(openPopover)}
                        className="flex items-center border-red-600 border-btn-red"
                        variant="outlined"
                      >
                        {isLoading ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <FaTrash className="text-red-600" />
                          </>
                        )}
                        <span className="ps-2 pe-2 text-red-600">
                          {isLoading ? (
                            <>
                              <div className="flex items-center">
                                <FaSpinner
                                  size={16}
                                  style={{
                                    animation: rotateAnimation,
                                    marginRight: "10px",
                                  }}
                                ></FaSpinner>
                                <span className="ms-1"> Delete</span>
                              </div>
                            </>
                          ) : (
                            "Delete"
                          )}
                        </span>
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
            </>
            <>
              {closePopOver ? (
                <>
                  <Popover
                    open={isPopoverOpen}
                    anchorEl={popoverAnchorEl}
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
                        onClick={() => handleOpenEditModal(openPopover as any)}
                        className="cursor-pointer"
                        id="modal-modal-description"
                        sx={{ mt: 1 }}
                      >
                        Edit
                      </Typography>
                      <Typography
                        onClick={() => HandleDeleteModal(openPopover)}
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
            </>
          </>
          {FilterData?.length === 0 ? (
            <div className="flex justify-center items-center  h-[calc(100vh-11.6rem)] ">
              <Skeleton
                widht={120}
                height={120}
                titleofPage="No Outro Data Found"
                TitleData="Suggestion"
              />
            </div>
          ) : (
            <>
              <div className="mt-6 rounded-md border-2 h-[calc(100vh-12.5rem)]">
                <div className="flex items-center justify-between pe-16 ps-6 pt-4">
                  <div className="flex items-center ">
                    <p className="pe-6">No.</p>
                    <p>Outros</p>
                  </div>
                  <div className="pe-6">
                    <p>Status</p>
                  </div>
                </div>
                <div className="table-bb-gray mt-2 ms-4 me-4"></div>
                <div>
                  <div className="overflow-scroll h-[calc(100vh-15.5rem)]">
                    <>
                      {FilterData?.map((items: outroDataTypes, index) => {
                        return (
                          <>
                            {console.log(items, "items")}
                            <div
                              key={items?.id}
                              className="border-b-2 mt-2 mb-2 ms-2 me-2 "
                            >
                              <div className="flex pe-12 ps-6">
                                <div className="pt-2 ">
                                  <p>{index + 1}</p>
                                </div>
                                <div className="ps-10 pe-10 pt-1 pb-1 w-[95%]">
                                  <p className="text-sm">
                                    {items?.description}
                                  </p>
                                </div>
                                <div>
                                  <p className="bg-black text-white text-xs pt-1 pb-1 ps-2  mt-1 me-4  pe-2 rounded-xl">
                                    {items?.status === null ||
                                    items?.status === "New"
                                      ? "New"
                                      : "Used"}
                                  </p>
                                </div>
                                <div
                                  className="pt-2 cursor-pointer"
                                  onClick={(event) => {
                                    handlePopoverOpen(
                                      items?.id || "",
                                      event,
                                      items
                                    );
                                    handleOpenPopOver();
                                  }}
                                >
                                  <BsThreeDotsVertical />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Outros;
