import React, { useEffect, useState } from "react";
import TaskDefinition from "./TaskDefinition";
import TaskInformation from "./TaskInformation";
import ErrorBoundary from "./ErrorBoundary";
import Brat from "./Brat";
import { getQuery, postQuery } from "./utils";
import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import { docs, colls } from "./data_test_brat";
import ReactJson from 'react-json-view'
import styles from "./UseTool.module.css"
import "antd/dist/antd.css";

import { Collapse } from "antd";
import SchemaForm, {
    getKeysFromObject,  // Get all the keys under schema.json
    getObjectFromValue, // Object formatted into the value required by the form
    getValueFromObject  // The value of the form obtained from the form, formatted into an object
} from 'antd-schema-form';
// import 'antd-schema-form/style/antd-schema-form.css'; // Introducing style
const { Panel } = Collapse;
const url_get_ui = process.env.REACT_APP_BACKEND + "/api/tool/ui/";
const url_post_run = process.env.REACT_APP_BACKEND + "/api/tool/run/";

const Form = withTheme(AntDTheme);
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
};

const UseTool = ({ tool }) => {
    const [formData, setFormData] = useState({});
    const [answer, setAnswer] = useState({});
    const [wait, setWait] = useState(false);
    useEffect(() => {
        if (tool != null) {
            var inputs = tool['inputFormats']
            var data = {}
            inputs.map((inp, i) => {

                // data[inp['data_type']] = inp['example'];
                data['input_' + i] = inp['example'];
            })

            setFormData(data);
        }
    }, [tool]);

    //
    const handleSubmit = async () => {
        setWait(true)
        console.log(JSON.stringify(formData));
        let response = await postQuery(url_post_run + tool.enum, formData);
        console.log(response.data);
        setAnswer(response.data);
        setWait(false)
    };

    const log = (type) => console.log.bind(console, type);
    return (
        <div>
            <ErrorBoundary>
                {(Object.keys(tool).length != 0)
                    &&
                    <>
                        <TaskDefinition tool={tool} />
                        <TaskInformation tool={tool} />
                        <div className={styles.form}>
                            <SchemaForm json={tool["schema"]}  className={styles.form} 
                                // schema={tool["schema"]}
                                // formData={formData}
                                // uiSchema={tool["uiSchema"]}
                                onOk={handleSubmit}
                                okText="Submit"
                                onChange={(e) => setFormData(e.formData)}
                                // onSubmit={handleSubmit}
                                onError={log("errors")}
                            />
                        </div>
                    </>
                }
                <Brat doc={docs[0]} coll={colls[0]} />
                {/* <Brat doc={{}} coll={{}} /> */}

                {/* <OutputBrat standoff={answer.brat_standoff}/> */}
                {/* {(Object.keys(answer).length!=0)  && <OutputBrat standoff={answer.brat_standoff}/>} */}
                {wait && <div>Wait please</div>}
                {(Object.keys(answer).length != 0)
                 && <OutputText text={answer} isJson={tool['outputFormats'][0]['type'] == "ListOfListOfMorphFeatList"} />}
            </ErrorBoundary>
        </div>
    );
};

const OutputText = ({ text, isJson = false }) => {

    return (<div>


        {isJson && <ReactJson src={text} iconStyle={"triangle"} collapseStringsAfterLength={false} enableClipboard={false} displayDataTypes={false} />}

        {!isJson &&
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
            </>}
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
