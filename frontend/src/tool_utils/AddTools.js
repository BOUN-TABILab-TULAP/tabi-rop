import React, { useState, useEffect } from 'react';
import { Result, Form as OldForm, Input, Button, Select, DatePicker } from 'antd';
import { postQuery } from "../utils";
import { MinusCircleOutlined } from "@ant-design/icons";
// import Form from "@rjsf/core";
import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import 'antd/dist/antd.css';
import styles from "./AddTool.module.css"
import FormItemLabel from 'antd/lib/form/FormItemLabel';

const Form = withTheme(AntDTheme);
// import Form  from 'react-jsonschema-form';
const url = process.env.REACT_APP_BACKEND + "/api/tool";
const url_auth = process.env.REACT_APP_BACKEND + "/api/user/isauth";



// const inputTypes = ["List of MorphFeatList", "MorphFeatList", "Tokenized Text", "Token", "List of Token", "Raw Sentence", "Tokenized Sentence"]
const inputTypes = {
  "TokenizedSentence": "Tokenized Sentence",
  "ListOfListOfMorphFeatList": "List of MorphFeatList"
};


const log = (type) => console.log.bind(console, type);



const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;



const AddTools = ({ isAuth, setIsAuth }) => {
  const [form, outputForm] = OldForm.useForm();
  const [nestedform] = OldForm.useForm();

  const [inputTemp, setInputTemp] = useState({
    "type": null,
    "data_type": null,
    "example": null,
    "field": null
  });
  const [outputTemp, setOutputTemp] = useState({
    "type": null,
    "data_type": null,
    "field": null

  });
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

  const [formLayout, setFormLayout] = useState('horizontal');
  const [wait, setWait] = useState(false);
  const [serverResponse, setServerResponse] = useState({});



  const deleteInput = (index) => {
    let temp = inputs
    if (temp.length === 1)
      temp = []
    else {
      temp = temp.splice(index, 1)
    }
    setInputs(temp)

  }

  const deleteOutput = (index) => {
    let temp = outputs
    if (temp.length === 1)
      temp = []
    else {
      temp = temp.splice(index, 1)
    }
    setOutputs(temp)

  }
  const addInput = (e) => {
    if (inputTemp['type'] == null || inputTemp['data_type'] == null) return;
    console.log(inputTemp);
    setInputs(inputs => [...inputs, inputTemp]);

    setInputTemp({
      "type": null,
      "data_type": null,
      "field": null
    });
  }


  const addOutput = (e) => {
    if (outputTemp['type'] == null || outputTemp['data_type'] == null) { return }
    console.log(outputTemp);
    setOutputs(outputs => [...outputs, outputTemp]);

    setOutputTemp({
      "type": null,
      "data_type": null,
      "field": null

    });
  }




  const onFinish = async (values) => {
    let response = {};
    setServerResponse({});
    if (false && typeof values.git === 'undefined'
      || values.enum === 'undefined'
      || values.name === "undefined") {
      response = { data: { title: "You need to specify all values" } };

    }
    else {
      values['inputFormats'] = inputs
      values['outputFormats'] = outputs
      console.log(values);
      setWait(true);
      response = await postQuery(url, values);
      setWait(false);
      let { data, status } = response;
      if (status === 200) {
        // form.resetFields();
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
  const nestedFormItemLayout = {
    labelCol: {
      span: 7,
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
  const nestedbuttonItemLayout = {
    wrapperCol: {
      span: 3,
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

        {/* <b>
          Please explain the tool in detail
        </b> */}
        <OldForm.Item name="description" label="Description" required="true">
          <Input.TextArea />
        </OldForm.Item>

        {/* <b>
          How to use this tool, what are inputs and outputs
        </b> */}
        <OldForm.Item name="usageInformation" label="Usage Information">
          <Input.TextArea />
        </OldForm.Item>


        {/* <b>
          Select the language(s) that resource supports
        </b> */}
        <OldForm.Item name="citing" label="Citation">
          <Input.TextArea />
        </OldForm.Item>


        {/* <b>
          Select the language(s) that resource supports
        </b> */}
        <OldForm.Item name="funding" label="Funding">
          <Input.TextArea />
        </OldForm.Item>


        {/* Repository address */}
        {/* <b>
          Also you should enter the git address which is used by proxy to save the input/output specifications of the given program.
        </b> */}
        <OldForm.Item label="Git Address" name="git" required="true">
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </OldForm.Item>

        {/* Unique Name */}
        {/* <b>
          Finally, you also specify a "unique" name for the program and a human readable name
        </b> */}
        <OldForm.Item label="Name (enum)" name="enum" required="true">
          <Input placeholder="boun-pars (no spaces, use only alphanumeric characters and '-')" />
        </OldForm.Item>
        {/* Corpus Name */}
        <OldForm.Item label="Name" name="name" required="true">
          <Input placeholder="Dependency Parser: BOUN-PARS" />
        </OldForm.Item>
        {/* Corpus Name */}
        <OldForm.Item label="Version" name="version" required="true" >
          <Input placeholder="2.0" />
        </OldForm.Item>
        <OldForm.Item name="update_time" label="Last Updated">
          <DatePicker />
        </OldForm.Item>

        {/* Sample Sentence
        <OldForm.Item label="Example" name="sample" >
          <Input placeholder="şekerleri yedim." />
        </OldForm.Item> */}

        {/* Description */}

        {/* <b>
          Select the language(s) that resource supports
        </b> */}
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
        {/* <b>
          Select the domain of the corpus
        </b> */}
        <OldForm.Item label="Domains" name="domains" >
          <Select name="domain" label="Domains" mode="tags" tokenSeparators={[',']}></Select>
        </OldForm.Item>
        {/* <b>
          You must give a contact information
        </b> */}
        <OldForm.Item name="contact" label="Contact Address" required="true">
          <Input placeholder="utku.turk@boun.edu.tr" />
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

        <OldForm.List name="links">
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
                      class={styles.dynamic}
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
          You must give a contact information
        </b>
        <OldForm.Item name="endpoint" label="Endpoint to call the tool's API" required="true">
          <Input placeholder="api/parser" addonBefore="http://ip:port/" />
        </OldForm.Item>
        <b>
          You must specify input output type
        </b>

        <div className={styles.input}>
          <div className={styles.column}>
            <b>
              Input Specifications:
            </b>



            <OldForm form={nestedform}
              {...nestedFormItemLayout}
            >
              <OldForm.Item label="Name">

                <Input value={inputTemp["data_type"]} onChange={(v) => { inputTemp['data_type'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </OldForm.Item>

              <OldForm.Item label="Input Format">

                <Select value={inputTemp['type']} onChange={(v) => {
                  inputTemp['type'] = v;
                  setInputTemp({ ...inputTemp });
                }} placeholder="Select Input Type" label="Data Format">
                  {Object.keys(inputTypes).map((key, index) => (
                    <Option value={key}>{inputTypes[key]}</Option>
                  ))}
                </Select>
              </OldForm.Item>

              <OldForm.Item label="Example:">
                <Input value={inputTemp["example"]} onChange={(v) => { inputTemp['example'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </OldForm.Item>

              <OldForm.Item label="Field:">
                <Input value={inputTemp["field"]} onChange={(v) => { inputTemp['field'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </OldForm.Item>

              <OldForm.Item >
                <Button type="primary" onClick={addInput}>Add Input</Button>
              </OldForm.Item>
            </OldForm>
            {inputs.map((t, index) =>
              <div class={styles.inputs}>
                {t['data_type'] + "         " + t['type']}
                <MinusCircleOutlined className={styles.dynamic}

                  onClick={(index) => deleteInput(index)} />

              </div>
            )}
          </div>

          <div className={styles.column}>
            <b>
              Output Specifications:
            </b>



            <OldForm
              form={outputForm}
              onFinish={addOutput}
              {...nestedFormItemLayout}
            >

              <OldForm.Item label="Name">

                <Input value={outputTemp["data_type"]} onChange={(v) => { outputTemp['data_type'] = v.target.value; setOutputTemp({ ...outputTemp }); }} />
              </OldForm.Item>
              <OldForm.Item label="Output Format">
                <Select value={outputTemp['type']} onChange={(v) => {
                  outputTemp['type'] = v;
                  setOutputTemp({ ...outputTemp });
                }} placeholder="Select Output Type" label="Data Format">
                  {Object.keys(inputTypes).map((key, index) => (
                    <Option value={key}>{inputTypes[key]}</Option>
                  ))}
                </Select>
              </OldForm.Item>

              <OldForm.Item label="Field">

                <Input value={outputTemp["field"]} onChange={(v) => { outputTemp['field'] = v.target.value; setOutputTemp({ ...outputTemp }); }} />
              </OldForm.Item>
              <OldForm.Item >
                <Button type="primary" onClick={addOutput}>Add output</Button>
              </OldForm.Item>
            </OldForm>
            {outputs.map((t, index) =>
              <div class={styles.inputs}>
                <div class={styles.row}>{t['data_type'] + "         " + t['type']}</div>
                <div><MinusCircleOutlined className={styles.dynamic}

                  onClick={(index) => deleteOutput(index)} /></div>

              </div>
            )}

          </div>
        </div>



        {/* Submit */}
        <OldForm.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </OldForm.Item>

      </OldForm>

      {wait && <Result {...{ title: "Wait please" }}></Result>}
      {Object.keys(serverResponse).length != 0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
  );
};
export default AddTools;
