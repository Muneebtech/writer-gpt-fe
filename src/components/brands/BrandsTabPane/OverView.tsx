import Header from "@/common/Header/header";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
import { tableData, TableListData } from "@/constants/library";
import Spinner from "@/modules/spinner/spinner";
import { useGetJobs } from "@/services/Jobs";
import { useGetBrandsJobs } from "@/services/channel/hooks/channelJobs";
import { generateRandomColors } from "@/utils/randomColor";
import { Box, Button, Popover, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDownload, FiPlus } from "react-icons/fi";
const OverView = () => {
  const router = useRouter();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const { id } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, isSuccess } = useGetBrandsJobs(id as string);
  console.log(data, "data::library  ");

  const [Data, setData] = useState<TableListData[]>();
  const [totalPagesCount, setTotalPages] = useState(1);
  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const [popoverAnchorEl, setpopoverAnchorEl] = useState<HTMLDivElement | null>(
  //   null
  // );
  // const [openEditModal, setOpenEditModal] = useState(false);
  console.log(totalPagesCount, "totalPagesCount:;totalPagesCount");

  useEffect(() => {
    setTotalPages(data?.totalPages);
    setData(data?.results);
  }, [data]);

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
  function downloadTextAsFile(text: string, filename: string) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  function downloadFiles(row: TableListData) {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
    const filename = `${formattedDate}_${row?.channel?.channel}`;

    // Download the GPT logs file
    if (row?.gptLogs) {
      downloadTextAsFile(row.gptLogs, `GPT_LOG_${filename}`);
    }

    // Download the script file
    if (row?.script) {
      downloadTextAsFile(row.script, `SCRIPT_${filename}`);
    }
  }

  // const handleOpenEditModal = () => {
  //   setOpenEditModal(true);
  //   // setEditTopicData();
  // };
  // const HandleDeleteModal = () => {
  //   setOpenEditModal(false);
  // };

  const handleOpenEditModal = () => {
    // Your logic to handle the Edit action
    console.log("Edit action clicked");
    setPopoverOpen(false);
  };

  const handleDeleteModal = () => {
    // Your logic to handle the Delete action
    console.log("Delete action clicked");
    setPopoverOpen(false);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setPopoverAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <>
          <div className="mt-4"></div>
          <div className="bg-white table-b-gray rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 text-sm">
              <thead>
                <tr className="">
                  <th className="py-4 px-4 text-left">Video Name</th>
                  <th className="py-4 px-4 text-left">Language</th>
                  <th className="py-4 px-4 text-left">Video Topic</th>
                  <th className="py-4 px-4 text-left">Outro</th>
                  <th className="py-4 px-4 text-center">GPT Logs</th>
                  <th className="py-4 px-4 text-center">Word Count</th>
                  <th className="py-4 px-4 text-center">Script</th>
                  {/* <th className="py-4 px-4 text-center">Voiceover</th> */}
                  {/* <th className="py-4 px-4 text-center">Date</th> */}
                </tr>
              </thead>
              <tbody>
                {Data?.map((row: TableListData, index: number) => {
                  const currentDate = new Date();
                  const formattedDate = currentDate
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-");
                  const filename = `${formattedDate}_${row?.channel?.channel}`;
                  const { backgroundColor } = generateRandomColors();
                  return (
                    <tr
                      key={row?.id}
                      className={`border-b leading-3 ${
                        index !== Data.length - 1 ? "table-bb-gray" : ""
                      }`}
                    >
                      <td className="py-4 px-4 text-center ">
                        <div className="flex items-center">
                          <Image
                            src="/Library.png"
                            alt="Thumbnail"
                            width={43}
                            height={28}
                            className="mr-2 rounded"
                          />
                          {row?.channel?.channel}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-left">
                        {row?.model?.model}
                      </td>
                      <td className="py-4 px-4 text-left">
                        {row?.topic?.topic}
                      </td>
                      <td className="py-4 px-4 text-left">
                        {row?.outro?.outro}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <Button
                            disabled={row?.gptLogs ? false : true}
                            onClick={() =>
                              downloadTextAsFile(
                                row.gptLogs,
                                `GPT_LOG_${filename}`
                              )
                            }
                          >
                            <FiDownload />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className=" text-center rounded-3xl py-2 px-6"
                          style={{
                            backgroundColor: `${backgroundColor}`,
                          }}
                        >
                          {row.wordCount}
                        </span>
                      </td>
                      <td className="py-4 px-4 flex justify-center items-center">
                        <div className="flex justify-center">
                          <Button
                            disabled={row?.script ? false : true}
                            onClick={() =>
                              downloadTextAsFile(
                                row.script,
                                `SCRIPT_${filename}`
                              )
                            }
                          >
                            <FiDownload onClick={() => downloadFiles(row)} />
                          </Button>
                        </div>
                        <BsThreeDotsVertical
                          style={{ marginRight: "-10px", cursor: "pointer" }}
                          onClick={handlePopoverOpen}
                        />
                      </td>
                      {/* <td className="py-4 px-4 text-center">{row.date}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            {data?.page === 1 ? (
              <></>
            ) : (
              <>
                <div className="flex justify-end m-2 gap-1">
                  <button
                    className={`px-2 py-1 border border-gray-300 rounded-md ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {startPage > 1 && (
                    <button className="px-2 py-1 border border-gray-300 rounded-md">
                      ...
                    </button>
                  )}
                  {visiblePages.map((page) => (
                    <button
                      className={`px-2 py-1 border border-gray-300 rounded-md ${
                        page === currentPage ? "bg-blue-500 text-white" : ""
                      }`}
                      key={page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}

                  {endPage < totalPagesCount && (
                    <button className="px-2 py-1 border border-gray-300 rounded-md">
                      ...
                    </button>
                  )}
                  <button
                    className={`px-2 py-1 border border-gray-300 rounded-md ${
                      currentPage === totalPagesCount
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPagesCount}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          <Popover
            open={isPopoverOpen}
            anchorEl={popoverAnchorEl}
            onClose={handlePopoverClose}
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
                onClick={handleOpenEditModal}
                className="cursor-pointer"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                Edit
              </Typography>
              <Typography
                onClick={handleDeleteModal}
                className="cursor-pointer"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                Delete
              </Typography>
            </Box>
          </Popover>
        </>
      )}
    </>
  );
};

export default OverView;
