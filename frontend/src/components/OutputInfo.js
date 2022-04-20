
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import { makeStyles } from '@mui/styles';
import {useTranslation} from "react-i18next"
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
  const {t}= useTranslation()
  return (
    <div >
      <Typography variant="h6" align="center" className={classes.header}> {t("output.header")}</Typography>
      {outputcontroller.fields.map((item, index) => {
        return (<>
          <Box className={classes.step}>
            <Grid container spacing={2}>
              <Grid item xs={4}>

                <CustomInput label={t("name.label")} name={`output_fields_temp.${index}.name`} ></CustomInput>
              </Grid>
              <Grid item xs={4}>

                <CustomInput label={t("json.label")} name={`output_fields_temp[${index}].json_field`} ></CustomInput>
              </Grid>
              <Grid item xs={4}>
                <CustomSelect label={t("output.type")} name={`output_fields_temp.${index}.output_type`} options={{ "TokenizedSentence": "Tokenized Sentence",
                                    "ListOfListOfMorphFeatList": "List of MorphFeatList",
                                    "RawSentence": "Raw Sentence",
                                    "CoNLL": "CoNLL",
                                    "JSON": "JSON"}} > </CustomSelect>
              </Grid>
              
            </Grid>
         
            <Divider />
            <Button type="button" disabled={outputcontroller.fields.length == 1} onClick={() => outputcontroller.remove(index)}>
             { t("deletebutton")}
            </Button>
          </Box>
        </>
        );
      })}
      <Button className={classes.delete} type="button" onClick={() => {
        outputcontroller.append({ output_type: "sentence", example: "bugun seker yedim" });
      }}>
        {t("addbutton")}
      </Button>
    </div>)

}