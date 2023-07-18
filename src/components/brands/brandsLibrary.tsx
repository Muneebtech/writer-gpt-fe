import Header from "@/common/Header/header";
import { tableData, TableListData } from "@/constants/library";
import Spinner from "@/modules/spinner/spinner";
import { useGetJobs } from "@/services/Jobs";
import { useGetChannelById } from "@/services/channel";
import { useGetBrandsJobs } from "@/services/channel/hooks/channelJobs";
import { generateRandomColors } from "@/utils/randomColor";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiDownload, FiPlus } from "react-icons/fi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OverView from "./BrandsTabPane/OverView";
import Outros from "./BrandsTabPane/Outros";
import LanguageModel from "./BrandsTabPane/languageModel";
import VideoTopic from "./BrandsTabPane/VideoTopic";
import Voice from "./BrandsTabPane/Voice";
import Managers from "./BrandsTabPane/Managers";
import BrandsModal from "./BrandsModal";
import { useGetOutro } from "@/services/outro";
import { outroDataTypes } from "../Types/Outro.type";
import { useAddTopic, useTopic } from "@/services/topic";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import { UseAddManagers, UseGetManagers } from "@/services/managers";
import { ManagerType } from "../Types/manager.type";
import { useAddOutro } from "@/services/outro/hooks/AddOutro";
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
  // Edit Delete Popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const {
    data: ManagerData,
    isLoading: ManagerLoading,
    isSuccess,
  } = UseGetManagers();

  const [managerDataList, setManagerDataList] = useState<ManagerType[]>(
    ManagerData?.results || []
  );
  console.log(managerDataList, "ManagerData::Parant");
  const [addNewManagerData, setAddNewManagerData] = useState<ManagerType>({
    id: "0",
    active: true,
    firstName: "",
    email: "",
    photoPath: "",
    role: "",
    lastName: "",
  });
  const { data, mutate } = UseAddManagers();

  const handleAddManagersList = () => {
    const addNewManager = [...managerDataList, addNewManagerData];
    setManagerDataList(addNewManager);
    setAddNewManagerData({
      id: (parseInt(addNewManagerData.id) + 1).toString(),
      active: true,
      firstName: "",
      email: "",
      photoPath: "",
      role: "",
      lastName: "",
    });
    mutate(addNewManagerData);
  };

  const handleAddManagerDataLists = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddNewManagerData({
      ...addNewManagerData,
      firstName: event.target.value,
      email: event.target.value,
      active: event.target.value === "true",
    });
  };
  useEffect(() => {
    if (ManagerData) {
      setManagerDataList(ManagerData?.results);
    }
  }, [ManagerData]);
  // creating Video Topic //
  const {
    data: AddTopic,
    isLoading: AddTopicLoading,
    isSuccess: AddTopicSuccess,
    mutate: AddTopicMutate,
  } = useAddTopic();
  const { data: topicData, isLoading } = useTopic();
  const [topicDataList, setTopicList] = useState<Topic[]>(topicData || []);
  const [addNewTopicVideo, setAddNewTopicVideo] = useState({
    topic: "",
  });
  const handleAddNewVideoTopic = () => {
    const AddNewTopicVideo = [...topicDataList, addNewTopicVideo];
    setTopicList(AddNewTopicVideo);
    setAddNewTopicVideo({
      topic: "",
    });
    AddTopicMutate(addNewTopicVideo);
  };
  const handleAddTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewTopicVideo({
      ...addNewTopicVideo,
      topic: event.target.value,
    });
  };
  useEffect(() => {
    if (topicData) {
      setTopicList(topicData);
    }
  }, [topicData]);
  const handleClearTextField = () => {
    setAddNewTopicVideo({ ...addNewTopicVideo, topic: "" });
  };
  //creating Outro
  const { data: OutrosData, mutate: PostOutros } = useAddOutro();
  const { data: Outrodata, isLoading: outroLoading } = useGetOutro();
  const [OutroDataList, setOutroDataList] = useState<outroDataTypes[]>(
    Outrodata || []
  );
  const [newOutroData, setNewOutroData] = useState({
    description: "",
  });

  const HandleAddOutro = () => {
    if (newOutroData?.description.trim() !== "") {
      const AddNewOutro: outroDataTypes = {
        ...newOutroData,
        description: "",
      };

      setOutroDataList([...OutroDataList, AddNewOutro]);
      setNewOutroData({
        description: "",
      });

      PostOutros(newOutroData);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOutroData({ ...newOutroData, description: event.target.value });
  };
  useEffect(() => {
    if (Outrodata) {
      setOutroDataList(Outrodata);
    }
  }, [Outrodata]);

  // Creating Outro
  // modal States Manage
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;
  const handleCardClick = () => {
    router.push(`/brands`);
  };

  // clear Input Feild When New Data Add
  const handleClearTextFieldData = () => {
    setAddNewTopicVideo({ ...addNewTopicVideo, topic: "" }),
      setNewOutroData({ ...newOutroData, description: "" });
  };
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  const FilteredComponents = useMemo(() => {
    let filteredData = OutroDataList?.filter((item) => {
      return item.description
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });

    return {
      FilterData: filteredData,
    };
  }, [OutroDataList, searchKeyword]);
  const TopicDataFilter = useMemo(() => {
    if (!searchKeyword) {
      return topicDataList;
    }

    return topicDataList?.filter((item) => {
      return item.topic.toLowerCase().includes(searchKeyword.toLowerCase());
    });
  }, [topicDataList, searchKeyword]);
  const handlePopoverOpen = (id: string) => {
    console.log(id, "POpOVerIcClick");
    setIsPopoverOpen(true);
    setOpenPopover(id)
  };
  return (
    <div>
      <BrandsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        value={value}
        HandleAddOutro={HandleAddOutro}
        handleInputChange={handleInputChange}
        handleAddNewVideoTopic={handleAddNewVideoTopic}
        handleAddTopic={handleAddTopic}
        handleClearTextFieldData={handleClearTextFieldData}
        handleAddManagerDataLists={handleAddManagerDataLists}
        handleAddManagersList={handleAddManagersList}
      />
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
          <Header
            title=""
            showSearch={true}
            searchKeyword="Search"
            onSearch={handleSearch}
          />
        </div>
        {value === 2 ? null : value === 4 ? null : (
          <>
            <Button
              onClick={() => {
                value === 1
                  ? handleOpenModal()
                  : value === 3
                  ? handleOpenModal()
                  : value === 5
                  ? handleOpenModal()
                  : null;
              }}
              variant="contained"
              className="button-black ps-4 pe-4"
            >
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
              <Outros
                data={OutroDataList}
                FilterData={FilteredComponents.FilterData}
                setIsPopoverOpen={setIsPopoverOpen}
                isPopoverOpen={isPopoverOpen}
                popoverAnchorEl={popoverAnchorEl}
                handlePopoverOpen={handlePopoverOpen}
                openPopover={openPopover}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div>
              <LanguageModel />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div>
              <VideoTopic
                data={topicDataList}
                TopicFilterData={TopicDataFilter}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div>
              <Voice />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <div>
              <Managers managerDataList={managerDataList} />
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default brandsLibrary;
