import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  input:{
   marginBottom:"10px !important",
   width:"100%"
    
  },
  
 
});

export default function CustomSelect({label,placeholder,helper,name,options,defaultValue}) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
    const classes=useStyles()
    return <>
   <FormControl className={classes.input} >
              <InputLabel >{label}</InputLabel>
              <Select fullWidth
                 
                label={label}
                {...register(name)}
                defaultValue={defaultValue}
              >
                <MenuItem value="">
                  <em>{placeholder}</em>
                </MenuItem>
                {Object.keys(options).map((key,index)=>{
                  return <MenuItem  key={index} value={key}>{key}</MenuItem>
                })} 
              </Select>
            </FormControl>
            </>

  }