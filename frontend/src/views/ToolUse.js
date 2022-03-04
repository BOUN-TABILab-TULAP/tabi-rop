import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { Divider, Typography, MenuItem, Select, FormHelperText, TextField, FormControl, InputLabel, createStyles, Button } from '@mui/material';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toolsApi from '../services/toolsApi';
import SubmitButton from '../components/SubmitButton';
import Output from "../components/Output"
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
    Tabs: { 
        flexDirection: "column",
        alignItems: "left", 
        marginBottom:"0",
        margin:"0"
    },
    Fields: {
        // margin: "20px",
    },
    formElement:{
        marginBottom:"5px !important",
        padding:"10px !important"   
    },
    divider:{
        margin:"30px !important"    
    },
    header:{
        paddingBottom:"0.5em",
    },
    explanation:{
        padding:"1em"
    }
});
export default function ToolUse({ tool }) {
    const classes = useStyles();
    const [value, set_value] = React.useState('1');
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };
    const [result,setResult]=React.useState()
    const onSubmit=async (data)=>{
        let runresult=await toolsApi.runTool(data,tool.enum)
        setResult(runresult)
        }

    const { register, handleSubmit,watch, control,setValue, formState: { errors } } = useForm({});
    React.useEffect(async () => {
        const head_script = document.createElement("script");
        head_script.type = "text/javascript";
        head_script.src = "../demo/brat/head.js";
        head_script.setAttribute("id", "headjs");

        const loader_script = document.createElement("script");
        loader_script.src = "../demo/brat/brat_loader.js";
        loader_script.type = "text/javascript";
        loader_script.setAttribute("id", "loader_script");

        head_script.onload = () => {
            document.body.appendChild(loader_script);
            console.log("Brat header script is loaded");

        };

        loader_script.onload = () => {
            console.log("Brat loader script is loaded.");
        }
        if (document.getElementById("headjs") === null) {
            console.log("headjs loading");
            // keep the scripts loaded all the time, and don't reload
            document.head.appendChild(head_script);

        }


    }, [])
    return <>
    <Box>
        <Typography variant="h4" className={classes.header}> {tool.name} </Typography>
        <Divider   />  
        <Typography className={classes.explanation} >{tool.description}</Typography>
   
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Demo" value="1" />
                        <Tab label="Usage" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel className={classes.Tabs} value="1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(tool.input_fields).map((key, index) => {
                            let value = tool.input_fields[key]
                            return <div className={classes.Fields}>
                                <Typography>{value.title}</Typography>
                                <FormControl  className={classes.formElement} fullWidth>
                                   
                                    <Select
                                        defaultValue={"0"}
                                        {...register(`${key}_select`,{
                                            onChange: (e) => setValue(key,e.target.value===0?"":e.target.value),
                                            value: "0",
                                        })}   
                                    >      
                                        <MenuItem value={"0"}><em>Select an example</em></MenuItem>
                                        {value.examples.map((example,index)=>{
                                        return <MenuItem value={example}>{example}</MenuItem>
                                        })}
                                       
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth  className={classes.formElement}>
                                    <TextField multiline fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type={value.type}
                                        label={value.title}
                                        {...register(key,{onChange: (e) => {
                                            setValue(`${key}_select`,"0");
                                        }
                                        })}
                                         />
                                </FormControl>
                              <Divider className={classes.divider}  />  
                            </div>
                        })}
                        <SubmitButton >Submit</SubmitButton>
                    </form>
                </TabPanel>
                <TabPanel className={classes.Tabs} value="2">
                    <Box>
                        <Typography variant="h4">Installation</Typography>
                        <Typography>You can just visit the github link to clone the code and just writing 
                            
                        </Typography>

                    </Box>
                </TabPanel>

                <TabPanel className={classes.Tabs} value="3">Item Three</TabPanel>
            </TabContext>
            {result!==undefined ?<Output result={result} ></Output>:<></>}
            </Box>
    </>

}
