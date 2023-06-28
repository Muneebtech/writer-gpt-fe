import { tableData, TableListData } from "@/constants/library"
import Spinner from "../../../../modules/spinner/spinner"
import { useGetJobs } from "@/services/Jobs"
import { generateRandomColors } from "@/utils/randomColor"
import Image from "next/image"
import React, { useState, useEffect ,useMemo} from "react"
import { FiDownload } from "react-icons/fi"
import { Button } from "@mui/material"
import Header from "@/common/Header/header"
const Table = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading: loading, data: Data, isSuccess: success } = useGetJobs()
  const [totalPagesData, setTotalPages] = useState(Data?.totalPages)
  const [data, setData] = useState([])
  const [searchKeyword, setSearchKeyword] = useState<string>("");


  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const filteredData = useMemo(() => {
    let filtered = Data?.results;
    if (searchKeyword) {
      filtered = filtered.filter((data: TableListData) =>
        data?.channel?.channel?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    return filtered;
  }, [searchKeyword, Data?.results]);

  let startPage = Math.max(currentPage - 2, 1)
  let endPage = Math.min(startPage + 4, totalPagesData)

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1)
  }
  // Generate an array of visible page numbers
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPagesData) {
      handlePageChange(currentPage + 1)
    }
  }
  function downloadTextAsFile(text: string, filename: string) {
    const blob = new Blob([text], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }
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
        <>
          <Header
            title="LIBRARY"
            showSearch={true}
            searchKeyword="Search"
            onSearch={handleSearch}
          />
          <div className="table-bb-gray mt-1 ms-4 me-4"></div>
          <div className="bg-white table-b-gray rounded-lg">
            <div
              className="table-container h-[calc(100vh-11.6rem)] rounded-lg"
              style={{ overflowY:"scroll" }}
            >
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
                  {filteredData?.map((row: TableListData, index: number) => {
                    const { backgroundColor } = generateRandomColors()
                    const src = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${row.photoPath}`
                    const currentDate = new Date()
                    const formattedDate = currentDate
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")
                    const filename = `${formattedDate}_${row?.channel?.channel}`
                    return (
                      <tr
                        key={row?.id}
                        className={`border-b leading-3 ${
                          index !== Data.length - 1 ? "table-bb-gray" : ""
                        }`}
                      >
                        <td className="py-4 px-4 text-left ">
                          <div className="flex items-center">
                            <Image
                              loader={() => src}
                              src={src}
                              alt="Thumbnail"
                              width={43}
                              height={28}
                              className="mr-2 rounded max-w-[43px] max-h-[28px]"
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
                            className=" text-left rounded-3xl py-2 px-6"
                            style={{
                              backgroundColor: `${backgroundColor}`,
                            }}
                          >
                            {row.wordCount}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-left">
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
                              <FiDownload />
                            </Button>
                          </div>
                        </td>
                        {/* <td className="py-4 px-4">
                          <div className="flex justify-center">
                            <Button
                              disabled={true}
                              onClick={() =>
                                downloadTextAsFile(row.gptLogs, filename)
                              }
                              className="text-black"
                            >
                              <FiDownload />
                            </Button>
                          </div>
                        </td> */}
                        {/* <td className="py-4 px-4 text-center">{row.date}</td> */}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {/* Pagination */}
            </div>
          </div>
          <div className="postion-Pagination ">
            <div className="flex justify-end gap-0.5">
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
          </div>
        </>
      )}
    </>
  )
}

export default Table
