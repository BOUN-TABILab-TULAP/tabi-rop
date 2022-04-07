
import React from 'react';
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
    border: "1px solid rgb(150,150,150)",
    borderRadius:"1%",
    padding: "10px",
    marginBottom:"10px",
    boxSizing:"border-box"

},
  header: {
    marginBottom: "20px !important",
    marginTop: "20px !important"
  },
  delete: {

  }
});

export default function InputInfo({ outputcontroller }) {
  const classes = useStyles()
  return (
    <div >
      <Typography variant="h6" align="center" className={classes.header}> Output Definitions</Typography>
      {outputcontroller.fields.map((item, index) => {
        return (<>
          <Box className={classes.step}>
            <Grid container spacing={2}>
              <Grid item xs={6}>

                <CustomInput label="json field" name={`output.${index}.name`} ></CustomInput>
              </Grid>
              <Grid item xs={6}>
                <CustomSelect label="output type" name={`output.${index}.output_type`} options={["sentence", "raw", "array"]} > </CustomSelect>
              </Grid>
            </Grid>
         
            <Divider />
            <Button type="button" disabled={outputcontroller.fields.length == 1} onClick={() => outputcontroller.remove(index)}>
              Delete
            </Button>
          </Box>
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