import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import CustomInput from "./CustomInput"
import UserApi from "../services/UserApi";
import CustomSelect from "./CustomSelect";
import { makeStyles } from '@mui/styles';
import SubmitButton from "./SubmitButton";
export default function Update({user}) {
  const methods = useForm();
  const onSubmit = data => {
      UserApi.update({data})
      console.log(data)
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
           marginTop:"20px"
     },
     '& button':{
       marginBottom:"-40px",
 
   }
     },
   });
   const classes = useStyles();
  console.log(user)
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  return (
    <FormProvider {...methods} > 
     <div className={classes.form}>

    
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomInput label="Email" defaultValue={user.email}   helper="please write a valid email" name="email"/>
        <CustomInput label="Password"  helper="please define a password to user" name="password"/>
        <CustomSelect label="type" defaultValue={user.type} helper="please choose the type" name="type" options={["admin","standard"]}/>
        
        <CustomInput label="username" defaultValue={user.username} helper="please give a unique username" name="username"/>
          <SubmitButton type="submit" >Submit</SubmitButton>
        
      </form>
      </div>
    </FormProvider>
  );
}

