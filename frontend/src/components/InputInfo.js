
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography,Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
const useStyles = makeStyles({
    step: {
        display: "flex",
        flexDirection: "column",
        width: "100%",

    },
    header: {
        marginBottom: "20px !important",
        marginTop: "20px !important"
    }



});

export default function InputInfo({ inputcontroller }) {
    const classes = useStyles()
    return (
        <div ><Typography variant="h6" align="center" className={classes.header}> Input Definitions</Typography>
            {inputcontroller.fields.map((item, index) => {
                return (<>
                    <Box className={classes.step}>
                        <Grid container spacing={2}>
                           <Grid item xs={10} >
                              
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomInput label="json field" name={`input.${index}.json_field`} ></CustomInput>
                            </Grid>
                            <Grid item xs={6}>
                            <CustomSelect label="input type" name={`input.${index}.input_type`} options={["sentence", "raw", "array"]} > </CustomSelect>
                            </Grid>       
                        </Grid>
                            <CustomInput label="sentence example" name={`input.${index}.examples`} > </CustomInput>
                        </Grid>
                        <Grid item xs={2} >
                        <Button type="button" onClick={() => inputcontroller.remove(index)}>
                            Delete
                        </Button>
                        </Grid>
                        </Grid>

                    </Box>
                </>
                );

            })}
            <Button type="button"
                onClick={() => { inputcontroller.append({ input_type: "sentence", example: "bugun seker yedim" }); }}>
                append
            </Button>
        </div>)

}