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
import BrandsModal from "./modals/BrandsModal";
import { useGetOutro } from "@/services/outro";
import { outroDataTypes } from "../Types/Outro.type";
import { useAddTopic, useTopic } from "@/services/topic";
import { Topic, TopicData, TopicModalData } from "@/constants/Topic";
import { UseAddManagers, UseGetManagers } from "@/services/managers";
import { ManagerType } from "../Types/manager.type";
import { useAddOutro } from "@/services/outro/hooks/AddOutro";
import EditBrands from "./EditBrands";
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
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLDivElement | null>(
    null
  );
  const [isPopoverOpenTopic, setIsPopoverOpenTopic] = useState(false);
  const [popoverAnchorElTopic, setpopoverAnchorElTopic] =
    useState<HTMLDivElement | null>(null);
  const [openPopover, setOpenPopover] = useState<string>("");
  const [openPopoverTopic, setopenPopoverTopic] = useState<string>("");
  const {
    data: ManagerData,
    isLoading: ManagerLoading,
    isSuccess,
  } = UseGetManagers();

  const [managerDataList, setManagerDataList] = useState<ManagerType[]>(
    ManagerData || []
  );

  const [addNewManagerData, setAddNewManagerData] = useState<ManagerType>({
    id: "0",
    status: true,
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
      status: true,
      firstName: "",
      email: "",
      photoPath: "",
      role: "",
      lastName: "",
    });
    mutate({ email: addNewManagerData.email });
  };

  const handleAddManagerDataLists = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddNewManagerData({
      ...addNewManagerData,
      firstName: event.target.value,
      email: event.target.value,
      status: event.target.value === "true",
    });
  };
  useEffect(() => {
    if (ManagerData) {
      setManagerDataList(ManagerData);
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
    setTopicList(AddNewTopicVideo as any);
    setAddNewTopicVideo({
      topic: "",
    });
    AddTopicMutate(addNewTopicVideo as any);
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
  const [showdeleteOutroModal, setdeleteOutroModal] = useState(false);
  const [showTopicDeleteModal, setshowTopicDeleteModal] = useState(false);
  const [OutroDataList, setOutroDataList] = useState<outroDataTypes[]>(
    Outrodata || []
  );
  const [newOutroData, setNewOutroData] = useState({
    description: "",
  });

  const handleTopicDeleteModalopen = (id: string) => {
    setshowTopicDeleteModal(true);
  };
  const handleTopicDeleteModalclose = () => {
    setshowTopicDeleteModal(false);
  };

  const HandleDeleteModal = (id: string) => {
    if (id) {
      setdeleteOutroModal(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setdeleteOutroModal(false);
  };
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTopicData, setEditTopicData] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenEditModal = (id: string, description: outroDataTypes) => {
    setOpenEditModal(true);
    setEditTopicData;
  };
  const handleCloseEditodal = () => {
    setOpenEditModal(false);
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
    let filteredData = OutroDataList?.filter(item => {
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

    return topicDataList?.filter(item => {
      return item.topic.toLowerCase().includes(searchKeyword.toLowerCase());
    });
  }, [topicDataList, searchKeyword]);
  // handlers for Outro
  const handlePopoverOpen = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setIsPopoverOpen(true);
    setPopoverAnchorEl(event.currentTarget);
    setOpenPopover(id);
  };

  const handleEditOutro = (id: string) => {
    console.log(id, "id::IDD:IIDD");
  };

  const {
    isLoading: channelLoading,
    data: channelData,
    mutate: channelMutate,
  } = useGetChannelById();

  useEffect(() => {
    if (id) {
      channelMutate(id as string);
    }
  }, [id, channelMutate]);
  // handlers For Topic

  const handlePopoverOpenTopic = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setIsPopoverOpenTopic(true);
    setPopoverAnchorEl(event.currentTarget);
    setopenPopoverTopic(id);
  };

  const handleEditTopic = (id: string) => {
    console.log(id, "id::IDD:IIDD");
  };
  return (
    <div>
      <EditBrands
        openEditModal={openEditModal}
        handleCloseEditodal={handleCloseEditodal}
        value={value}
      />
      {/* Modals */}
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
              <span>{channelData?.channel}</span>
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
                handleOpenEditModal={handleOpenEditModal}
                showdeleteOutroModal={showdeleteOutroModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
                HandleDeleteModal={HandleDeleteModal}
                data={OutroDataList}
                FilterData={FilteredComponents.FilterData}
                setIsPopoverOpen={setIsPopoverOpen}
                isPopoverOpen={isPopoverOpen}
                popoverAnchorEl={popoverAnchorEl}
                handlePopoverOpen={handlePopoverOpen}
                openPopover={openPopover}
                handleEditOutro={handleEditOutro}
                outroLoading={outroLoading}
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
                openPopoverTopic={openPopoverTopic}
                setIsPopoverOpenTopic={setIsPopoverOpenTopic}
                isPopoverOpenTopic={isPopoverOpenTopic}
                popoverAnchorElTopic={popoverAnchorElTopic}
                handleTopicDeleteModalopen={handleTopicDeleteModalopen}
                handleTopicDeleteModalclose={handleTopicDeleteModalclose}
                showTopicDeleteModal={showTopicDeleteModal}
                data={topicDataList}
                TopicFilterData={TopicDataFilter}
                handlePopoverOpenTopic={handlePopoverOpenTopic}
                openPopover={openPopover}
                handleEditTopic={handleEditTopic}
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
