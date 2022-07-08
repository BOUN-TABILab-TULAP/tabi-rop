

import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'
import FeedbackIcon from '@mui/icons-material/Feedback';
import {useTranslation} from "react-i18next"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles({
    
  

      
})

export default function GuideButton(props) {
    const {t,i18n}=useTranslation()
    const theme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()
    return <>

        <Button {...props} variant="outlined" size="small" sx={{marginLeft:"0.4em"}} >{t("guide")}</Button>
    </>
}

