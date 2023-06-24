import React, { useEffect, useState } from "react";
import Header from "@/common/Header/header";
import ChannelAndCategory from "./component/channelcategory";
import Script from "./component/Script";
import Voice from "./component/voice";
import BasicData from "./component/Basicdata";
import Review from "./component/Review";
import { Button } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Job } from "../Types/job.type";
import { useCreateJob } from "@/services/Jobs/hooks/createJob";
import ReviewData from "./component/ReviewData";

const steps = ["CHANNEL", "SCRIPT", "BASIC DATA", "REVIEW"];

const Create = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [ScriptData, setScriptData] = useState<Job>({
    videoTopic: "",
    name: "",
    photoPath: undefined,
    model: "",
    outro: "",
    script: "",
    wordCount: 0,
    voice: "",
    channel: "",
  });

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

  const handleNext = () => {
    let newSkipped = skipped;
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeStep);
    if (activeStep < 4) {
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
      videoTopic: ScriptData.videoTopic ?? undefined,
      name: ScriptData.name ?? undefined,
      photoPath: ScriptData.photoPath ?? undefined,
      model: ScriptData.model ?? undefined,
      outro: ScriptData.outro ?? undefined,
      channel: ScriptData.channel ?? undefined,
    };
    const formdata = new FormData();
    formdata.append("photoPath", data.photoPath as File);
    formdata.append("videoTopic", data.videoTopic as string);
    formdata.append("name", data.name as string);
    formdata.append("model", data.model as string);
    formdata.append("outro", data.outro as string);
    formdata.append("channel", data.channel as string);
    mutate(formdata);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ChannelAndCategory setScriptData={handleStateUpdate} />;
      case 1:
        return <Script setScriptData={handleStateUpdate} />;
      case 2:
        return <BasicData setScriptData={handleStateUpdate} />;
      //   case 3:
      //     return <Voice setScriptData={handleStateUpdate}/>;
      case 3:
        return <Review ScriptData={ScriptData} />;
      case 4:
        return <ReviewData Jobdata={data} ScriptData={ScriptData} />;
    }
  };

  return (
    <>
      <div>
        <Header title="CREATE SCRIPT" />
      </div>
      <div className="table-bb-gray mt-4 mb-4"></div>
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
      <div className="mt-2 mb-2">{renderStepContent(activeStep)}</div>
      {activeStep > 3 && (
        <>
          {isLoading ? <span>Loading</span> : null}
          {isSuccess ? <span>Data is here</span> : null}
        </>
      )}
      <div className="table-bb-gray mt-6 mb-4"></div>
      <div className="flex justify-between mt-6">
        <Button className="text-black" variant="outlined">
          Cancel
        </Button>
        <div className="flex items-center ">
          <Button
            className="text-black ms-2 me-2"
            variant="outlined"
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep > 3 ? (
            <Button
              variant="contained"
              className="button-black ms-2 me-2"
              onClick={handleSubmit}
            >
              Finish
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
        </div>
      </div>
    </>
  );
};

export default Create;
