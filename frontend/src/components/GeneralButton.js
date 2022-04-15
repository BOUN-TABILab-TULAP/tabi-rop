
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'

const useStyles = makeStyles({
    
})

export default function GeneralButton(props) {
    const classes = useStyles()
    return <>

        <Button variant={"contained"} {...props} >{props.children}</Button>

    </>
}