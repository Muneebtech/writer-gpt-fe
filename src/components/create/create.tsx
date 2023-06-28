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

const steps = ["CHANNEL", "SCRIPT", "BASIC DATA", "REVIEW"];

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
    voice: "",
    channel: "",
  };
  const [ScriptData, setScriptData] = useState<Job>(initialValue);
  const [Open, setOpen] = useState(false);
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
  const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="left" />;
  };
  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      setDataFlag(true);
    }
  }, [isSuccess]);
  useEffect(() => {}, []);
  return (
    <div>
      <div>
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
      {activeStep > 3 && <>{isLoading ? <Spinner></Spinner> : null}</>}
      <div className="btn-postion">
        <div className="table-bb-gray mt-6 mb-4"></div>
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
          {}
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
                {activeStep > 3 ? (
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
