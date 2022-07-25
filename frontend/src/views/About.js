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
        "name": "Muhammet Şen",
        "info": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/muhammetssen",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/muhammet-sen.jpg"
    }, {
        "name": "Merve Gürbüz",
        "info": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/mervegürbüz",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/merve-gurbuz.jpg"
    }, {
        "name": "Tunga Güngör",
        // eslint-disable-next-line no-multi-str
        "info": "Tunga Güngör is a senior lecturer and researcher at the Department of Computer Engineering at\
        Boğaziçi University. He obtained his MS and PhD degrees from the same department. His\
        research interests include natural language processing, machine translation, machine learning,\
        and pattern recognition. He is a member of the Artificial Intelligent Lab and the Text Analytics\
        and Bioinformatics Lab at the department. He teaches undergraduate and graduate level courses\
        on the topics of artificial intelligence, natural language processing, machine translation, and\
        algorithm analysis.",
        'linkedin': "https://www.cmpe.boun.edu.tr/~gungort/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/tunga-gungor.jpg"
    },
    {
        "name": "Suzan Üsküdarlı",
        "info": "Associate Professor",
        'linkedin': "http://www.cmpe.boun.edu.tr/~uskudarli",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/suzan-uskudarli.png"
    },
    {
        "name": "Arzucan Özgür",
        "info": "Arzucan Özgür is a faculty member at the Computer Engineering Department of Boğaziçi University and a member of the Text Analytics and Bioinformatics (TABI) Lab. She received her PhD in computer science and engineering from the University of Michigan in 2010. She holds a MS and a BS degree in computer engineering from Boğaziçi University. Her research interests include natural language processing and bioinformatics. Her recent focus has been on developing methods for processing and understanding textual data in natural (human) languages or in the sequences of biomolecules.",
        'linkedin': "https://www.cmpe.boun.edu.tr/~ozgur/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/arzucan-ozgur.jpg"
    },
    {
        "name": "Balkız Öztürk",
        "info": "Assistant Professor",
        'linkedin': "https://www.linkedin.com/in/balkiz-ozturk-03417b57/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/balkiz-ozturk.jpg"
    },
    {
        "name": "Onur Güngör",
        "info": "",
        'linkedin': "https://www.linkedin.com/in/onurgungor/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/onur-gungor.jpg"
    },
    {
        "name": "Furkan Akkurt",
        "info": "Senior Computer Engineering Student",
        'linkedin': "https://www.linkedin.com/in/salih-furkan-akkurt/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/furkan-akkurt.jpg"
    },
    {
        "name": "Büşra Marşan",
        "info": "",
        'linkedin': "https://www.linkedin.com/in/busramarsan/",
        'image':"https://tulap.cmpe.boun.edu.tr/staticFiles/people/busra-marsan.jpg"
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
