import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LinearProgress } from '@mui/material';
import CustomInput from "./CustomInput"
import UserApi from "../services/UserApi";
import CustomSelect from "./CustomSelect";
import { makeStyles } from '@mui/styles';
import SubmitButton from "./SubmitButton";
import CustomLoadingButton from "./LoadingButton";

export default function Update({user}) {
  const [wait,setWait]= React.useState(false)
  const methods = useForm();
  const onSubmit = async data => {
    setWait(true)
      data["id"]=user.id
      const response=await UserApi.update({user:data})
      if(response.success){
        window.alert("success")
      }
      else{
        window.alert(response.message)
      } 
      setWait(false) 
  };
  const useStyles = makeStyles({
    form: {
       display: "flex !important",
       flexDirection: "column !important",
       alignItems: 'flex-start',
    
       width:"100%",
       '& div':{
           display:"block",
           width:"500px",
           marginBottom:"30px",
           marginTop:"20px"
     },
     '& button':{
       marginBottom:"-40px",
 
   }
     },
   });
   const classes = useStyles();
  
  // eslint-disable-next-line no-unused-vars
  const {  formState: { errors } } = useForm();
  return (
    
    <FormProvider {...methods} > 
     <div className={classes.form}>
     <LinearProgress />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomInput label="Email" defaultValue={user.email}   helper="please write a valid email" name="email"/>
        <CustomInput type="password"  label="Password"  helper="please define a password to user" name="password"/>
        <CustomSelect label="type" defaultValue={user.type} helper="please choose the type" name="type_enum" options={{"administrator":"administrator","standard":"standard"}}/>
        
        <CustomInput label="username" defaultValue={user.username} helper="please give a unique username" name="username"/>
          {!wait?<SubmitButton type="submit" >Submit</SubmitButton>:<CustomLoadingButton/>}
        
      </form>
      </div>
    </FormProvider>
  );
}

