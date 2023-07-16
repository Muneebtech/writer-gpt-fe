import { outroDataTypes } from "@/components/Types/Outro.type";
import { useGetOutro } from "@/services/outro";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
const Outros = () => {
  const [totalPagesCount, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: Outrodata, isLoading: outroLoading } = useGetOutro();
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
  return (
    <div>
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
              {Outrodata?.map((items: outroDataTypes) => {
                return (
                  <>
                    <div
                      key={items?.id}
                      className="border-b-2 mt-2 mb-2 ms-2 me-2"
                    >
                      <div className="flex pe-12 ps-6">
                        <div className="pt-2 ">
                          <p>1</p>
                        </div>
                        <div className="ps-10 pe-10 pt-1 pb-1">
                          <p>{items?.description}</p>
                        </div>
                        <div>
                          <p className="bg-black text-white text-xs pt-1 pb-1 ps-2  mt-1 me-4  pe-2 rounded-xl">
                            {items?.status === null
                              ? "New" || items?.status === "New"
                                ? " New"
                                : "Used"
                              : ""}
                          </p>
                        </div>
                        <div className="pt-2 cursor-pointer ">
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outros;
