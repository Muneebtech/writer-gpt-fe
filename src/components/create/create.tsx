import React, { useEffect, useState } from "react";
import Header from "@/common/Header/header";
import ChannelAndCategory from "./component/channelcategory";
import Script from "./component/Script";
import Voice from "./component/voice";
import BasicData from "./component/Basicdata";
import Review from "./component/Review";
import { Alert, Button, Slide, SlideProps, Snackbar } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Job } from "../Types/job.type";
import { useCreateJob } from "@/services/Jobs/hooks/createJob";
import ReviewData from "./component/ReviewData";
import Spinner from "@/modules/spinner/spinner";
import { useRouter } from "next/router";
import { FiBook } from "react-icons/fi";
import LanguageModel from "./component/LanguageModel";
import Topic from "./component/Topic";
import Outro from "./component/Outro";
import Toaster from "@/common/Toaster/Toaster";
import ScriptSuccessPage from "./component/ScriptSuccessPage";
import ScriptsButtons from "./component/ScriptsButtons";
import LottieSpinner from "@/common/LottifliesSpinner/LottieSpinner";
const steps = [
  "CHANNEL",
  "BASIC",
  "LANGUAGE MODEL",
  "TOPIC",
  "OUTRO",
  // "VOICE",
  "REVIEW",
];

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const initialValue = {
    topic: "",
    name: "",
    photoPath: undefined,
    model: "",
    outro: "",
    script: "",
    wordCount: 0,
    // voice: "",
    channel: "",
  };
  const [ScriptData, setScriptData] = useState<Job>(initialValue);
  const [channelId, setChannelId] = useState<string>("");
  const [showToaster, setShowToaster] = useState("");
  console.log(ScriptData, "ScriptData::ScriptData::ScriptData");
  const [alertMessage, setAlertMessage] = useState("");
  const [Open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dataFlag, setDataFlag] = useState(false);
  const { data, isLoading, isSuccess, mutate } = useCreateJob();
  // Load the active step value from local storage on component mount
  useEffect(() => {
    const storedValue = localStorage.getItem("activeStep");
    if (storedValue) {
      setActiveStep(parseInt(storedValue, 10));
    }
  }, []);
  // Save the active step value to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeStep", activeStep.toString());
  }, [activeStep]);

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   newSkipped = new Set(newSkipped.values());
  //   newSkipped.delete(activeStep);
  //   if (activeStep === 0 && ScriptData?.channel === "") {
  //     <Alert severity="error">Please Add Channel First</Alert>
  //     setActiveStep(0);
  //   } else if (
  //     activeStep === 1 &&
  //     ScriptData?.name === "" &&
  //     ScriptData?.photoPath === undefined
  //   ) {
  //     alert("Please Add Basic data First");
  //     setActiveStep(1);
  //   } else if (activeStep === 2 && ScriptData?.model === "") {
  //     alert("Please Add Model Data First");
  //     setActiveStep(2);
  //   } else if (activeStep === 3 && ScriptData?.topic === "") {
  //     alert("Please Add Topic Data First");
  //     setActiveStep(3);
  //   } else if (activeStep === 4 && ScriptData?.outro === "") {
  //     alert("Please Add Outro Data First");
  //     setActiveStep(4);
  //   } else if (activeStep < 6) {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   }
  //   setSkipped(newSkipped);
  // };
  console.log(activeStep, "activeStep");

  const handleNext = () => {
    let newSkipped = skipped;
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeStep);

    // Your existing validation checks
    if (activeStep === 0 && ScriptData?.channel === "") {
      setActiveStep(0);
      setShowToaster("0");
    } else if (
      activeStep === 1 &&
      (ScriptData?.name === "" || ScriptData?.photoPath === undefined)
    ) {
      setShowToaster("1");
      setActiveStep(1);
    } else if (activeStep === 2 && ScriptData?.model === "") {
      setShowToaster("2");
      setActiveStep(2);
    } else if (activeStep === 3 && ScriptData?.topic === "") {
      setShowToaster("3");
      setActiveStep(3);
    } else if (activeStep === 4 && ScriptData?.outro === "") {
      setShowToaster("4");
      setActiveStep(4);
    } else if (activeStep < 6) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleStateUpdate = (updatedState: Partial<Job>) => {
    setScriptData((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };
  
  const handleSubmit = () => {
    const data = {
      topic: ScriptData.topic ?? undefined,
      name: ScriptData.name ?? undefined,
      photoPath: ScriptData.photoPath ?? undefined,
      model: ScriptData.model ?? undefined,
      outro: ScriptData.outro ?? undefined,
      channel: ScriptData.channel ?? undefined,
    };
    const formdata = new FormData();
    formdata.append("photoPath", data.photoPath as File);
    formdata.append("topic", data.topic as string);
    formdata.append("name", data.name as string);
    formdata.append("model", data.model as string);
    formdata.append("outro", data.outro as string);
    formdata.append("channel", data.channel as string);
    mutate(formdata);
  };
  const handleChannelId = () => {
    setChannelId("");
  };
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ChannelAndCategory
            setScriptData={handleStateUpdate}
            setChannelId={setChannelId}
          />
        );
      case 1:
        return <BasicData setScriptData={handleStateUpdate} />;
      // return <ScriptSuccessPage />;
      // return <ScriptsButtons />;
      // return <Script setScriptData={handleStateUpdate} />;
      case 2:
        return <LanguageModel setScriptData={handleStateUpdate} />;
      case 3:
        return (
          <Topic setScriptData={handleStateUpdate} channelId={channelId} />
        );
      case 4:
        return (
          <Outro setScriptData={handleStateUpdate} channelId={channelId} />
        );
      // case 5:
      //   return <Voice setScriptData={handleStateUpdate} />;
      case 5:
        return <Review ScriptData={ScriptData} />;
      case 6:
        return (
          <ReviewData
            isLoading={isLoading}
            isSuccess={isSuccess}
            Jobdata={data}
            ScriptData={ScriptData}
            setScriptData={handleStateUpdate}
          />
        );
    }
  };
  const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="left" />;
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      setDataFlag(true);
    }
  }, [isSuccess]);
  return (
    <div>
      {showToaster === "0" && (
        <>
          <Toaster
            Color="red"
            Error={true}
            title="Error: Please Select the Channel First"
          />
        </>
      )}
      {showToaster === "1" && (
        <>
          <Toaster
            Color="red"
            Error={true}
            title="Error: Please Add Basic Data First"
          />
        </>
      )}
      {showToaster === "2" && (
        <>
          <Toaster
            Color="red"
            Error={true}
            title="Error: Please Select Language Model First"
          />
        </>
      )}
      {showToaster === "3" && (
        <>
          <Toaster
            Color="red"
            Error={true}
            title="Error: Please Select Topic First"
          />
        </>
      )}
      {showToaster === "4" && (
        <>
          <Toaster
            Color="red"
            Error={true}
            title="Error: Please Add Outro First"
          />
        </>
      )}

      <div className="mb-2 mt-1">
        <Header title="CREATE SCRIPT" />
      </div>
      <Snackbar
        open={Open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Script Generated Succsesfully!
        </Alert>
      </Snackbar>
      <div className="table-bb-gray mt-3 mb-3"></div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {} = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="mt-1 mb-1">{renderStepContent(activeStep)}</div>
      {/* {activeStep > 3 && <>{isLoading ? <LottieSpinner />  : null}</>} */}
      <div className="btn-postion">
        <div className="table-bb-gray mt-3 mb-3"></div>
        <div className="flex justify-between mt-3">
          <Button
            onClick={() => {
              setScriptData(initialValue);
              setActiveStep(0);
              setDataFlag(false);
            }}
            className="text-black ms-2 me-2"
            variant="outlined"
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2 ">
            {dataFlag ? (
              <Button
                className="text-black ms-2 me-2"
                variant="outlined"
                onClick={() => router.push("/library")}
              >
                <FiBook /> <span className="ml-2">Library</span>
              </Button>
            ) : (
              <>
                {activeStep > 0 && (
                  <Button
                    className="text-black ms-2 me-2"
                    variant="outlined"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                {activeStep > 5 ? (
                  <Button
                    variant="contained"
                    className="button-black ms-2 me-2"
                    onClick={handleSubmit}
                  >
                    Generate
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="button-black ms-2 me-2"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
