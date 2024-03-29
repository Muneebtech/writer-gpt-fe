import Header from "@/common/Header/header";
import { useGetChannelById } from "@/services/channel";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import { useAddTopic, useTopic, useUpdateTopic } from "@/services/topic";
import { Topic } from "@/constants/Topic";
import { UseAddManagers, UseGetManagers } from "@/services/managers";
import { ManagerType } from "../Types/manager.type";
import { useAddOutro } from "@/services/outro/hooks/AddOutro";
import EditBrands from "./EditBrands";
import { useUpdateOutro } from "@/services/outro/hooks/useUpdateOutro";
import { decryptData } from "@/utils/localStorage";
import Toaster from "@/common/Toaster/Toaster";
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
        <Box sx={{ padding: 3 }}>
          <span>{children}</span>
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
  const [IsAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const userData = decryptData("userdata");
    if (userData.role === "Admin") {
      setIsAdmin(true);
    }
  }, []);
  const [channelId, setChannelId] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const {
    isLoading: channelLoading,
    data: channelData,
    mutate: channelMutate,
  } = useGetChannelById();

  useEffect(() => {
    if (id) {
      channelMutate(id as string);
      outroMutate({ channel: id as any });
      mutateTopic({ channel: id as any });
      managersMutate({ channelId: id as any });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
    }
  });
  useEffect(() => {
    if (channelData) {
      setChannelId(channelData?.id);
    }
  }, [channelData]);

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
    isLoading: ManagerLoadings,
    isSuccess,
    mutate: managersMutate,
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
  const {
    data,
    mutate,
    isLoading: ManagerLoading,
    isSuccess: managerSuccess,
  } = UseAddManagers();
  const [textValue, setTextValue] = useState({
    topic: "",
    outro: "",
    id: "",
    managers: "",
    topicDescripition: "",
  });

  const handleAddManagersList = () => {
    const addNewManager = [...managerDataList, addNewManagerData];
    setManagerDataList(addNewManager);
    if (addNewManagerData.email === "") {
      setshowErrorManager(true);
    } else if (addNewManagerData.email !== "") {
      setAddNewManagerData({
        id: (parseInt(addNewManagerData.id) + 1).toString(),
        status: true,
        firstName: "",
        email: "",
        photoPath: "",
        role: "",
        lastName: "",
      });
      mutate({ email: addNewManagerData.email, id: id });
    }
  };

  const handleAddManagerDataLists = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const SearchValues = event.target.value;
    if (SearchValues) {
      setshowErrorManager(false);
    }
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

  // creating  Topic //
  const {
    data: AddTopic,
    isLoading: TopicLoading,
    isSuccess: AddTopicSuccess,
    mutate: AddTopicMutate,
  } = useAddTopic();
  const {
    mutate: mutateUpdateTopic,
    isLoading: updateTopicLoading,
    isSuccess: updateTopicSuccess,
  } = useUpdateTopic();

  const {
    mutate: mutateUpdateOutro,
    isSuccess: OutroUpdateSuccess,
    isLoading: OutroUpdateLoading,
  } = useUpdateOutro();
  const {
    data: topicData,
    isLoading: topicLoading,
    mutate: mutateTopic,
  } = useTopic();
  const [topicDataList, setTopicList] = useState<Topic[]>(topicData || []);
  const [addNewTopicVideo, setAddNewTopicVideo] = useState({
    description: "",
    topic: "",
  });
  const handleAddNewVideoTopic = () => {
    if (addNewTopicVideo.topic === "" || addNewTopicVideo.description === "") {
      setShowErrorTopic(true);
    } else if (addNewTopicVideo.topic !== "") {
      const AddNewTopicVideo = [...topicDataList, addNewTopicVideo];
      setTopicList(AddNewTopicVideo as any);
      setAddNewTopicVideo({
        description: "",
        topic: "",
      });
      AddTopicMutate({
        topic: addNewTopicVideo.topic,
        description: addNewTopicVideo.description,
        channel: id as any,
      });
    }
  };
  const handleAddTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const SearchValues = event.target.value;
    if (SearchValues) {
      setShowErrorTopic(false);
    }
    setAddNewTopicVideo((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };
  const handleUpdateVideoTopic = () => {
    mutateUpdateTopic(textValue as any);
  };

  useEffect(() => {
    if (topicData) {
      setTopicList(topicData);
    }
  }, [topicData]);

  //creating Outro
  const {
    mutate: PostOutros,
    isLoading: OutroLoading,
    isSuccess: outroSuccess,
  } = useAddOutro();
  const {
    data: Outrodata,
    isLoading: outroLoading,
    mutate: outroMutate,
  } = useGetOutro();
  const [showdeleteOutroModal, setdeleteOutroModal] = useState(false);
  const [showTopicDeleteModal, setshowTopicDeleteModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorTopic, setShowErrorTopic] = useState(false);
  const [showErrorManager, setshowErrorManager] = useState(false);

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
    if (newOutroData.description === "") {
      setShowError(true);
    } else if (newOutroData?.description.trim() !== "") {
      PostOutros({
        description: newOutroData.description,
        channel: channelId as any,
      });
      setNewOutroData({
        description: "",
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: number,
    text: string
  ) => {
    const SearchValues = event.target.value;
    if (SearchValues) {
      setShowError(false);
    }

    if (text === "edit") {
      switch (value) {
        case 1:
          setTextValue({ ...textValue, outro: event.target.value });
          break;
        case 3:
          setTextValue({
            ...textValue,
            topic: SearchValues,
          });
          break;
        case 4:
          setTextValue({
            ...textValue,
            topicDescripition: SearchValues,
          });
      }
    }
    if (text === "add") {
      switch (value) {
        case 1:
          setNewOutroData({ ...newOutroData, description: event.target.value });

          break;
        case 3:
          setAddNewTopicVideo({
            ...addNewTopicVideo,
            description: event.target.value,
          });
          break;
        case 5:
          setAddNewManagerData({
            ...addNewManagerData,
            email: event.target.value,
          });
          break;

        default:
          break;
      }
    }
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
  const [closePopOver, setClosePopOver] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenEditModal = (description: outroDataTypes) => {
    setOpenEditModal(true);
  };
  const handleCloseEditodal = () => {
    setOpenEditModal(false);
  };

  const handleOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleCardClick = () => {
    router.push(`/brands`);
  };

  // clear Input Feild When New Data Add
  const handleClearTextFieldData = () => {
    setAddNewTopicVideo({ ...addNewTopicVideo, description: "" }),
      setNewOutroData({ ...newOutroData, description: "" });
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const FilteredComponents = useMemo(() => {
    let filteredData = OutroDataList?.filter((item) => {
      return item.description
        ?.toLowerCase()
        ?.includes(searchKeyword?.toLowerCase());
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
      return item.topic?.toLowerCase().includes(searchKeyword?.toLowerCase());
    });
  }, [topicDataList, searchKeyword]);

  // handlers for Outro
  const handlePopoverOpen = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>,
    data: any
  ) => {
    setIsPopoverOpen(true);
    setPopoverAnchorEl(event.currentTarget);
    setOpenPopover(id);
    setTextValue({ ...textValue, outro: data.description, id: data.id });
  };

  const handleUpdateOutro = () => {
    mutateUpdateOutro(textValue as any);
  };

  const handlePopoverOpenTopic = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>,
    data: any
  ) => {

    setIsPopoverOpenTopic(true);
    setpopoverAnchorElTopic(event.currentTarget);
    setopenPopoverTopic(id);
    setTextValue({
      ...textValue,
      topic: data.description,
      id: data.id,
      topicDescripition: data.topic,
    });
    // setTextValue({ ...textValue, topicDescripition: data.topic, id: data.id });
  };

  const handleEditTopic = (id: string) => {
    setOpenEditModal(true);
  };
  useEffect(() => {
    if (outroSuccess) {
      handleCloseModal();
    }
    if (AddTopicSuccess) {
      handleCloseModal();
    }
    if (managerSuccess) {
      handleCloseModal();
    }
  }, [outroSuccess, AddTopicSuccess, managerSuccess]);

  useEffect(() => {
    if (updateTopicSuccess) {
      handleCloseEditodal();
    }
    if (OutroUpdateSuccess) {
      handleCloseEditodal();
    }
  }, [updateTopicSuccess, OutroUpdateSuccess]);
  const src = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${channelData?.photoPath}`;
  const ClosePopOver = () => {
    setClosePopOver(false);
  };
  const handleOpenPopOver = () => {
    setClosePopOver(true);
  };
  const HandleCreateScript = () => {
    if (channelData) {
      router.push({
        pathname: "/script/create",
        query: { data: JSON.stringify(channelData) },
      });
    }
  };
  return (
    <div>
      <EditBrands
        ClosePopOver={ClosePopOver}
        updateTopicLoading={updateTopicLoading}
        OutroUpdateLoading={OutroUpdateLoading}
        openEditModal={openEditModal}
        handleCloseEditodal={handleCloseEditodal}
        value={value}
        handleUpdateVideoTopic={handleUpdateVideoTopic}
        handleUpdateOutro={handleUpdateOutro}
        handleAddManagersList={handleAddManagersList}
        handleClearTextFieldData={handleClearTextFieldData}
        handleInputChange={handleInputChange}
        textValue={textValue}
      />
      {/* Modals */}
      <BrandsModal
        showErrorManager={showErrorManager}
        showErrorTopic={showErrorTopic}
        ManagerLoading={ManagerLoading}
        TopicLoading={TopicLoading}
        OutroLoading={OutroLoading}
        addNewTopicVideo={addNewTopicVideo}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        value={value}
        showError={showError}
        HandleAddOutro={HandleAddOutro}
        handleInputChange={handleInputChange}
        handleAddNewVideoTopic={handleAddNewVideoTopic}
        handleAddTopic={handleAddTopic}
        handleClearTextFieldData={handleClearTextFieldData}
        handleAddManagerDataLists={handleAddManagerDataLists}
        handleAddManagersList={handleAddManagersList}
      />
      {/* Toasters */}
      {outroSuccess ? (
        <>
          <Toaster
            Success={true}
            Color="green"
            title="Outro Created SuccessFully"
          />
        </>
      ) : null}
      {AddTopicSuccess ? (
        <>
          <Toaster
            Success={true}
            Color="green"
            title="Topic Created SuccessFully"
          />
        </>
      ) : null}
      {managerSuccess ? (
        <>
          <Toaster
            Success={true}
            Color="green"
            title="mannager Created SuccessFully"
          />
        </>
      ) : null}
      {updateTopicSuccess ? (
        <>
          {" "}
          <Toaster
            Success={true}
            Color="green"
            title="Topic Update SuccessFully"
          />
        </>
      ) : null}
      {OutroUpdateSuccess ? (
        <>
          {" "}
          <Toaster
            Success={true}
            Color="#00cc00f"
            title="Outro Update SuccessFully"
          />
        </>
      ) : null}

      <div className="flex items-center justify-between fade-out pb-3">
        <div className="flex items-center">
          <div className="flex items-center ">
            <div onClick={handleCardClick} className="ps-1 pe-1 cursor-pointer">
              <AiOutlineLeft />
            </div>
            <div className="ps-1 pe-1">
              <Image
                width={50}
                height={50}
                className="w-8 h-8 rounded-full mr-1"
                alt="Profile"
                src={
                  channelData?.photoPath !==
                  "http://localhost:3000/uploads/null"
                    ? src
                    : "/channel.jpg"
                }
                loader={() =>
                  channelData?.photoPath !==
                  "http://localhost:3000/uploads/null"
                    ? src
                    : "/channel.jpg"
                }
              />
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
        {value === 2 ? null : value === 4 ? null : IsAdmin === false ? null : (
          <div>
            <Button
              suppressHydrationWarning={true}
              onClick={() => {
                if (value === 0) {
                  HandleCreateScript();
                }
                if (value === 1) {
                  handleOpenModal();
                }
                if (value === 3) {
                  handleOpenModal();
                }
                if (value === 5) {
                  handleOpenModal();
                }
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
          </div>
        )}
      </div>
      <div className="table-bb-gray mt-1 ms-4 me-4"></div>
      <div>
        {id ? (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleOnChange}
                aria-label="basic tabs example"
              >
                <Tab label="OverView" {...a11yProps(0)} />
                <Tab label="Outros" {...a11yProps(1)} />
                <Tab label="Language Model" {...a11yProps(2)} />
                <Tab label="Video topics" {...a11yProps(3)} />
                <Tab label="Voice" {...a11yProps(4)} />
                {IsAdmin ? (
                  <Tab
                    suppressHydrationWarning={true}
                    label="Managers"
                    {...a11yProps(5)}
                  />
                ) : null}
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
                  handleOpenPopOver={handleOpenPopOver}
                  closePopOver={closePopOver}
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
                  ClosePopOver={ClosePopOver}
                  closePopOver={closePopOver}
                  handleOpenPopOver={handleOpenPopOver}
                  topicLoading={topicLoading}
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
        ) : null}
      </div>
    </div>
  );
};

export default brandsLibrary;
