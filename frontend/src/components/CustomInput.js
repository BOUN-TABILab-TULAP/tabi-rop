import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, FormControl, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next"
const useStyles = makeStyles({
  input: {
    marginBottom: "20px !important",
    width: "100%"
  }
});

export default function CustomInput({ type = "text", label, placeholder, helper, name, defaultValue, fullWidth = true, constraint }) {
  const { register, handleSubmit, watch, control, formState: { errors } } = useFormContext();
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  return <>

    <FormControl className={classes.input}  >
      <TextField
        type={type}
        label={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        helper={helper}
        {...register(name,
          {
            // pattern:
            // {
            //   value: /[A-Za-z0-9]/,
            //   message: t("specialchar")
            // }, 
            required: t("required"),
          }

        )} />

      {console.log(constraint)}
      {errors[name] ? <p style={{ color: "red", }}>{errors[name].message}</p> : null}


    </FormControl>
  </>
}