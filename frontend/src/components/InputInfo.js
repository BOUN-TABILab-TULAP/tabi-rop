
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import { useFormContext, useFieldArray } from 'react-hook-form';
import NestedExampleArray from './nestedExampleArray.js';
import { useTranslation } from "react-i18next"
const useStyles = makeStyles({
    step: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: "1px solid rgb(150,150,150)",
        borderRadius: "1%",
        padding: "10px",
        marginBottom: "10px",
        boxSizing: "border-box"

    },
    header: {
        marginBottom: "20px !important",
        marginTop: "20px !important"
    }



});

export default function InputInfo({ inputcontroller }) {
    const { t, i18n } = useTranslation()
    const { register, control, watch } = useFormContext();

    const classes = useStyles()
    return (
        <div ><Typography variant="h6" align="center" className={classes.header}> {t("input.header")}</Typography>
            {inputcontroller.fields.map((item, index) => {
                return (
                    <Box className={classes.step}>
                        <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <CustomInput label={`${t("name.inputLabel")} - Tr`} name={`input_fields_temp[${index}].title.tr`}  > </CustomInput>
                                </Grid>
                                <Grid item xs={4}>
                                    <CustomInput label={`${t("name.inputLabel")} - En`} name={`input_fields_temp[${index}].title.en`}  > </CustomInput>
                                </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <CustomInput label={t("json.label")} name={`input_fields_temp[${index}].json_field`} ></CustomInput>
                            </Grid>
                            <Grid item xs={4}>
                                <CustomSelect label={t("type.label")} name={`input_fields_temp[${index}].type`} options={{
                                    "TokenizedSentence": "Tokenized Sentence",
                                    "ListOfListOfMorphFeatList": "List of MorphFeatList",
                                    "RawSentence": "Raw Sentence",
                                    "CoNLL": "CoNLL",
                                    "JSON": "JSON"
                                }} > </CustomSelect>
                            </Grid>
                        </Grid>
                        
                        <NestedExampleArray nestIndex={index} />
                        <Divider />
                        <Button sx={{textTransform:'none !important'}} type="button" disabled={inputcontroller.fields.length == 1} onClick={() => inputcontroller.remove(index)}>
                            {t("deletebutton")}
                        </Button>
                    </Box>

                );

            })}
            <Button type="button" sx={{textTransform:'none !important'}}
                onClick={() => { inputcontroller.append({ type: "", title: "", json_field: "", example: [] }); }}>
                {t("addbutton")}
            </Button>
        </div>)

}