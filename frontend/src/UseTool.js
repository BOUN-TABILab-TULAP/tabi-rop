import React, { useEffect, useState } from "react";
import TaskDefinition from "./TaskDefinition";
import TaskInformation from "./TaskInformation";
import ErrorBoundary from "./ErrorBoundary";
import Brat from "./Brat";
import { postQuery } from "./utils";
import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import "antd/dist/antd.css";

const url_post_run = "/api/tool/run/";

const Form = withTheme(AntDTheme);


const UseTool = ({ tool }) => {
    const [formData, setFormData] = useState({});
    const [answer, setAnswer] = useState({});

    useEffect(() => {
        if (tool != null) {
            setFormData(tool["form_data_json"]);
        }
    }, [tool]);

    //
    const handleSubmit = async () => {
        let response = await postQuery(url_post_run + tool.enum, formData);
        setAnswer(response.data);
    };

    const log = (type) => console.log.bind(console, type);
    return (
        <div>
            <ErrorBoundary>
                {(Object.keys(tool).length !== 0)
                    &&
                    <>
                        <TaskDefinition authorSpecs={tool["author_json"]} />
                        <TaskInformation authorSpecs={tool["author_json"]} />
                        <Form
                            schema={tool["root_json"]["schema"]}
                            formData={formData}
                            uiSchema={tool["root_json"]["uiSchema"]}
                            onChange={(e) => setFormData(e.formData)}
                            onSubmit={handleSubmit}
                            onError={log("errors")}
                        />
                    </>
                }
                {("brat_standoff" in answer) && <OutputBrat standoff={answer.brat_standoff} toolName={tool.enum} />}
                {("text" in answer) && <OutputText text={answer.text} />}
            </ErrorBoundary>
        </div>
    );
};

const OutputText = ({ text }) => {

    return (
        <>
            {text.split("\n").map((line) => {
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
        </>);
};

const OutputBrat = ({ standoff, toolName }) => {

    return (
        <>
            {/* <Brat doc={docs[0]} coll={{text:"Brat test", ...colls[0]}} /> */}
            <Brat doc={standoff} iid={toolName} />

        </>
    );
};

export default UseTool;
