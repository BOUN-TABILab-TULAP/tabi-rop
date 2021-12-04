import React, { useEffect, useState } from "react";
import TaskDefinition from "./TaskDefinition";
import TaskInformation from "./TaskInformation";
import OutputCard from "./OutputCard";
import { Card } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import Brat from "./Brat";
import { getQuery, postQuery } from "./utils";
import { withTheme } from "@rjsf/core";
import Form from "@rjsf/core"
import { Theme as AntDTheme } from "@rjsf/antd";
import { docs, colls } from "./data_test_brat";
import ReactJson from 'react-json-view'
import styles from "./UseTool.module.css"
import "antd/dist/antd.css";
import Text from "antd/lib/typography/Text";
import { useRef } from 'react';
import SchemaForm, {
    getKeysFromObject,  // Get all the keys under schema.json
    getObjectFromValue, // Object formatted into the value required by the form
    getValueFromObject  // The value of the form obtained from the form, formatted into an object
} from 'antd-schema-form';

var silbu = "# newdoc\n\
# newpar\n\
# sent_id = 1\n\
# text = Babam bana bal aldı.\n\
1	Babam	baba	NOUN	Noun	Case=Nom|Number=Sing|Number[psor]=Sing|Person=3|Person[psor]=1	4	nsubj	_	_\n\
2	bana	ben	PRON	Pers	Case=Dat|Number=Sing|Person=1|PronType=Prs	4	obl	_	_\n\
3	bal	bal	NOUN	Noun	Case=Nom|Number=Sing|Person=3	4	obj	_	_\n\
4	aldı	al	VERB	Verb	Aspect=Perf|Mood=Ind|Number=Sing|Person=3|Polarity=Pos|Tense=Past	0	root	_	SpaceAfter=No\n\
5	.	.	PUNCT	Punc	_	4	punct	_	SpacesAfter=\n\n\
"
const log = (type) => console.log.bind(console, type);
// import 'antd-schema-form/style/antd-schema-form.css'; // Introducing style

const url_get_ui = process.env.REACT_APP_BACKEND + "/api/tool/ui/";
const url_post_run = process.env.REACT_APP_BACKEND + "/api/tool/run/";
const url_format = process.env.REACT_APP_BACKEND + "/api/tool/formats"


// const Form = withTheme(AntDTheme);
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
};

const UseTool = ({ tool }) => {


    const [format, setFormat] = useState({});
    const [formData, setFormData] = useState({});
    const [answer, setAnswer] = useState({});
    const [state, setState] = useState({ key: "Tool_Information" });
    const [wait, setWait] = useState(false);
    useEffect(() => {
        if (tool != null) {
            console.log(tool)
            var inputs = tool['inputFormats']
            var data = {}

            inputs.map((inp, i) => {

                // data[inp['data_type']] = inp['example'];
                data['input_' + i] = inp['example'];
            })

            setFormData(data);
        }
    }, [tool]);

    useEffect(async () => {
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
            // keep the scripts loaded all the time, and don't reload
            document.head.appendChild(head_script);

        }


    }, [])



    const [data, setData] = useState({})
    const handleSubmit = async (value) => {
        setWait(true)
        setAnswer({})
        console.log(value)
        Object.keys(value["$root"]).map((inp, i) => {
            // console.log(inp)

            data['input_' + i] = value["$root"][inp];
            setData(data)
        })
        // console.log("1" + data)
        setFormData(data);
        // console.log("2" + data)
        // console.log("bu bir form" + JSON.stringify(formData));

        let response = await postQuery(url_post_run + tool.enum, formData);
        let temp = await getQuery(url_format)
        console.log(response.data);
        setAnswer(response.data);
        // setFormat(temp.data)
        console.log(temp.data);
        setWait(false)

    };
    const content = [
        {
            key: 'Tool_Information',
            tab: 'Tool Information',
        },
        {
            key: 'Project_Details',
            tab: 'Project Details',
        },
        {
            key: 'Demo',
            tab: 'Demo',
        },
    ];
    const addOutputs = (answer) =>

        Object.keys(answer).map(function (input, i) {
            console.log(answer);
             return <>
             <h2>{ tool['outputFormats'][i]['data_type']}</h2>
             <OutputCard text={answer[input]} format={format} />
             </>
            })


    const contentTab = {
        Tool_Information: <TaskDefinition tool={tool} />,
        Project_Details: <TaskInformation tool={tool} />,
        Demo: <div className={styles.form}>

            <SchemaForm json={tool["schema"]} className={styles.form}
                value={formData}

                onOk={(form, value, keys) => handleSubmit(value)
                }
                okText="Submit"
                onError={log("errors")}
            />
            {wait && <div>Waiting for output from the tool</div>}

            {((Object.keys(answer).length != 0) && !wait) && addOutputs(answer)}
        </div>,
    };
    const onTabChange = (key) => {
        let temp = {
            key: "",
            tab: ""
        }
        temp.key = key
        temp.tab = key

        setState(temp)
    }
    return (
        <div>
            <ErrorBoundary>
                {(Object.keys(tool).length != 0)
                    &&
                    <>
                        <Card
                            style={{ width: '100%' }}
                            tabList={content}
                            activeTabKey={state.key}

                            onTabChange={key => {

                                onTabChange(key);
                            }}
                        >
                            {contentTab[state.key]}
                        </Card>

                    </>
                }
            </ErrorBoundary>
        </div>
    );
};


export default UseTool;
