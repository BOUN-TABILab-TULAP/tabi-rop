import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Typography, Select, InputLabel, MenuItem,Box } from '@mui/material';
import { useForm } from "react-hook-form";
import UserApi from '../services/UserApi';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  feedbackWrap: {
    display: "flex !important",
    flexDirection: "column",
    alignItems:"center !important",
    width: "100%",
    padding: "10px",
    marginBottom:"10px",
    boxSizing:"border-box"

},
form:{
    justifyContent:"space-evenly",
    height:"300px",
    display:"flex",
    flexDirection:"column",
    width:"100%"
},
wrapper:{
    padding:"10px"
}
});
export default function Guideline({ setOpen, open }) {
    const classes=useStyles()
    const {t,i18n}= useTranslation()
    const { register, handleSubmit,formState: { errors } } = useForm();
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog  open={open} onClose={handleClose}>
            <Box className={classes.wrapper}>

           
            <DialogTitle sx={{margin:"auto"}}>{t('guide.header')}</DialogTitle>
            <DialogContent className={classes.feedbackWrap}>
                <DialogContentText sx={{whiteSpace:' pre-line',}}>
                   {t('guideline')}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>{t("ok")}</Button>
            
            </DialogActions>
            </Box>
        </Dialog>

    );
}
