import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { Divider, Typography, MenuItem, Select, FormHelperText, TextField, FormControl, InputLabel, createStyles, Button, TableHead, TableBody, TableRow, TableCell, Table,TableContainer } from '@mui/material';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toolsApi from '../services/toolsApi';
import SubmitButton from './SubmitButton';
import ReactJson from 'react-json-view'
import { flexbox } from '@mui/system';
import Brat from "./brat/Brat";

const useStyles = makeStyles({
    button: {
        padding: "10px !important",
        marginLeft: "auto !important",
        marginRight: "10px !important",
        position: "relative"
    },
    result: {
        paddingLeft: "0px",
        marginTop: "0px"
    }
})

export default function Output({ result }) {
    const classes = useStyles()
    const [value, set_value] = React.useState("0");
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };
    return <>

        {Object.keys(result).map((key, i) => {
            return <Box className={classes.result}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            {Object.keys(result[key]).map((type, index) => {
                                return <Tab label={type} value={`${index}`} />
                            })}
                        </TabList>
                    </Box>
                    {Object.keys(result[key]).map((type, index) => {
                        return <>
                            {type === "json" ? <TabPanel value={`${index}`}><div>
                                <ReactJson displayDataTypes={false} src={(result[key][type])} /></div></TabPanel> : <></>}
                            {type === "brat" ? <TabPanel value={`${index}`}>
                                <Brat conll={result[key][type]} /></TabPanel> : <></>}
                            {type === "raw" ? <TabPanel value={`${index}`}>
                                <Typography sx={{ whiteSpace: 'pre-line' }} style={{ whiteSpace: "pre-wrap" }} >{result[key][type]}</Typography></TabPanel> : <></>}
                            {type === "mwe" ? <TabPanel value={`${index}`}>
                                <TableContainer>

                                    <Table size="small" aria-label="simple table">
                                        {result[key][type].split("\n").map((key, index) => {
                                            if(key===""|| key==="\n")
                                            return <></>
                                            if (index === 0) {
                                                return <TableHead>
                                                    <TableRow>
                                                        {key.split("\t").map((row, rowIndex) => {
                                                            return  <TableCell >{row}</TableCell>
                                                        })}
                                                    </TableRow>
                                                </TableHead>
                                            }
                                            else{
                                                return <TableRow>
                                                    {key.split("\t").map((row, rowIndex) => {
                                                        return <TableCell >{row}</TableCell>
                                                    })}
                                                </TableRow>
                                            }
                                        })
                                    }
                                    </Table> 
                                    </TableContainer>
                                
                            </TabPanel> : <></>}
                        </>
                    })}


                </TabContext>
            </Box>
        })}
    </>
}