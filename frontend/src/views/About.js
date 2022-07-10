import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import div from '@mui/material/Box';
import { Box, Tab, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import DeveloperCard from '../components/DeveloperCard';

const useStyles = makeStyles({
    header: {
        paddingBottom: '0.2em'

    },
    wrapper: {
        display: "flex",
        alignItems: "stretch",
        alignContent:"stretch",
        paddingTop: "0.3em",
        marginBottom: "0.5em",
        flexDirection:"row",
        flexWrap: "wrap",


    },
    content: {
        padding: "0.9em"
    }
});
const developers = [
    {
        "name": "Muhammet Şen",
        "status": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/muhammetssen",
        'image':"https://media-exp2.licdn.com/dms/image/C5603AQFPl4NldkjhJQ/profile-displayphoto-shrink_800_800/0/1657206017736?e=1662595200&v=beta&t=1H5U9u04Qg8iGvjS-qMUC4slK8yPWD3HSJYwt8iY6KY"
    }, {
        "name": "Merve Gürbüz",
        "status": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/mervegürbüz",
        'image':"https://media-exp2.licdn.com/dms/image/C4E03AQHBABNvErfEqQ/profile-displayphoto-shrink_800_800/0/1644856722303?e=1662595200&v=beta&t=uD6d453SrgIBX62uH_83fhG_drJZxpH2kuTz4x42Dps"
    }, {
        "name": "Tunga Güngör",
        "status": "Professor",
        'linkedin': "https://www.linkedin.com/in/tunga-gungor-42ab3335",
        'image':"https://media-exp1.licdn.com/dms/image/C5603AQHD1BePxKN_Bg/profile-displayphoto-shrink_400_400/0/1540744031033?e=1663200000&v=beta&t=_oK5RrWekAC7QMVK6tLG0-QYUTvUQM2iXNVOJnNGPuU"
    },
    {
        "name": "Suzan Üsküdarlı",
        "status": "Associate Professor",
        'linkedin': "https://www.linkedin.com/in/suzanuskudarli/",
        'image':"https://media-exp1.licdn.com/dms/image/C4E03AQGOt48wKCVf0Q/profile-displayphoto-shrink_400_400/0/1516273377753?e=1663200000&v=beta&t=7tKubqB6OR4U1zCjevQrqQlp5-ZqAwQ_18bVeB_4TFw"
    },
    {
        "name": "Arzucan Özgür",
        "status": "Professor",
        'linkedin': "https://www.linkedin.com/in/arzucan-ozgur-149b593b",
        'image':"https://media-exp1.licdn.com/dms/image/C5603AQEbMi4QCajQEg/profile-displayphoto-shrink_400_400/0/1516888759759?e=1663200000&v=beta&t=MMiZQ2XsSCewRpNt9YZXjMJK1h1lD9d0b_iamljlEd8"
    },
    {
        "name": "Balkız Öztürk",
        "status": "Assistant Professor",
        'linkedin': "https://www.linkedin.com/in/balkiz-ozturk-03417b57/",
        'image':""
    },
    {
        "name": "Onur Güngör",
        "status": "",
        'linkedin': "https://www.linkedin.com/in/onurgungor/",
        'image':"https://media-exp1.licdn.com/dms/image/C5603AQFJd1TwULVZrg/profile-displayphoto-shrink_400_400/0/1516344771778?e=1663200000&v=beta&t=_3ze-0wQqv4Do9oW65gWbIsmYa8PuElO0XaEaJTEF4w"
    },
    {
        "name": "Furkan Akkurt",
        "status": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/salih-furkan-akkurt/",
        'image':"https://media-exp1.licdn.com/dms/image/C4D03AQF0UQJU4jS6Ng/profile-displayphoto-shrink_400_400/0/1654523554021?e=1663200000&v=beta&t=yZahUP15NvSixoJCN07qQ5p5XQ5ZztIhHvvU8tSMGmY"
    },
    {
        "name": "Büşra Marşan",
        "status": "",
        'linkedin': "https://www.linkedin.com/in/busramarsan/",
        'image':"https://media-exp1.licdn.com/dms/image/C5603AQGXxMyfbu8orw/profile-displayphoto-shrink_400_400/0/1517534721080?e=1663200000&v=beta&t=vrViB7djZ94o4pS1i6GhGO0BHXIXAVdFlK22tFRPf9I"
    },

]
developers.sort((a,b) => a.name.localeCompare(b.name))
const developerlist = [
    {"name":"Abdullatif Köksal"},
    {"name":"Batuhan Baykara"},
    {"name":"Buse Ak"},
    {"name":"Caner Derici"},
    {"name":"Cem Rıfkı Aydın"},
    {"name":"Haşim Sak"},
    {"name":"Onur Güngör"},
    {"name":"Şaziye Betül Özateş"},
    {"name":"Zeynep Yirmibeşoğlu"},

]

export default function About() {

    const classes = useStyles();
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    React.useEffect(() => {

    }, []);
    return <>
        
            <Typography variant='h3' align='center' className={classes.header} >
                {t('about')}
            </Typography>
            <Divider />
            <Typography className={classes.content}>
                {t('aboutcontent')}
            </Typography>

            <Typography variant='h4' align='center' className={classes.header}>{t('developerheader')}</Typography>

            <div className={classes.wrapper}>

                {developers.map((developer, index) => {
                    return (
                        <DeveloperCard  developer={developer} />
                    )
                })}
            </div>
            <Typography variant='h4' align='center' className={classes.header}>{t('tooldeveloperheader')}</Typography>
            <Typography> {t('tooldevelopercontent')}</Typography>
           <ul>



                {developerlist.map((developer) => {
                    return (
                        <li>{developer.name}</li>
                        )
                    })}
                    </ul>
         
        
    </>

}