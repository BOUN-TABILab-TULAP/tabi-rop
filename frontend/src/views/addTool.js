import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, MenuItem, Select, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import Container from '@mui/material/Container';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import toolsApi from '../services/toolsApi.js';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
  'General Information',
  'Define Input',
  'Define Output'
];
const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    margin: "10px",
  },
  form: {
    marginTop: "20px",
  },
  textInput: {
  },
  formControl: {
    display: "block !important",
    margin: "10px !important"
  },
  error: {
    color: "red"
  }
});

function _renderStepContent(step, register, classes, errors, inputcontroller, outputcontroller) {
  switch (step) {
    case 0:
      return <div className={classes.form} align="center"><FormControl className={classes.formControl}>
        <Typography variant="h5">General Details</Typography>
        <TextField fullWidth className={classes.textInput}
          type="text"
          label="Git address"
          placeholder=" https://github.com/boun-tabi/BoAT.git"
          helper="please give us the address git repository"
          {...register("gitAddress",
            { required: true }
          )} />
        <Typography className={classes.error}>
          {errors.gitAddress?.type === 'required' && "Git address" + " is required"}
        </Typography>

      </FormControl>
        <FormControl className={classes.formControl}>
          <TextField fullWidth
            className={classes.textInput} type="text"
            label="Name"
            placeholder="Boun Pars"
            helper="please write your tool name"
            {...register("name",
              { required: true }
            )} />
          <Typography className={classes.error}>

            {errors.name?.type === 'required' && "name" + " is required"}
          </Typography>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField fullWidth
            className={classes.textInput} label="enum"
            placeholder="Boun-Pars"
            helper="please write a unique nick for tool"
            fullWidth
            {...register("enum",
              { required: true }
            )}
          />
          <Typography className={classes.error}>

            {errors.enum?.type === 'required' && "enum" + " is required"}
          </Typography>
        </FormControl></div>;
    case 1:
      return <div className={classes.form}><Typography variant="h6" align="center"> Input Definitions</Typography>
        {inputcontroller.fields.map((item, index) => {
          return (<>
            <FormControl className={classes.formControl}  >
              <TextField fullWidth className={classes.textInput} label="json field"
                {...register(`input.${index}.json_field`)} />
            </FormControl>
            <FormControl className={classes.formControl}   >
              <InputLabel >input type</InputLabel>
              <Select fullWidth
                label="input type"
                {...register(`input.${index}.input_type`)}
              >
                <MenuItem value="">
                  <em>Select the type</em>
                </MenuItem>
                <MenuItem value={"sentence"}>Sentence</MenuItem>
                <MenuItem value={"Raw"}>Raw</MenuItem>
                <MenuItem value={"Array"}>Array</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} >
              <TextField fullWidth className={classes.textInput} label="sentence example"
                {...register(`input.${index}.examples`)} />
            </FormControl>
            <Button type="B" onClick={() => inputcontroller.remove(index)}>
              Delete
            </Button>
          </>
          );
        })}
        <Button
          type="button"
          onClick={() => {
            inputcontroller.append({ input_type: "sentence", example: "bugun seker yedim" });
          }}>
          append
        </Button></div>;
    case 2:
      return <div className={classes.form}>
        <Typography variant="h6" align="center"> Output Definitions</Typography>
        {outputcontroller.fields.map((item, index) => {
          return (<>
            <FormControl className={classes.formControl}  >
              <TextField fullWidth className={classes.textInput} label="json field"
                {...register(`output.${index}.json_field`)} />
            </FormControl>
            <FormControl className={classes.formControl}   >
              <InputLabel >output type</InputLabel>
              <Select fullWidth
                label="output type"
                {...register(`output.${index}.output_type`)}
              >
                <MenuItem value="">
                  <em>Select the type</em>
                </MenuItem>
                <MenuItem value={"sentence"}>Sentence</MenuItem>
                <MenuItem value={"Raw"}>Raw</MenuItem>
                <MenuItem value={"Array"}>Array</MenuItem>
              </Select>

            </FormControl>

            <Button type="B" onClick={() => outputcontroller.remove(index)}>
              Delete
            </Button>
            <Button
              type="button"
              onClick={() => {
                outputcontroller.append({ input_type: "sentence", example: "bugun seker yedim" });
              }}>
              append
            </Button>
          </>
          );
        })}</div>;
    default:
      return <div>Not Found</div>;
  }
}
export default function AddTool() {
  const classes = useStyles();
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      input: [{ json_field: "input", input_type: "sentence", example: "bugun ben sinirliyim", }],
      output: [{ json_field: "output", output_type: "sentence" }]
    }
  });
  const inputcontroller = useFieldArray({
    control,
    name: "input"
  });
  const outputcontroller = useFieldArray({
    control,
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

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <Container component="main" maxWidth="l" className={classes.mainContainer}>
      <Typography variant="h5">
        Add your tool to the system
      </Typography>

      <form

        onSubmit={handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel onClick={handleStep(index)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {_renderStepContent(activeStep, register, classes, errors, inputcontroller, outputcontroller)}


        <div>
          <Button type="submit" >Submit</Button>
        </div>
      </form>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} sx={{ mr: 1 }}>
          Next
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: 'inline-block' }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? 'Finish'
                : 'Complete Step'}
            </Button>
          ))}
      </Box>
    </Container>

  );
}