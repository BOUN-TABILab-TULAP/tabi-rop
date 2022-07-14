
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
    button: {
        padding: "10px !important",
        marginLeft: "auto !important",
        marginRight: "10px !important",
        position: "relative"
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export default function SubmitButton(props) {
    const classes = useStyles()
    const { t,i18n} = useTranslation();
    return <>
        <div className={classes.wrapper}>
            <div></div>
            <div></div> <Button 
                variant="contained"
                sx={{ mt: 3, mb: 2,textTransform:'none !important' }}  color="primary" className={classes.button} {...props}>{t("submitbutton")}</Button>
        </div>
    </>
}