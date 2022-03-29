import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Divider, Typography, MenuItem, Select,Button, TextField, FormControl, InputLabel, createStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    input:{
     marginBottom:"20px !important",
      width:"100%"
    },
    
   
  });

export default function CustomInput({type="text",label,placeholder,helper,name,defaultValue,fullWidth=true}) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
    const classes=useStyles()
    return <>
   
          <FormControl className={classes.input}  >
            <TextField
            
               type={type}
              label={label}
              placeholder={placeholder}
              defaultValue={defaultValue}
              helper={helper}
              {...register(name,
                { required: true }
              )} />
            <Typography >
              {errors[name] ?.type === 'required' && label + " is required"}
            </Typography>
          </FormControl>
          </>
  }