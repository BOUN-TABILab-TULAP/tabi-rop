import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, MenuItem, Select, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import Container from '@mui/material/Container';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import toolsApi from '../services/toolsApi.js';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CustomInput from '../components/CustomInput.js';
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import CustomSelect from '../components/CustomSelect.js';
import GeneralInfo from '../components/GeneralInfo.js';
import InputInfo from '../components/InputInfo.js';
import OutputInfo from '../components/OutputInfo.js';
import GuideInfo from '../components/GuideInfo.js'
import { Palette } from '@mui/icons-material';
import GeneralButton from "../components/GeneralButton"
const steps = [
  'General Information',
  'Define Input',
  'Define Output',
  'Usage Information'
];
const useStyles = makeStyles({
  steps: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  main: {
    padding: "16px"
  }

});
export default function AddTool() {
  const classes = useStyles();
  const theme=useTheme()
  const methods = useForm({
    defaultValues: {
      input_fields_temp: [{ title: "input", type: "sentence", examples: [], json_field: "" }],
      output_fields_temp: [{ title: "output", type: "sentence" }],
    }
  });
  const inputcontroller = useFieldArray({
    control: methods.control,
    name: "input_fields_temp"
  });
  const outputcontroller = useFieldArray({
    control: methods.control,
    name: "output_fields_temp"
  });
  const [toolSubmit, setToolSubmit] = useState(false)

  const onSubmit = async data => {
    console.log(data)
    let input_values = data["input_fields_temp"]
    data["input_fields"]={}
    input_values.map((key, index) => {
      var json_field = key.json_field
      console.log(data)
      data["input_fields"][json_field] =
        {
          "title": key.title,
          "type": key.type,
          "examples": key.examples
        }
    })
    let output_values = data["output_fields_temp"]

    output_values.map((key, index) => {
      var json_field = key.json_field
      console.log(data)
      data["output_fields"][json_field] =
        {
          "title": key.title,
          "type": key.type
        }
    })
    setToolSubmit(true);

    let response = toolsApi.addtool(data)
    setToolSubmit(false);
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const handleNext = async () => {
    const isStepValid = await methods.trigger();
    if (isStepValid && activeStep != steps.length - 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container className={classes.main} component="main" maxWidth="l" >
      <Typography  variant="h5">
        Add your tool to the system
      </Typography>
      <FormProvider {...methods} >
        <form
          onSubmit={methods.handleSubmit(onSubmit)}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box className={classes.steps}>

            {activeStep === 0 && <GeneralInfo />}
            {activeStep === 1 && <InputInfo inputcontroller={inputcontroller} />}
            {activeStep === 2 && <OutputInfo outputcontroller={outputcontroller} />}
            {activeStep === 3 && <GuideInfo />}
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
          >
            <GeneralButton
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
              sx={{ mr: 1 }} >
              Back
            </GeneralButton>
            <Box sx={{ flex: '1 1 auto' }} />
            <GeneralButton  disabled={activeStep === steps.length - 1} onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </GeneralButton>

            <div>
              <GeneralButton   disabled={activeStep !== steps.length - 1} type="submit" >Submit</GeneralButton>
            </div>


          </Box>
        </form>
      </FormProvider>
    </Container>

  );
}