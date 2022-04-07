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
export default function Feedback({ setOpen, open }) {
    const classes=useStyles()
    const {t,i18n}= useTranslation()
    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = async data => {
      
       const response= await UserApi.give_feedback({feedback:data})
      
       if (response.success) {
        window.alert(t("feedback.success"))

      }
      else {
        window.alert(response.message)
      }
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (


        <Dialog  open={open} onClose={handleClose}>
            <Box className={classes.wrapper}>

           
            <DialogTitle sx={{margin:"auto"}}>{t("feedback.header")}</DialogTitle>
            <DialogContent className={classes.feedbackWrap}>
                <DialogContentText>
                   { t("feedback.description")}
                </DialogContentText>



                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{ width: "100%" }}   >
                        <InputLabel >{t("feedback.type.desc")}</InputLabel>
                        <Select fullWidth
                            label={t("feedback.type.desc")}
                            {...register("type")}
                            defaultValue={t("feedback.select.comment")}
                        >
                            <MenuItem value="">
                                <em>{"Select"}</em>
                            </MenuItem>
                            {[t("feedback.select.bug"),t("feedback.select.comment"), t("feedback.select.improvements")].map((key, index) => {
                                return <MenuItem key={index} value={key}>{key}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "100%" }}  >
                        <TextField

                            type="text"
                            label={t( "feedback.text.label")}
                            placeholder={t("feedback.text.desc")}
                            defaultValue=""
                            fullWidth
                            multiline
                            rows={4}   
                         {...register("message",
                                { required: true }
                            )} />
                        <Typography >
                            {errors.feedback_text?.type === 'required' && t("feedback.text.error")}
                        </Typography>
                    </FormControl>
                   
                </form>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} >{t("submitbutton")}</Button>
            </DialogActions>
            </Box>
        </Dialog>

    );
}
