
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'

const useStyles = makeStyles({
    
})

export default function GeneralButton(props) {
    const classes = useStyles()
    return <>

        <Button  {...props}  sx={{textTransform:'none !important'}} variant={"contained"} >{props.children}</Button>

    </>
}