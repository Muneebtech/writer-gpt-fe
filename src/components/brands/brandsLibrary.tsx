import Header from "@/common/Header/header";
import { tableData, TableListData } from "@/constants/library";
import { useGetJobs } from "@/services/Jobs";
import { generateRandomColors } from "@/utils/randomColor";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiDownload, FiPlus } from "react-icons/fi";
const BrandsLibrary = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { isLoading: loading, data: Data, isSuccess: success } = useGetJobs()
  console.log(Data, "Data")
  const LibraryData = Data?.results
  console.log(LibraryData, "LibraryData")
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);

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
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between fade-out">
        <div className="flex items-center">
          <div className="flex items-center ">
            <div className="ps-1 pe-1 cursor-pointer">
              <AiOutlineLeft />
            </div>
            <div className="ps-1 pe-1"><Image src="/chaneel.png" alt="chnaeel" width={30} height={30} /></div>
            <div className="ps-1 pe-1"> <span>Morning Prayer</span></div>
          </div>
          <Header title="" showSearch={true} searchKeyword="Search" />
        </div>
        <Button variant="contained" className="button-black ps-4 pe-4">
          <FiPlus size={25} className="pe-1 ps-1" />
          Create
        </Button>
      </div>
      <div className=" table-bb-gray mt-4 ">
      </div>
      <div className="mt-4">
      </div>
      <div className="bg-white table-b-gray rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 text-sm">
          <thead>
            <tr className="">
              <th className="py-4 px-4 text-center">Video Name</th>
              <th className="py-4 px-4 text-center">Language</th>
              <th className="py-4 px-4 text-center">Model</th>
              <th className="py-4 px-4 text-center">Video Topic</th>
              <th className="py-4 px-4 text-center">Outro</th>
              <th className="py-4 px-4 text-center">GPT Logs</th>
              <th className="py-4 px-4 text-center">Word Count</th>
              <th className="py-4 px-4 text-center">Script</th>
              <th className="py-4 px-4 text-center">Voiceover</th>
              <th className="py-4 px-4 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {LibraryData?.map((row: TableListData) => {
              const { backgroundColor } = generateRandomColors();

              return (
                <tr
                  key={row?.id}
                  className={`border-b leading-3 ${row?.id !== tableData.length - 1 ? "table-bb-gray" : ""
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
                      {row?.videoName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{row.language}</td>
                  <td className="py-4 px-4 text-center">{row.model}</td>
                  <td className="py-4 px-4 text-center">{row.videoTopic}</td>
                  <td className="py-4 px-4 text-center">{row.outro}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <FiDownload />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className=" text-center rounded-3xl py-2 px-6"
                      style={{
                        backgroundColor: `${backgroundColor}`
                      }}
                    >
                      {row.wordCount}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <FiDownload />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <FiDownload />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{row.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end m-2 gap-1">
          <button
            className={`px-2 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
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
              className={`px-2 py-1 border border-gray-300 rounded-md ${page === currentPage ? "bg-blue-500 text-white" : ""
                }`}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          {endPage < totalPages && (
            <button className="px-2 py-1 border border-gray-300 rounded-md">
              ...
            </button>
          )}
          <button
            className={`px-2 py-1 border border-gray-300 rounded-md ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div></>

  );
};

export default BrandsLibrary;
