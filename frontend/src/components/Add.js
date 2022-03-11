import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import CustomInput from "./CustomInput"
import { makeStyles } from '@mui/styles';
import UserApi from "../services/UserApi";
import SubmitButton from "./SubmitButton";
export default function App() {
  const methods = useForm();
  const onSubmit = async data => {
     const response= await UserApi.add({user:data})
     if(response.success){
       window.alert("success")
     }
     else{
       window.alert(response.message)
     }

      
  };
  
  const useStyles = makeStyles({
   form: {
      display: "flex !important",
      flexDirection: "column !important",
      alignItems: 'flex-start',
   
      width:"100%",
      '& div':{
          display:"block",
          width:"500px",
          marginBottom:"30px",
    },
    '& button':{
      marginBottom:"-40px",

  }
    },
  });
  const classes = useStyles();
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  return (
      <>
     
     
    <FormProvider {...methods} >
        <div className={classes.form}>
            
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomInput label="Email" placeholder=""  helper="please write a valid email" name="email"/>
        <CustomInput label="Password" placeholder="" helper="please define a password to user" name="password"/>
        <CustomInput label="username" placeholder="" helper="please give a unique username" name="username"/>
          <SubmitButton type="submit" >Submit</SubmitButton>
        
      </form>
      </div> 
    </FormProvider>
    </>
  );
}

