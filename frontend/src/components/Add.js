import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import CustomInput from "./CustomInput"
import UserApi from "../services/UserApi";
export default function App() {
  const methods = useForm();
  const onSubmit = data => {
      UserApi.add({data})
      console.log(data)
  };
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  return (
    <FormProvider {...methods} > 
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomInput label="Email" placeholder=""  helper="please write a valid email" name="email"/>
        <CustomInput label="Password" placeholder="" helper="please define a password to user" name="password"/>
        <CustomInput label="username" placeholder="" helper="please give a unique username" name="username"/>
          <Button type="submit" >Submit</Button>
        
      </form>
    </FormProvider>
  );
}

