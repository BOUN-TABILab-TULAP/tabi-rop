
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import { useFormContext, useFieldArray } from 'react-hook-form';
import nestedExampleArray from './nestedExampleArray.js';
import NestedExampleArray from './nestedExampleArray.js';
const useStyles = makeStyles({
    step: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: "1px solid rgb(150,150,150)",
        borderRadius:"1%",
        padding: "10px",
        marginBottom:"10px",
        boxSizing:"border-box"

    },
    header: {
        marginBottom: "20px !important",
        marginTop: "20px !important"
    }



});

export default function InputInfo({ inputcontroller }) {

    const { register, control, watch } = useFormContext();
    
    const classes = useStyles()
    return (
        <div ><Typography variant="h6" align="center" className={classes.header}> Input Definitions</Typography>
            {inputcontroller.fields.map((item, index) => {
                return (
                    <Box className={classes.step}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <CustomInput label="Json field" name={`input_fields_temp[${index}].json_field`} ></CustomInput>
                            </Grid>
                            <Grid item xs={4}>
                                <CustomSelect  label="Input type" name={`input_fields_temp[${index}].type`} options={["sentence", "raw", "array"]} > </CustomSelect>
                            </Grid>
                            <Grid item xs={4}>
                                <CustomInput  label="Name"  name={`input_fields_temp[${index}].title`}  > </CustomInput>
                            </Grid>
                        </Grid>
                        <NestedExampleArray nestIndex={index} />
                        <Divider/>
                        <Button type="button" disabled={inputcontroller.fields.length==1} onClick={() => inputcontroller.remove(index)}>
                            Delete
                        </Button>
                    </Box>

                );

            })}
            <Button type="button"
                onClick={() => { inputcontroller.append({ type: "", title: "",json_field:"",example:[] }); }}>
                append
            </Button>
        </div>)

}