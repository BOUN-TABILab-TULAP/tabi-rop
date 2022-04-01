
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  step: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

  },
  header: {
    marginBottom: "20px !important",
    marginTop: "20px !important"
  },
  delete:{
   
  }
});

export default function InputInfo({ outputcontroller }) {
  const classes = useStyles()
  return (
    <div >
      <Typography variant="h6" align="center" className={classes.header}> Output Definitions</Typography>
      {outputcontroller.fields.map((item, index) => {
        return (<>
         
            <Grid container  className={classes.grid} spacing={2}>
              
                <Grid item xs={5}>

                  <CustomInput label="json field" name={`output.${index}.json_field`} ></CustomInput>
                </Grid>
                <Grid item xs={5}>
                  <CustomSelect label="output type" name={`output.${index}.output_type`} options={["sentence", "raw", "array"]} > </CustomSelect>
                </Grid>
              
              <Grid item xs={2}>
              <Button type="B" onClick={() => outputcontroller.remove(index)}>
                Delete
              </Button>
                </Grid>
            </Grid>
           
          
        </>
        );
      })}
       <Button className={classes.delete} type="button" onClick={() => {
              outputcontroller.append({ output_type: "sentence", example: "bugun seker yedim" });
            }}>
              append
            </Button>
    </div>)

}