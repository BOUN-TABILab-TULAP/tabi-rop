import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';


export default function CustomSelect({label,placeholder,helper,name,options}) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
  
    return <>
   <FormControl    >
              <InputLabel ></InputLabel>
              <Select fullWidth
                label={label}
                {...register(name)}
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