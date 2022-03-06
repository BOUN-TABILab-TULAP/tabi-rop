
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
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
    return (
        <div >
            <Typography variant="h6" align="center" className={classes.header}> Usage Guide</Typography>
            <Box className={classes.step}>
            <CustomInput label="Write your guide here" name={"guide"} ></CustomInput>
            </Box>

        </div>)

}