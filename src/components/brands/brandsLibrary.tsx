import Header from "@/common/Header/header";
import { tableData, TableListData } from "@/constants/library";
import Spinner from "@/modules/spinner/spinner";
import { useGetJobs } from "@/services/Jobs";
import { useGetBrandsJobs } from "@/services/channel/hooks/channelJobs";
import { generateRandomColors } from "@/utils/randomColor";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiDownload, FiPlus } from "react-icons/fi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OverView from "./BrandsData/OverView";
import Outros from "./BrandsData/Outros";
import LanguageModel from "./BrandsData/languageModel";
import VideoTopic from "./BrandsData/VideoTopic";
import Voice from "./BrandsData/Voice";
import Managers from "./BrandsData/Managers";
// const BrandsLibrary = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [currentPage, setCurrentPage] = useState(1);
//   const { isLoading, data, isSuccess } = useGetBrandsJobs(id as string);
//   const [totalPagesCount, setTotalPages] = useState(data?.totalPages);
//   const LibraryData = data?.results;
//   let startPage = Math.max(currentPage - 2, 1);
//   let endPage = Math.min(startPage + 4, totalPagesCount);
//   if (endPage - startPage < 4) {
//     startPage = Math.max(endPage - 4, 1);
//   }
//   // Generate an array of visible page numbers
//   const visiblePages = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, i) => startPage + i
//   );
//   // Handle previous page click
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1);
//     }
//   };
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };
//   // Handle next page click
//   const handleNextPage = () => {
//     if (currentPage < totalPagesCount) {
//       handlePageChange(currentPage + 1);
//     }
//   };
//   const handleCardClick = () => {
//     router.push(`/brands`);
//   };
//   return (
//     <>
//       {isLoading ? (
//         <>
//           <Spinner />
//         </>
//       ) : (
//         <>
//           <div className="flex items-center justify-between fade-out">
//             <div className="flex items-center">
//               <div className="flex items-center ">
//                 <div
//                   onClick={handleCardClick}
//                   className="ps-1 pe-1 cursor-pointer"
//                 >
//                   <AiOutlineLeft />
//                 </div>
//                 <div className="ps-1 pe-1">
//                   <Image
//                     src="/chaneel.png"
//                     alt="chnaeel"
//                     width={30}
//                     height={30}
//                   />
//                 </div>
//                 <div className="ps-1 pe-1">
//                   {" "}
//                   <span>Morning Prayer</span>
//                 </div>
//               </div>
//               <Header title="" showSearch={true} searchKeyword="Search" />
//             </div>
//             <Button variant="contained" className="button-black ps-4 pe-4">
//               <FiPlus size={25} className="pe-1 ps-1" />
//               Create
//             </Button>
//           </div>
//           <div className="table-bb-gray mt-1 ms-4 me-4"></div>
//           <div className="mt-4"></div>
//           <div className="bg-white table-b-gray rounded-lg">
//             <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead>
//                   <tr className="">
//                     <th className="py-4 px-4 text-left">Video Name</th>
//                     <th className="py-4 px-4 text-left">Language</th>
//                     <th className="py-4 px-4 text-left">Video Topic</th>
//                     <th className="py-4 px-4 text-left">Outro</th>
//                     <th className="py-4 px-4 text-center">GPT Logs</th>
//                     <th className="py-4 px-4 text-center">Word Count</th>
//                     <th className="py-4 px-4 text-center">Script</th>
//                     {/* <th className="py-4 px-4 text-center">Voiceover</th> */}
//                     {/* <th className="py-4 px-4 text-center">Date</th> */}
//                   </tr>
//                 </thead>
//               <tbody>
//                 {LibraryData?.map((row: TableListData,index:number) => {
//                   const { backgroundColor } = generateRandomColors();
//                   return (
//                     <tr
//                       key={row?.id}
//                       className={`border-b leading-3 ${
//                         index !== LibraryData.length - 1 ? "table-bb-gray" : ""
//                       }`}
//                     >
//                       <td className="py-4 px-4 text-center ">
//                         <div className="flex items-center">
//                           <Image
//                             src="/Library.png"
//                             alt="Thumbnail"
//                             width={43}
//                             height={28}
//                             className="mr-2 rounded"
//                           />
//                           {row?.channel.channel}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-center">{row?.model?.model}</td>
//                       <td className="py-4 px-4 text-center">
//                         {row.topic?.topic}
//                       </td>
//                       <td className="py-4 px-4 text-center">{row.outro?.outro}</td>
//                       <td className="py-4 px-4">
//                         <div className="flex justify-center">
//                           <FiDownload />
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-center">
//                         <span
//                           className=" text-center rounded-3xl py-2 px-6"
//                           style={{
//                             backgroundColor: `${backgroundColor}`,
//                           }}
//                         >
//                           {row.wordCount}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex justify-center">
//                           <FiDownload />
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex justify-center">
//                           <FiDownload />
//                         </div>
//                       </td>
//                       {/* <td className="py-4 px-4 text-center">{row.date}</td> */}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             {/* Pagination */}
//             <div className="flex justify-end m-2 gap-1">
//               <button
//                 className={`px-2 py-1 border border-gray-300 rounded-md ${
//                   currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
//                 }`}
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               {startPage > 1 && (
//                 <button className="px-2 py-1 border border-gray-300 rounded-md">
//                   ...
//                 </button>
//               )}
//               {visiblePages.map((page) => (
//                 <button
//                   className={`px-2 py-1 border border-gray-300 rounded-md ${
//                     page === currentPage ? "bg-blue-500 text-white" : ""
//                   }`}
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                 >
//                   {page}
//                 </button>
//               ))}
//               {endPage < totalPagesCount && (
//                 <button className="px-2 py-1 border border-gray-300 rounded-md">
//                   ...
//                 </button>
//               )}
//               <button
//                 className={`px-2 py-1 border border-gray-300 rounded-md ${
//                   currentPage === totalPagesCount
//                     ? "cursor-not-allowed opacity-50"
//                     : ""
//                 }`}
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPagesCount}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };
// export default BrandsLibrary;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const brandsLibrary = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(value, "value::value;;value");

  const router = useRouter();
  const { id } = router.query;
  const handleCardClick = () => {
    router.push(`/brands`);
  };
  return (
    <div>
      <div className="flex items-center justify-between fade-out pb-3">
        <div className="flex items-center">
          <div className="flex items-center ">
            <div onClick={handleCardClick} className="ps-1 pe-1 cursor-pointer">
              <AiOutlineLeft />
            </div>
            <div className="ps-1 pe-1">
              <Image src="/chaneel.png" alt="chnaeel" width={30} height={30} />
            </div>
            <div className="ps-1 pe-1">
              {" "}
              <span>Morning Prayer</span>
            </div>
          </div>
          <Header title="" showSearch={true} searchKeyword="Search" />
        </div>

        {value === 2 ? null : value === 4 ? null : (
          <>
            <Button variant="contained" className="button-black ps-4 pe-4">
              <FiPlus size={25} className="pe-1 ps-1" />
              {value === 0
                ? "Create Script"
                : value === 1
                ? "Add Outro"
                : value === 3
                ? "Video Topic"
                : value === 5
                ? "Add Manager"
                : null}
            </Button>
          </>
        )}
      </div>
      <div className="table-bb-gray mt-1 ms-4 me-4"></div>
      <div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="OverView" {...a11yProps(0)} />
              <Tab label="Outros" {...a11yProps(1)} />
              <Tab label="Language Model" {...a11yProps(2)} />
              <Tab label="Video topics" {...a11yProps(3)} />
              <Tab label="Voice" {...a11yProps(4)} />
              <Tab label="Managers" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div>
              <OverView />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div>
              <Outros />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div>
              <LanguageModel />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div>
              <VideoTopic />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div>
              <Voice />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <div>
              <Managers />
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default brandsLibrary;
