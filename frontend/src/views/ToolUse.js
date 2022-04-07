import * as React from 'react';
import { useLocation } from 'react-router-dom';
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
import {CircularProgress,LinearProgress} from "@mui/material"
import  CustomLoadingButton from '../components/LoadingButton';
const useStyles = makeStyles({
    Tabs: {
        flexDirection: "column",
        alignItems: "left",
        marginBottom: "0",
        margin: "0"
    },
    Fields: {
        // margin: "20px",
    },
    formElement: {
        marginBottom: "5px !important",
        padding: "10px !important"
    },
    divider: {
        margin: "30px !important"
    },
    header: {
        paddingBottom: "0.5em",
    },
    explanation: {
        padding: "1em"
    }
});
export default function ToolUse({ tool }) {
    const location = useLocation();
    const { register, handleSubmit, watch, control, setValue, formState: { errors },reset } = useForm({});
  
    React.useEffect(() => {
       setResult(undefined)
       setLoading(false)
       reset()
      }, [location]);
    const classes = useStyles();
    const [value, set_value] = React.useState('1');
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };
    const [result, setResult] = React.useState()
    const [loading,setLoading]=React.useState(false)
    const onSubmit = async (data) => {
        setLoading(true)
        let response = await toolsApi.runTool(data, tool.enum)
        if(response.success){
            setResult(response.result)
        }
        else{
            window.alert(response.message)

        }
        setLoading(false)

    }
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
            document.head.appendChild(head_script);
        }

    }, [])
    return <>
        <Box>
            <Typography variant="h4" className={classes.header}> {tool.name} </Typography>
            <Divider />
            <Typography className={classes.explanation} >{tool.description}</Typography>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Demo" value="1" />
                        <Tab label="Usage" value="2" />

                    </TabList>
                </Box>
                <TabPanel className={classes.Tabs} value="1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(tool.input_fields).map((key, index) => {
                            let value = tool.input_fields[key]
                            return <div className={classes.Fields}>
                                <Typography>{value.title}</Typography>
                                <FormControl className={classes.formElement} fullWidth>

                                    <Select
                                        defaultValue={"0"}
                                        {...register(`${key}_select`, {
                                            onChange: (e) => setValue(key, e.target.value === 0 ? "" : e.target.value),
                                            value: "0",
                                        })}
                                    >
                                        <MenuItem value={"0"}><em>Select an example</em></MenuItem>
                                        {value.examples.map((example, index) => {
                                            return <MenuItem value={example}>{example}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className={classes.formElement}>
                                    <TextField multiline fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        defaultValue={""}
                                        rows={4}
                                        type={value.type}
                                        label={value.title}
                                        {...register(key, { required: true }, {
                                            onChange: (e) => {
                                                setValue(`${key}_select`, "0");
                                            }
                                        })}
                                    />
                                    <Typography >
                                        {errors[key]?.type === 'required' && value.title + " is required"}
                                    </Typography>
                                </FormControl>
                                <Divider className={classes.divider} />
                            </div>
                        })}

                        {!loading?<SubmitButton>Submit</SubmitButton>:<CustomLoadingButton />}
                    </form>
                    <Box>
                    {result !== undefined ? <Output result={result} ></Output> : <></>}
                    </Box>
                </TabPanel>
                <TabPanel className={classes.Tabs} value="2">
                    <Box>
                        <Typography variant="h4">Usage Information</Typography>
                        <Typography>
                            {tool.usage_information}

                        </Typography>
                    </Box>
                </TabPanel>

            </TabContext>
           
        </Box>
    </>

}
