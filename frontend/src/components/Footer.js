
import React, { useState, useEffect, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles/";
import { Menu, AppBar, Grid,Box } from '@mui/material/';

const useStyles = makeStyles({
    svg: {
        textDecoration: "none !important",
        color: "white",
        border: "none"
    },
    link: {
        textDecoration: "none !important",
        color: "black",

    }
})
export default function Footer(props) {
    const classes = useStyles()

    return <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 ,backgroundColor:"red"}}>
        <Grid {...props} container spacing={2} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,position:"relative" ,height:"100px",bottom:"0px" }}>
           
            <Grid item size={4}>
                
                    <Link className={classes.svg} to='/login'>

                        <AccountCircle className={classes.icon} fontSize="large"  />
                    </Link>


               
            </Grid>
            <Grid item size={4}>
            
                    <Link className={classes.svg} to='/login'>

                        <AccountCircle className={classes.icon} fontSize="large"  />
                    </Link>


             
            </Grid>
            <Grid item size={4}>       
                <Link className={classes.svg} to='/login'>

                    <AccountCircle className={classes.icon} fontSize="large"  />
                </Link>


            
            </Grid>
        </Grid>

    </Box>
} 