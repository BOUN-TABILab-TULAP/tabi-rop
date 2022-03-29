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
    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


    const handleClose = () => {
        setOpen(false);
    };

    return (


        <Dialog  open={open} onClose={handleClose}>
            <Box className={classes.wrapper}>

           
            <DialogTitle sx={{margin:"auto"}}>Give us Feedback</DialogTitle>
            <DialogContent className={classes.feedbackWrap}>
                <DialogContentText>
                    You can send us your comments, any bug reports or improvment ideas.
                </DialogContentText>


                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{ width: "100%" }}   >
                        <InputLabel >select type of feedback</InputLabel>
                        <Select fullWidth
                            label="select type of feedback"
                            {...register("type")}
                        >
                            <MenuItem value="">
                                <em>{"Select"}</em>
                            </MenuItem>
                            {["bug", "comment", "improvement"].map((key, index) => {
                                return <MenuItem key={index} value={key}>{key}</MenuItem>
                            })}
                        </Select>
                    </FormControl>


                    <FormControl sx={{ width: "100%" }}  >
                        <TextField

                            type="text"
                            label="feedback"
                            placeholder="you can write your comment/ bug reports here"
                            defaultValue=""
                            fullWidth
                            multiline
                            rows={4}   
                         {...register("feedback_text",
                                { required: true }
                            )} />
                        <Typography >
                            {errors.feedback_text?.type === 'required' && "feedback  is required"}
                        </Typography>
                    </FormControl>
                </form>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Send</Button>
            </DialogActions>
            </Box>
        </Dialog>

    );
}
