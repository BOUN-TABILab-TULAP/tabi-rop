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
import InfoIcon from '@mui/icons-material/Info';
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
        "firstName": "Muhammet",
        "lastName": "Şen",
        "info": "Core Developer of TULAP, Undergraduate Student of Department of Computer Engineering",
        'linkedin': "https://www.linkedin.com/in/muhammetssen",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/muhammet-sen.jpg"
    }, {
        "firstName": "Merve",
        "lastName": "Gürbüz",
        "info": "Core Developer of TULAP, Undergraduate Student of Department of Computer Engineering",
        'linkedin': "https://www.linkedin.com/in/mervegürbüz",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/merve-gurbuz.jpg"
    }, {
        "firstName": "Tunga",
        "lastName": "Güngör",
        "info": "Faculty of Department of Computer Engineering",
        'linkedin': "https://www.cmpe.boun.edu.tr/~gungort/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/tunga-gungor.jpg"
    },
    {
        "firstName": "Suzan",
        "lastName": "Üsküdarlı",
        "info": "Faculty of Department of Computer Engineering",
        'linkedin': "http://www.cmpe.boun.edu.tr/~uskudarli",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/suzan-uskudarli.png"
    },
    {
        "firstName": "Arzucan",
        "lastName": "Özgür",
        "info": "Faculty of Department of Computer Engineering",
        'linkedin': "https://www.cmpe.boun.edu.tr/~ozgur/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/arzucan-ozgur.jpg"
    },
    {
        "firstName": "Balkız",
        "lastName": "Öztürk",
        "info": "Faculty of Department of Linguistics",
        'linkedin': "https://www.linkedin.com/in/balkiz-ozturk-03417b57/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/balkiz-ozturk.jpg"
    },
    {
        "firstName": "Onur",
        "lastName": "Güngör",
        "info": "Faculty of Department of Computer Engineering",
        'linkedin': "https://www.linkedin.com/in/onurgungor/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/onur-gungor.jpg"
    },
    {
        "firstName": "Furkan",
        "lastName": "Akkurt",
        "info": "Undergraduate Student of Department of Computer Engineering",
        'linkedin': "https://www.linkedin.com/in/salih-furkan-akkurt/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/furkan-akkurt.jpg"
    },
    {
        "firstName": "Büşra",
        "lastName": "Marşan",
        "info": "Graduate Student of Department of Linguistics",
        'linkedin': "https://www.linkedin.com/in/busramarsan/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/busra-marsan.jpg"
    },

]
developers.sort((a,b) => a.firstName.localeCompare(b.firstName)).sort((a,b) => a.lastName.localeCompare(b.lastName))

const tool_provider_list = [
    {"name":"Abdullatif Köksal"},
    {"name":"Arzucan Özgür"},
    {"name":"Balkız Öztürk"},
    {"name":"Batuhan Baykara"},
    {"name":"Buse Ak"},
    {"name":"Caner Derici"},
    {"name":"Cem Rıfkı Aydın"},
    {"name":"Gözde Berk"},
    {"name":"Haşim Sak"},
    {"name":"Onur Güngör"},
    {"name":"Salih Furkan Akkurt"},
    {"name":"Suzan Üsküdarlı"},
    {"name":"Şaziye Betül Özateş"},
    {"name":"Tunga Güngör"},
    {"name":"Zeynep Yirmibeşoğlu"}
]
const dataset_provider_list = [
    {"name":"Abdullatif Köksal"},
    {"name":"Arzucan Özgür"},
    {"name":"Balkız Öztürk Başaran"},
    {"name":"Buse Buz"},
    {"name":"Büşra Marşan"},
    {"name":"Haşim Sak"},
    {"name":"Onur Güngör"},
    {"name":"Utku Türk"},
    {"name":"Tunga Güngör"}
]

export default function About() {

    const classes = useStyles();
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    React.useEffect(() => {
        document.title = t('about')
    }, [lang]);
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
            <br />
            <Typography> {t('resource_provider_content')}</Typography>
            <Typography variant='h4' align='center' className={classes.header}>{t('tool_provider_header')}</Typography>
           <ul>
                {tool_provider_list.map((provider) => {
                    return (
                        <li>{provider.name}</li>
                        )
                    })}
                    </ul>
            <Typography variant='h4' align='center' className={classes.header}>{t('dataset_provider_header')}</Typography>
           <ul>
                {dataset_provider_list.map((provider) => {
                    return (
                        <li>{provider.name}</li>
                        )
                    })}
                    </ul>
         
        
    </>

}
