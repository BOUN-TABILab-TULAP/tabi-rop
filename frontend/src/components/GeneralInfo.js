
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from '../components/CustomInput.js';
import CustomTextArea from '../components/CustomTextArea.js';
import { useTranslation } from "react-i18next"
const useStyles = makeStyles({
    step: {
        display: "flex",
        flexDirection: "column",
        width: "100%",

    },
    header: {
        marginBottom: "20px !important",
        marginTop: "20px !important"
    }
});


export default function GeneralInfo(inputcontroller, outputcontroller) {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    return <div align="center">

        <h2 className={classes.header}>{t("general.info")}</h2>
        <Box className={classes.step}>

           
            
            
            <CustomInput label={t("git.label")}
                placeholder={t("git.placeholder")}
                helper={t("git.helper")}
                name={t("git.name")}
                required={t("git.required")}
                
            ></CustomInput>
            <CustomInput label={t("enum.label")}
                placeholder={t("enum.placeholder")}
                helper={t("enum.helper")}
                name={t("enum.name")}
                required={t("enum.required")}
                constraint={"/[A-Za-z0-9]/"}
                >

            </CustomInput>
            <CustomInput label={t("endpoint.label")}
                placeholder={t("endpoint.placeholder")}
                helper={t("endpoint.helper")}
                name={t("endpoint.name")}
                required={t("endpoint.required")}></CustomInput>
            <CustomInput label={t("contact.label")}
                placeholder={t("contact.placeholder")}
                helper={t("contact.helper")}
                name={t("contact.name")}
                required={t("contact.required")}
                type="email"
                ></CustomInput>
    <Divider/>        
            <h3>Please write these fields in English </h3>
          
           
<CustomTextArea label={t("desc.label")}
    placeholder={t("desc.placeholder")}
    helper={t("desc.helper")}
    name={`${t("desc.name")}_en`}
    required={t("desc.required")}></CustomTextArea>
<CustomInput label={t("name.label")}
    placeholder={t("name.placeholder")}
    helper={t("name.helper")}
    name={`${t("name.name")}_en`}
    required={t("name.required")}
></CustomInput>

<Divider/>

<h3>Please write these fields in Turkish </h3>

<CustomTextArea label={t("desc.label")}
    placeholder={t("desc.placeholder")}
    helper={t("desc.helper")}
    name={`${t("desc.name")}_tr`}
    required={t("desc.required")}></CustomTextArea>
<CustomInput label={t("name.label")}
    placeholder={t("name.placeholder")}
    helper={t("name.helper")}
    name={`${t("name.name")}_tr`}
    required={t("name.required")}
></CustomInput>

        </Box>

    </div>

}