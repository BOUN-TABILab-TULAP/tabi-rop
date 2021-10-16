import React, { useEffect, useState } from "react";
import TaskDefinition from "./TaskDefinition";
import TaskInformation from "./TaskInformation";
import OutputCard from "./OutputCard";
import { Card } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import Brat from "./Brat";
import { getQuery, postQuery } from "./utils";
import { withTheme } from '@rjsf/core';
import Form from "@rjsf/core"
import { Theme as AntDTheme } from '@rjsf/antd';
import { docs, colls } from "./data_test_brat";
import ReactJson from 'react-json-view'
import styles from "./UseTool.module.css"
import "antd/dist/antd.css";
import { useRef } from 'react';


import SchemaForm, {
    getKeysFromObject,  // Get all the keys under schema.json
    getObjectFromValue, // Object formatted into the value required by the form
    getValueFromObject  // The value of the form obtained from the form, formatted into an object
} from 'antd-schema-form';
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



    const [data, setData] = useState({})
    const handleSubmit = async (value) => {
        setWait(true)
        setAnswer({})
        console.log(value)
        Object.keys(value["$root"]).map((inp, i) => {
            console.log(inp)
            // data[inp['data_type']] = inp['example'];
            data['input_' + i] = value["$root"][inp];
            setData(data)
        })
        console.log("1" + data)
        setFormData(data);
        console.log("2" + data)
        console.log("bu bir form" + JSON.stringify(formData));

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

        Object.keys(answer).map(function (input, i) { { console.log(answer) } return <OutputCard text={answer[input]} format={format} /> })

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
            {wait && <div>Wait please</div>}

            {((Object.keys(answer).length != 0) && !wait)

                &&
                addOutputs(answer)}



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
                <Brat doc={docs[0]} coll={colls[0]} />


            </ErrorBoundary>
        </div>
    );
};

const OutputText = ({ text, isJson = false }) => {
    const [content, setContent] = useState([

        {
            key: 'app',
            tab: 'app',
        },
        {
            key: 'project',
            tab: 'project',
        },
    ]);
    let contentTab = {

    }

    Object.keys(text).map((data, index) => {
        let temp = { key: "", tab: "" }
        temp["key"] = data
        temp["tab"] = text["data"]
        contentTab["data"] = text["data"]

        setContent(content => [...content, temp])


    })
    setContent(content)

    let state = content[0]
    console.log(content)
    return (<div>
        <>
            <Card
                style={{ width: '100%' }}
                tabList={content}
                activeTabKey={state.key}

                onTabChange={key => {
                    state.key = key;


                }}
            >
                {contentTab[state.key]}
            </Card>
        </>

        {isJson && <ReactJson src={JSON.parse(text)} iconStyle={"triangle"} collapseStringsAfterLength={false} enableClipboard={false} displayDataTypes={false} />}

        {/* {!isJson &&
            <>{text.split("\n").map((line) => {
                return (
                    <>
                        {line.split("\t").map((token, index) => {
                            if (index !== 0) {
                                return (<>&nbsp; {token}</>);
                            }
                            else {
                                return (<>{token}</>);
                            }
                        })}
                        <br />
                    </>
                );
            })}
            </>} */}
    </div>);
};

const OutputBrat = ({ standoff }) => {
    return (
        <>
            <Brat doc={docs[0]} coll={{ text: "Brat test", ...colls[0] }} />
            {/* <Brat doc={docs[0]} coll={colls[0]} /> */}
        </>
    );
};

export default UseTool;
