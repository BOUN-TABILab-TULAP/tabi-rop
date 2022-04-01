import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, MenuItem, Select, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import Container from '@mui/material/Container';

import { makeStyles } from '@mui/styles';
import toolsApi from '../services/toolsApi.js';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CustomInput from '../components/CustomInput.js';
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import CustomSelect from '../components/CustomSelect.js';
import GeneralInfo from '../components/GeneralInfo.js';
import InputInfo from '../components/InputInfo.js';
import OutputInfo from '../components/OutputInfo.js';
import GuideInfo from '../components/GuideInfo.js'
const steps = [
  'General Information',
  'Define Input',
  'Define Output',
  'Usage Information'
];
const useStyles = makeStyles({
  steps:{
    display:"flex",
    flexDirection:"column",
    width:"100%"
  }
 
});
export default function AddTool() {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      input: [{ json_field: "input", input_type: "sentence", example: "bugun ben sinirliyim", }],
      output: [{ json_field: "output", output_type: "sentence" }]
    }});
  const inputcontroller = useFieldArray({
   control: methods.control,
    name: "input"
  });
  const outputcontroller = useFieldArray({
    control: methods.control,
    name: "output"
  });
  const [toolSubmit, setToolSubmit] = useState(false)

  const onSubmit = async data => {
    console.log(data)
    setToolSubmit(true);
    let response = toolsApi.addtool(data)
    setToolSubmit(false);
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const handleNext = async () => {
    const isStepValid = await methods.trigger();
    if (isStepValid && activeStep!=steps.length-1) setActiveStep((prevActiveStep) => prevActiveStep + 1);  
  };

  return (
    <Container component="main" maxWidth="l" >
      <Typography variant="h5">
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
        
          {activeStep===0&&<GeneralInfo/>}
          {activeStep===1&&<InputInfo inputcontroller={inputcontroller}/>}
          {activeStep===2&&<OutputInfo outputcontroller={outputcontroller} />}
          {activeStep===3&&<GuideInfo/>}
          </Box> 
      <Box
       sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={()=> setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          sx={{ mr: 1 }} >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === steps.length-1} onClick={handleNext} sx={{ mr: 1 }}>
          Next
        </Button>
        
        <div>
            <Button disabled={activeStep !== steps.length-1} type="submit" >Submit</Button>
          </div>

  
      </Box>
      </form>
      </FormProvider>
    </Container>

  );
}