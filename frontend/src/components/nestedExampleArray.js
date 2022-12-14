/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useFieldArray } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import CustomInput from "./CustomInput";
import { Button, Grid } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@mui/styles';
import {useTranslation} from "react-i18next"
const useStyles = makeStyles({
    example: {
        display: "flex",
        alignItems: "center !important",

    }
});

export default ({ nestIndex }) => {
    const classes = useStyles()
    const {t}=useTranslation()
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name: `input_fields_temp[${nestIndex}].examples`,
    });
    if (fields.length === 0)  append()
    return (
        <div >
            {fields.map((item, k) => {
                return (
                    <Grid container spacing={2} className={classes.example} >
                        <Grid item xs={10}>
                            <CustomInput
                                fullWidth={false}
                                name={`input_fields_temp[${nestIndex}].examples[${k}]`}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid xs={2}>
                            <Button sx={{ marginLeft: "20px" }} disabled={fields.length === 1} type="button" onClick={() => remove(k)}>
                                <RemoveCircleOutlineIcon fontSize="large" />
                            </Button>
                        </Grid>
                    </Grid>
                );
            })}
            <Button
                type="button"
                onClick={() =>
                    append()
                }
            >
                {t("addexample")}<AddCircleOutlineIcon fontSize="large" />
            </Button>


        </div>
    );
};
