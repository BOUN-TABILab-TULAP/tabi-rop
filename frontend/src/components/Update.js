import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import CustomInput from "./CustomInput"
import UserApi from "../services/UserApi";
import CustomSelect from "./CustomSelect";
export default function Update({chosen}) {
  const methods = useForm();
  const onSubmit = data => {
      console.log(chosen)
      UserApi.update({data})
      console.log(data)
  };
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  return (
    <FormProvider {...methods} > 
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomInput label="Email" placeholder=""  helper="please write a valid email" name="email"/>
        <CustomInput label="Password" placeholder="" helper="please define a password to user" name="password"/>
        <CustomSelect label="type" placeholder="" helper="please choose the type" name="type" options={["admin","standard"]}/>
        
        <CustomInput label="username" placeholder="" helper="please give a unique username" name="username"/>
          <Button type="submit" >Submit</Button>
        
      </form>
    </FormProvider>
  );
}

