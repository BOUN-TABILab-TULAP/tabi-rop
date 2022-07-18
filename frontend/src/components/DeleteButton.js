
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'
const useStyles = makeStyles({
    button: {
        padding: "15px !important",
        marginLeft: "auto !important",
        marginRight: "10px !important",
        position: "relative"
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export default function DeleteButton(props) {
    const classes = useStyles()
    return <>
        <div className={classes.wrapper}>
            <div></div>
            <div></div> <Button 
                variant="contained"
                sx={{ mt: 3, mb: 2,textTransform:'none !important' }} className={classes.button}>{props.children}</Button>
        </div>
    </>
}