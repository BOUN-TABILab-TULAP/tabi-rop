
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import CustomTextArea from './CustomTextArea.js';
import { useTranslation } from "react-i18next";
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

export default function GuideInfo() {
    const classes = useStyles()
    const {t,i18n}= useTranslation()
    return (
        <div >
            <Typography variant="h6" align="center" className={classes.header}> {t("guide.header")}</Typography>
            <Box className={classes.step}>
            <CustomTextArea label={t("tr.guide.label")} name={"usage_information_tr"} ></CustomTextArea>
            <CustomTextArea label={t("en.guide.label")} name={"usage_information_en"} ></CustomTextArea>

            </Box>

        </div>)

}