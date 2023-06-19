import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Header from "@/common/Header/header"
import ChannelAndCategory from "./component/channelcategory"
import Script from "./component/Script"
import Voice from "./component/voice"
import BasicData from "./component/Basicdata"
import Review from "./component/Review"
import { Button} from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
    'CHANNEL AND CATEGORY',
    'SCRIPT',
    'VOICE',
    'BASIC DATA',
    'REVIEW',
];

const Create = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    // Load the active step value from local storage on component mount
    useEffect(() => {
        const storedValue = localStorage.getItem('activeStep');
        if (storedValue) {
            setActiveStep(parseInt(storedValue, 10));
        }
    }, []);
    // Save the active step value to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('activeStep', activeStep.toString());
    }, [activeStep]);

    const handleNext = () => {
        let newSkipped = skipped;
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        if (activeStep < 5) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ChannelAndCategory />;
            case 1:
                return <Script />;
            case 2:
                return <Voice />;
            case 3:
                return <BasicData />;
            case 4:
                return <Review />;
            case 5:
                return <Review />;
        }
    };
    return (
        <>
            <div>
                <Header title="CREATE SCRIPT AND VOICEOVER" />
            </div>
            <div className="table-bb-gray mt-4 mb-4">
            </div>
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
            <div className="mt-2 mb-2">
                {renderStepContent(activeStep)}
            </div>
            <div className="table-bb-gray mt-6 mb-4">
            </div>
            <div className="flex justify-between mt-6">
                <Button className="text-black"
                    variant="outlined">
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
                    <Button variant="contained"
                        className="button-black ms-2 me-2" onClick={handleNext}>
                        {activeStep > 4 ? "Finish" : "Next"}
                    </Button>
                </div>
            </div>

        </>
    )
}
export default Create