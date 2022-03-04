import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';


export default function CustomSelect({label,placeholder,helper,name,options,defaultValue}) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
  
    return <>
   <FormControl    >
              <InputLabel >{label}</InputLabel>
              <Select fullWidth
                label={label}
                {...register(name)}
                defaultValue={defaultValue}
              >
                <MenuItem value="">
                  <em>{placeholder}</em>
                </MenuItem>
                {options.map((key,index)=>{
                  return <MenuItem value={key}>{key}</MenuItem>
                })} 
              </Select>
            </FormControl>
            </>

  }