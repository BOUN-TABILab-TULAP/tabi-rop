import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import CustomInput from "./CustomInput"
import { makeStyles } from '@mui/styles';
import UserApi from "../services/UserApi";
import SubmitButton from "./SubmitButton";
import { useTranslation } from "react-i18next";
export default function App({setOpen}) {

  const { t} = useTranslation();
  const methods = useForm();
  const onSubmit = async data => {
    const response = await UserApi.add({ user: data })
    if (response.success) {
      window.alert(t("useradd.success"))
    }
    else {
      window.alert(response.message)
    }
    setOpen(false)
  };

  const useStyles = makeStyles({
    form: {
      display: "flex !important",
      flexDirection: "column !important",
      alignItems: 'flex-start',

      width: "100%",
      '& div': {
        display: "block",
        width: "500px",
        marginBottom: "30px",
      },
      '& button': {
        marginBottom: "-40px",

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
            <CustomInput label={t("useradd.email.label")} placeholder="" helper="please write a valid email" name="email" />
            <CustomInput type="password" label={t("useradd.password.label")} placeholder="" helper="please define a password to user" name="password" />
            <CustomInput label={t("useradd.username.label")} placeholder="" helper="please give a unique username" name="username" />
            <SubmitButton type="submit" >{t("submitbutton")}</SubmitButton>

          </form>
        </div>
      </FormProvider>
    </>
  );
}

