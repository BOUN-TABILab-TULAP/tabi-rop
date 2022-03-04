import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';


export default function CustomInput({label,placeholder,helper,name,defaultValue}) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
   
    return <>
   
          <FormControl  >
            <TextField 
            fullWidth
               type="text"
              label={label}
              placeholder={placeholder}
              defaultValue={defaultValue}
              helper={helper}
              {...register(name,
                { required: true }
              )} />
            <Typography >
              {errors.name?.type === 'required' && name + " is required"}
            </Typography>
          </FormControl>
          </>
  }