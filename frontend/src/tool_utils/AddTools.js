import React, { useState, useEffect } from 'react';
import { Result, Form as OldForm, Input, Button, Select, DatePicker } from 'antd';
import { postQuery } from "../utils";
import { MinusCircleOutlined } from "@ant-design/icons";
// import Form from "@rjsf/core";
import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import 'antd/dist/antd.css';
import styles from "./AddTool.module.css"
import { setState } from 'react-jsonschema-form/lib/utils';

const Form = withTheme(AntDTheme);
// import Form  from 'react-jsonschema-form';
const url = process.env.REACT_APP_BACKEND + "/api/tool";
const url_auth = process.env.REACT_APP_BACKEND + "/api/user/isauth";


var outputs = []
var schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false }
  }
};
const DataTypes = ["Boolean", "Char", "Number", "Token"]
const inputTypes = ["List of MorphFeatList", "MorphFeatList", "Tokenized Text", "Token", "List of Token", "Raw Sentence", "Tokenized Sentence"]


const log = (type) => console.log.bind(console, type);



const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const addSchema = () => (
  schema.properties["data"] = { type: "string", title: "Title" }
  //   {key:"data type"
  //   value:"{type:"boolean"}"
  // }
  // ) 
)

console.log(schema)
const AddTools = ({ isAuth, setIsAuth }) => {
  const [form] = OldForm.useForm();
  const [nestedform] = OldForm.useForm();

  var outputTemp = {}


  const [inputTemp, setInputTemp] = useState({
    "input_type": null,
    "data_type": null
  });
  const [inputs, setInputs] = useState([]);

  const [formLayout, setFormLayout] = useState('horizontal');
  const [wait, setWait] = useState(false);
  const [serverResponse, setServerResponse] = useState({});



  const canFinish = (e) => {
    if (inputTemp['input_type'] == null || inputTemp['data_type'] == null) return;
    console.log(inputTemp);
    setInputs(inputs => [...inputs, inputTemp]);
    nestedform.resetFields();
    setInputTemp({
      "input_type": null,
      "data_type": null
    });
  }
  const merveFinish = (e) => { }

  const onFinish = async (values) => {
    let response = {};
    setServerResponse({});
    if (typeof values.git === 'undefined'
      || values.enum === 'undefined'
      || values.name === "undefined") {
      response = { data: { title: "You need to specify all values" } };

    }
    else {
      console.log(values);
      setWait(true);
      response = await postQuery(url, values);
      setWait(false);
      let { data, status } = response;
      if (status === 200) {
        form.resetFields();
      }
    }
    setServerResponse(response);
  };



  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };


  return (
    <>
      <OldForm
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >

        <b>
          Select the domain of the corpus
        </b>
        <OldForm.Item label="Domains" name="domain" >
          <Select name="domain" label="Domains" mode="tags" tokenSeparators={[',']}></Select>
        </OldForm.Item>

        {/* Repository address */}
        <b>
          Also you should enter the git address which is used by proxy to save the input/output specifications of the given program.
        </b>
        <OldForm.Item label="Git Address" name="git" >
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </OldForm.Item>

        {/* Unique Name */}
        <b>
          Finally, you also specify a "unique" name for the program and a human readable name
        </b>
        <OldForm.Item label="Name (enum)" name="enum" >
          <Input placeholder="boun-pars (no spaces, use only alphanumeric characters and '-')" />
        </OldForm.Item>
        {/* Corpus Name */}
        <OldForm.Item label="Name" name="name">
          <Input placeholder="Dependency Parser: BOUN-PARS" />
        </OldForm.Item>
        {/* Corpus Name */}
        <OldForm.Item label="Version" name="version">
          <Input placeholder="2.0" />
        </OldForm.Item>
        <OldForm.Item name="last-updated" label="Last Updated">
          <DatePicker />
        </OldForm.Item>

        {/* Sample Sentence */}
        <OldForm.Item label="Example" name="sample" >
          <Input placeholder="şekerleri yedim." />
        </OldForm.Item>

        {/* Description */}
        <b>
          Select the language(s) that resource supports
        </b>
        <OldForm.Item name="description" label="Description">
          <Input.TextArea />
        </OldForm.Item>
        <b>
          Select the language(s) that resource supports
        </b>
        <OldForm.Item name="languages" label="Language(s)">
          <Select mode="multiple" mode="tags" tokenSeparators={[',']} placeholder="Turkish, English, ...">
            <Option value="tr">Turkish</Option>
            <Option value="en">English</Option>
            <Option value="de">Deutsch</Option>
            <Option value="mult">Multilingual</Option>
            <Option value="ind">Language Independent</Option>
            <Option value="code-switch">Code-switching Corpus</Option>
          </Select>
        </OldForm.Item>

        <b>
          If there is a paper, specify the paper information about the tool in BibTeX Citation
        </b>
        <OldForm.Item name="bibtex" label="Bibtex Entry">
          <Input.TextArea />
        </OldForm.Item>
        <OldForm.Item name="doi" label="DOI">
          <Input placeholder="DOI/10.8971" />
        </OldForm.Item>

        <b>
          You can specify additional links in here
        </b>

        <OldForm.List name="names">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <OldForm.Item
                  {...(index === 0 ? formItemLayout : buttonItemLayout)}
                  label={index === 0 ? 'Link' : ''}
                  required={false}
                  key={field.key}
                >
                  <OldForm.Item validateTrigger={['onChange', 'onBlur']} {...field}>

                    <Input placeholder="https://github.com" style={{ width: '60%' }} />
                  </OldForm.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </OldForm.Item>
              ))}
              <OldForm.Item>
                <Button type="primary" onClick={() => add()}>Add Link</Button>
              </OldForm.Item>
            </>
          )}
        </OldForm.List>


        <b>
          You must specify input output type
        </b>

        <div className={styles.input}>
          <div>
            <b>
              Input Specifications:
            </b>

            {inputs.map((t) => <h1>{t['data_type'] + "         " + t['input_type']}</h1>)}

            <OldForm form={nestedform}>
              <OldForm.Item>

                <Select value={inputTemp['data_type']} onChange={(v) => { inputTemp['data_type'] = v; setInputTemp({...inputTemp}); }} placeholder="Select Data Type" >
                  {DataTypes.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </OldForm.Item>
              <OldForm.Item>

                <Select  value={inputTemp['input_type']} onChange={(v) => {
                  inputTemp['input_type'] = v;
                  setInputTemp({...inputTemp});
                }} placeholder="Select Input Type">
                  {inputTypes.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </OldForm.Item>
              <OldForm.Item>
                <Button type="primary" onClick={canFinish}>Add</Button>
              </OldForm.Item>
            </OldForm>
            {/* <OldForm.List name="inputs">
              {(fields, { add, remove }) => (
                <>

                  <OldForm.Item name="input_type" label="Data Type">
                    <Select placeholder="Select Data Type" >
                      {DataTypes.map((item) => (
                        <Option value={item}>{item}</Option>
                      ))}
                    </Select>
                  </OldForm.Item>

                  <OldForm.Item name="input_format" label="Input Format">
                    <Select placeholder="Select Input Type">
                      {inputTypes.map((item) => (
                        <Option value={item}>{item}</Option>
                      ))}
                    </Select>
                  </OldForm.Item>
                  {fields.map((field, i) => (
                    <OldForm.Item
                      required={false}
                    >
                    </OldForm.Item>
                  ))}
                  <OldForm.Item>
                    <Button type="primary" onClick={function (event) { addInput(); add() }} >Add input</Button>
                  </OldForm.Item>

                </>
              )}
            </OldForm.List> */}

          </div>

          <div>
            <b>
              Output Specifications:
            </b>
            {/* <OldForm.List>
              {outputslist.map((output, i) => (
                <OldForm.Item >
                 {output.output_type}
                </OldForm.Item>

              ))}
            </OldForm.List> */}
            <OldForm
              // form={nestedform}
              onClick={merveFinish}
              onFinish={merveFinish}>
              <OldForm.Item name="output_type" label="Data Type">
                <Select placeholder="Select Data Type">
                  {/* onChange={(e) => addOutput(e, "output_type")} */}
                  {DataTypes.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}

                </Select>
              </OldForm.Item>

              <OldForm.Item name="output_format" label="Output Format">
                <Select name="output_format" placeholder="Select Output Type">
                  {/* onClick={(e) => addOutput(e, "output_format")} */}
                  {inputTypes.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}

                </Select>
              </OldForm.Item>
              <div>
                <OldForm.Item>
                  <Button type="submit" {...buttonItemLayout} onClick={merveFinish} >Add output</Button>
                </OldForm.Item>
              </div>
            </OldForm>
          </div>

        </div>



        <b>
          You must give a contact information
        </b>
        <OldForm.Item name="contact" label="Contact Address" required="true">
          <Input placeholder="utku.turk@boun.edu.tr" />
        </OldForm.Item>

        {/* Submit */}
        <OldForm.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </OldForm.Item>

      </OldForm>
      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
      {wait && <Result {...{ title: "Wait please" }}></Result>}
      {Object.keys(serverResponse).length != 0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
  );
};
export default AddTools;
