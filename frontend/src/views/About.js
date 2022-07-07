import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Tab, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { Divider, Typography, MenuItem, Select, FormHelperText, TextField, FormControl, InputLabel, createStyles, Button } from '@mui/material';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toolsApi from '../services/toolsApi';
import SubmitButton from '../components/SubmitButton';
import Output from "../components/Output"
import CustomLoadingButton from '../components/LoadingButton';
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import DeveloperCard from '../components/DeveloperCard';

const useStyles = makeStyles({
    header: {
        paddingBottom: '0.2em'

    },
    wrapper: {
        display: "flex",
        alignItems: "flex-start",
        paddingTop: "0.3em",
        marginBottom: "0.5em"
    },
    content: {
        padding: "0.9em"
    }
});
const developers = [
    {
        "name": "muhammet sen",
        "status": "student",
        "responsibilities": "backend developer"
    }, {
        "name": "muhammet sen",
        "status": "student",
        "responsibilities": "backend developer"
    }, {
        "name": "muhammet sen",
        "status": "student",
        "responsibilities": "backend developer"
    }

]
const developerlist = [
    {
        "name": "muhammet sen",
        "status": "student",

    }, {
        "name": "muhammet sen",
        "status": "student",

    }, {
        "name": "muhammet sen",
        "status": "student",

    }

]

export default function About() {

    const classes = useStyles();
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    React.useEffect(() => {

    }, []);
    return <>
        <Box>
            <Typography variant='h3' align='center' className={classes.header} >
                {t('about')}
            </Typography>
            <Divider />
            <Typography className={classes.content}>
                {t('aboutcontent')}
            </Typography>

            <Typography variant='h4' align='center' className={classes.header}>{t('developerheader')}</Typography>

            <Box className={classes.wrapper}>

                {developers.map((developer, index) => {
                    return (
                        <DeveloperCard developer={developer} />
                    )
                })}
            </Box>
            <Typography variant='h4' align='center' className={classes.header}>{t('tooldeveloperheader')}</Typography>
            <Typography> {t('tooldevelopercontent')}</Typography>
            <Box>


                {developerlist.map((developer) => {
                    return (
                        <Typography>{developer.name}</Typography>
                    )
                })}
            </Box>
        </Box>
    </>

}
