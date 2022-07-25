import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Tab, FormControlLabel, Checkbox } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { Divider, Typography, MenuItem, Select, TextField, FormControl, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import toolsApi from '../services/toolsApi';
import SubmitButton from '../components/SubmitButton';
import Output from "../components/Output"
import CustomLoadingButton from '../components/LoadingButton';
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
const useStyles = makeStyles({
    tabs: {
        flexDirection: "column",
        alignItems: "left",
        marginBottom: "0",
        margin: "0"
    },
    tablist: {

        '& button': {
            padding: "0px",
            margin: "0px",
        }
    },
    formElement: {
        marginBottom: "5px !important",
        padding: "10px !important"
    },
    divider: {
        margin: "3px !important"
    },
    header: {
        paddingBottom: "0.2em",
    },
    explanation: {
        padding: "0.6em 0.3em ",

    },
    buttons: {
        marginRight: ".6em",
        marginTop: "0.6em",
        display: "flex",
        '& a': {
            marginRight: ".6em",
        }
    }
});
export default function ToolUse({ tool }) {
    const [sample, setSample] = React.useState(true)
    const location = useLocation();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({});
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    React.useEffect(()=>{
        document.title = tool.general_info[lang].name ?? "TULAP Demo"
    },[lang, tool])

    React.useEffect(() => {
        // setSample(false)
        setValue(0)
        setResult(undefined)
        setLoading(false)
        reset()
    }, [location]);
    const classes = useStyles();
    const [value, set_value] = React.useState('1');
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };
    const [result, setResult] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const onSubmit = async (data) => {
        setLoading(true)
        setResult(undefined)

        for (let key in data) {
            data[key.substring(0, key.indexOf('_'))] = data[key]

        }

        let response = await toolsApi.runTool(data, tool.enum)
        if (response.success) {
            setResult(response.result)
        }
        else {
            window.alert(response.message)

        }
        setLoading(false)

    }
    React.useEffect(() => {
        const head_script = document.createElement("script");
        head_script.type = "text/javascript";
        head_script.src = "../demo/brat/head.js";
        head_script.setAttribute("id", "headjs");

        const loader_script = document.createElement("script");
        loader_script.src = "../demo/brat/brat_loader.js";
        loader_script.type = "text/javascript";
        loader_script.setAttribute("id", "loader_script");

        head_script.onload = () => {
            document.body.appendChild(loader_script);
            console.log("Brat header script is loaded");
        };

        loader_script.onload = () => {
            console.log("Brat loader script is loaded.");
        }
        if (document.getElementById("headjs") === null) {
            console.log("headjs loading");
            document.head.appendChild(head_script);
        }

    }, [])
    return <>
        <Box>
            <Typography variant="h4" className={classes.header}> {tool.general_info[lang].name} </Typography>
            <Divider />

            <Typography className={classes.explanation} >{tool.general_info[lang].description}</Typography>
            <Divider />
            <Alert sx={{marginTop:"1em"}} severity="info">{t('docker.alert')}</Alert>
            <div className={classes.buttons}>

                <a href={tool.git_address}>
                    <Button variant="outlined" sx={{textTransform:'none !important'}}>
                        GitHub Link

                    </Button>
                </a>


                <a href={tool.tulap_address}>
                    <Button variant="outlined" sx={{textTransform:'none !important'}}>
                        {t('learnmore')}

                    </Button>
                </a>
            </div>


            <TabContext value={value}>
                <Box sx={{ borderBottom: 0.5, borderColor: 'divider' }}>
                    <TabList className={classes.tablist} onChange={handleChange}>
                        <Tab label={t("demo.label")} value="1" />
                        <Tab label={t("usage.label")} value="2" />

                    </TabList>
                </Box>
                <TabPanel className={classes.Tabs} value="1">
                    <form key={tool.enum} onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(tool.input_fields).map((key, index) => {
                            let value = tool.input_fields[key]
                            return <div className={classes.Fields}>

                                <FormControlLabel control={<Checkbox checked={sample} onChange={(e) => { setSample(e.target.checked) }} />} label="Use Sample Sentence" />
                                {sample && <FormControl fullWidth>
                                    <Typography sx={{ paddingBottom: "0.5em" }}>{t('sample.sentence')}</Typography>

                                    <Select
                                        defaultValue={0}

                                        {...register(`${key}_${tool.enum}`, {
                                            required: true, onChange: (e) => setValue(`${key}_${tool.enum}_text`, e.target.value === 0 ? "" : e.target.value),
                                        })}
                                    >
                                        <MenuItem value={0}><em>{t("use.example")}</em></MenuItem>
                                        {value.examples.map((example, index) => {
                                            return <MenuItem style={{ whiteSpace: 'normal' }} value={example}>{example}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                                }

                                {!sample &&
                                    <FormControl fullWidth className={classes.formElement}>
                                        <Typography sx={{ paddingBottom: "0.5em" }} >{value.title[i18n.language]}</Typography>
                                        <TextField multiline fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder={t("textarea")}
                                            rows={4}
                                            type={value.type}
                                            key={tool.enum}
                                            {...register(`${key}_${tool.enum}_text`, { required: true })}
                                        />
                                        <Typography color={"red"} >
                                            {/* {errors[key]?.type === 'required' && value.title + ` ${t("required")}`} */}
                                            {errors[key]?.type === 'required' ? <Alert variant="filled" severity="error" sx={{ marginTop: "5px" }}>{value.title} is required</Alert> : <></>}
                                        </Typography>
                                    </FormControl>}
                                {tool.input_fields.length >= 1 && <Divider className={classes.divider} />}
                            </div>
                        })}

                        <div>
                       
                            {!loading ? <SubmitButton type="submit" onClick={handleSubmit}></SubmitButton> : <CustomLoadingButton />}
                            </div>
                    </form>
                    <Box>
                        {result !== undefined ? <Output result={result} ></Output> : <></>}
                    </Box>
                </TabPanel>
                <TabPanel className={classes.tabs} value="2">
                    <Typography variant="h5">{t("usage.header")}</Typography>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                        {tool.general_info[lang].usage_information}
                    </p>

                </TabPanel>

            </TabContext>

        </Box>
    </>

}
