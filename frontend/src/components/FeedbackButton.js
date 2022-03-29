

import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'
import FeedbackIcon from '@mui/icons-material/Feedback';
const useStyles = makeStyles({
    floating_button: {
        position: "fixed !important",
        right:"-50px",
        margin:"0px",
        bottom: "50%",
        verticalAlign: "top",
        transform: "rotate(-90deg)",
        msTransform: "rotate(-90deg)", /* IE 9 */
        mozTransform: "rotate(-90deg)",/* Firefox */
        webkitTransform: "rotate(-90deg)", 
        '&:hover': {
            background: "#f00 !important",
          }
      },
      
})

export default function FeedbackButton(props) {
    const classes = useStyles()
    return <>

        <Button {...props} disableElevation variant="contained" startIcon={<FeedbackIcon />} className={classes.floating_button}  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>feedback</Button>
    </>
}

