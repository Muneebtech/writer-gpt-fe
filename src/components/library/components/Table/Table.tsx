import { tableData, TableListData } from "@/constants/library";
import Spinner from "../../../../modules/spinner/spinner";
import { useGetJobs } from "@/services/Jobs";
import { generateRandomColors } from "@/utils/randomColor";
import Image from "next/image";
import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: loading, data: Data, isSuccess: success } = useGetJobs();
  const [totalPagesData, setTotalPages] = useState(Data?.totalPages);
  console.log(Data, "Data");
  // const LibraryData = Data?.results
  // console.log(LibraryData, "LibraryData")
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPagesData);

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
    if (currentPage < totalPagesData) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {" "}
          <>
            {" "}
            <Spinner />
          </>
        </>
      ) : (
        <div className="bg-white table-b-gray rounded-lg">
          <>
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
                {Data?.results?.map((row: TableListData) => {
                  const { backgroundColor } = generateRandomColors();

                  return (
                    <tr
                      key={row?.id}
                      className={`border-b leading-3 ${
                        row?.id !== tableData.length - 1 ? "table-bb-gray" : ""
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
                      <td className="py-4 px-4 text-center">
                        {row.topic}
                      </td>
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
                            backgroundColor: `${backgroundColor}`,
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
              {endPage < totalPagesData && (
                <button className="px-2 py-1 border border-gray-300 rounded-md">
                  ...
                </button>
              )}
              <button
                className={`px-2 py-1 border border-gray-300 rounded-md ${
                  currentPage === totalPagesData
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPagesData}
              >
                Next
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default Table;
