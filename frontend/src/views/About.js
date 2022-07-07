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
        alignItems: "flex-start",
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
        "status": "4th Grade Student",
        'linkedin': "www.linkedin.com/in/muhammetssen",
        'image':"https://media-exp2.licdn.com/dms/image/C5603AQFPl4NldkjhJQ/profile-displayphoto-shrink_800_800/0/1657206017736?e=1662595200&v=beta&t=1H5U9u04Qg8iGvjS-qMUC4slK8yPWD3HSJYwt8iY6KY"
    }, {
        "name": "Merve Gürbüz",
        "status": "4th Grade Student",
        'linkedin': "https://www.linkedin.com/in/mervegürbüz",
        'image':"https://media-exp2.licdn.com/dms/image/C4E03AQHBABNvErfEqQ/profile-displayphoto-shrink_800_800/0/1644856722303?e=1662595200&v=beta&t=uD6d453SrgIBX62uH_83fhG_drJZxpH2kuTz4x42Dps"
    }, {
        "name": "Tunga Güngör",
        "status": "Professor",
        'linkedin': "https://www.linkedin.com/in/tunga-gungor-42ab3335",
        'image':""
    },
    {
        "name": "Suzan Üsküdarlı",
        "status": "Associate Professor",
        'linkedin': "https://www.linkedin.com/in/suzanuskudarli/",
        'image':""
    },
    {
        "name": "Arzucan Özgür",
        "status": "Professor",
        'linkedin': "https://www.linkedin.com/in/arzucan-ozgur-149b593b",
        'image':""
    }

]
const developerlist = [
    {"name":"Abdullatif Köksal"},
    // {"name":"Murat Saraçlar"},
    {"name":"Cem Rıfkı Aydın"},
    // {"name":"Ali Erkan"},
    {"name":"Haşim Sak"},
    {"name":"Zeynep Yirmibeşoğlu"},
    {"name":"Şaziye Betül Özateş"}
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
