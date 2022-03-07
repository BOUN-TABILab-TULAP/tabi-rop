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
import SubmitButton from './SubmitButton';
import ReactJson from 'react-json-view'
import { flexbox } from '@mui/system';
const useStyles = makeStyles({
    button: {
        padding: "15px !important",
        backgroundColor: "#3c7ba6 ",
        marginLeft: "auto !important",
        marginRight: "10px !important",
        position: "relative"
    },
    result:{
        paddingLeft:"10px",
        marginTop:"-50px"
    }
   
})

export default function Output({ result }) {
    const classes = useStyles()
    console.log(result)
    const [value, set_value] = React.useState("1");
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };
    return <>

        {Object.keys(result).map((key, i) => {
           return <Box className={classes.result}>    
                <Typography variant="h4">{key}</Typography>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            {Object.keys(result[key]).map((type, index) => {
                                {console.log(type)}
                               return <Tab label={type} value={`${index}`} />
                            })}
                        </TabList>
                    </Box>
                    {Object.keys(result[key]).map((type, index) => {
                        return <>
                        {type==="json"? <TabPanel  value={`${index}`}><div><ReactJson displayDataTypes={false} src={(result[key][type])}/></div></TabPanel>:<></>}
                        {type==="brat"?<TabPanel  value={`${index}`}></TabPanel>:<></>}
                        {type=="raw"?<TabPanel  value={`${index}`}><Typography sx={{ whiteSpace: 'pre-line'}}>{result[key][type]}</Typography></TabPanel>:<></>}
                        </>       
                    })}


                </TabContext>
            </Box>
        })}
    </>
}