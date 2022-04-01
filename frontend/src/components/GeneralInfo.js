
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from '../components/CustomInput.js';
import CustomTextArea from '../components/CustomTextArea.js';
const useStyles = makeStyles({
    step:{
      display:"flex",
      flexDirection:"column",
      width:"100%",
      
    },
    header:{
        marginBottom:"20px !important",
        marginTop:"20px !important"
    }

   
  });
const formList = [
    {
        label: "Git address",
        placeholder: "https://github.com/boun-tabi/BoAT.git",
        helper: "please give us the address git repository",
        name: "gitAddress",
        required: true
    },
    {
        label: "Name",
        placeholder: "Boun Pars",
        helper: "please write your tool name",
        name: "name",
        required: true
    },
    {
        label: "enum",
        placeholder: "Boun-Pars",
        helper: "please write a unique nick for tool",
        name: "enum",
        required: true
    },
    {
        label: "Description",
        placeholder: "description",
        helper: "please write a description for your tool",
        name: "description",
        required: true
    },

]

export default function GeneralInfo(inputcontroller, outputcontroller) {
    const classes=useStyles()
    return <div  align="center">

        <Typography variant="h5" className={classes.header}>General Details</Typography>
        <Box className={classes.step}>

      

            <CustomInput {...formList[0]}></CustomInput>
            <CustomInput {...formList[1]}></CustomInput>
            <CustomInput {...formList[2]}></CustomInput>
            <CustomTextArea {...formList[3]}></CustomTextArea>
            </Box>
      
    </div>

}