

import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'
import FeedbackIcon from '@mui/icons-material/Feedback';
import {useTranslation} from "react-i18next"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles({
    floating_button: {
        position: "fixed !important",
        right:"-45px",
        margin:"0px",
        width:"fitContent",
        padding:"10px !important ",
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
      responsiveButton:{
        position: "fixed !important",
        right:"20px",
        bottom:"20px"
      }
      
})

export default function FeedbackButton(props) {
    const {t,i18n}=useTranslation()
    const theme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()
    return <>

        <Button {...props} variant="contained"  startIcon={<FeedbackIcon />} className={!fullScreen?classes.floating_button:classes.responsiveButton}  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>{t("feedback.text.label")}</Button>
    </>
}

