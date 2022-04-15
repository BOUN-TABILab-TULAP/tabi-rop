
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

        <Typography variant="h5" className={classes.header}>General Details</Typography>
        <Box className={classes.step}>



            <CustomInput label={t("name.label")}
                placeholder={t("name.placeholder")}
                helper={t("name.helper")}
                name={t("name.name")}
                required={t("name.required")}
            ></CustomInput>
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
                required={t("enum.required")}>

            </CustomInput>
            <CustomInput label={t("desc.label")}
                placeholder={t("desc.placeholder")}
                helper={t("desc.helper")}
                name={t("desc.name")}
                required={t("desc.required")}></CustomInput>
            <CustomTextArea label={t("endpoint.label")}
                placeholder={t("endpoint.placeholder")}
                helper={t("endpoint.helper")}
                name={t("endpoint.name")}
                required={t("endpoint.required")}></CustomTextArea>
            <CustomInput label={t("contact.label")}
                placeholder={t("contact.placeholder")}
                helper={t("contact.helper")}
                name={t("contact.name")}
                required={t("contact.required")}></CustomInput>

        </Box>

    </div>

}