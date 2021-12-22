import React, { useState, useEffect } from 'react';
import { Result, Form, Input, Button, Select, DatePicker } from 'antd';
import { postQuery } from "../utils";
import 'antd/dist/antd.css';
import "../index.css"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import styles from "./AddTool.module.css"



const { Option } = Select;
// const Form = withTheme(AntDTheme);

const url = process.env.REACT_APP_BACKEND + "/api/tool";
const url_auth = process.env.REACT_APP_BACKEND + "/api/user/isauth";

const inputTypes = {
  "TokenizedSentence": "Tokenized Sentence",
  "ListOfListOfMorphFeatList": "List of MorphFeatList",
  "RawSentence": "Raw Sentence",
  "CoNLL":"CoNLL",
  "JSON":"JSON"
};


const AddTools = ({ isAuth, setIsAuth }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    if (i18n.language !== lang) {
     
      i18n.changeLanguage(lang);
    }
  };
  const [form, outputForm] = Form.useForm();
  const [nestedform] = Form.useForm();

  const [inputTemp, setInputTemp] = useState({
    "type": null,
    "data_type": null,
    "example": null,
    "field": null
  });
  const [outputTemp, setOutputTemp] = useState({
    "type": null,
    "output_type": null,
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

      setWait(true);
      response = await postQuery(url, values);
      setWait(false);
      let { data, status } = response;
      if (status === 200) {

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
      <Form
        layout={"horizontal"}
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >

        <b>
         {t("addTool.description")}
        </b>
        <Form.Item name="description" label="Description" required="true">
          <Input.TextArea />
        </Form.Item>

        <b>
          {t("addTool.usageInformation")}
        </b>
        <Form.Item name="usageInformation" label="Usage Information">
          <Input.TextArea />
        </Form.Item>


        <b>
        {t("addTool.citing")}
        </b>
        <Form.Item name="citing" label="Citation">
          <Input.TextArea />
        </Form.Item>


        <b>
        {t("addTool.funding")}
        </b>
        <Form.Item name="funding" label="Funding">
          <Input.TextArea />
        </Form.Item>


        {/* Repository address */}
        <b>
        {t("addTool.gitAddress")}
        </b>
        <Form.Item label="Git Address" name="git" required="true">
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </Form.Item>

        {/* Unique Name */}
        <b>
        {t("addTool.enum")}
        </b>
        <Form.Item label="Name (enum)" name="enum" required="true">
          <Input placeholder="boun-pars (no spaces, use only alphanumeric characters and '-')" />
        </Form.Item>
        <b>
        {t("addTool.name")}
        </b>
      
        <Form.Item label="Name" name="name" required="true">
          <Input placeholder="Dependency Parser: BOUN-PARS" />
        </Form.Item>
        <b>
        {t("addTool.version")}
        </b>
        
        <Form.Item label="Version" name="version" required="true" >
          <Input placeholder="2.0" />
        </Form.Item>
        <b>
        {t("addTool.update_time")}
        </b>
        <Form.Item name="update_time" label="Last Updated">
          <DatePicker />
        </Form.Item>

      
        <b>
        {t("addTool.languages")}
        </b>
        <Form.Item name="languages" label="Language(s)">
          <Select mode="multiple" mode="tags" tokenSeparators={[',']} placeholder="Turkish, English, ...">
            <Option value="tr" label="Turkish"></Option>
            <Option value="en">English</Option>
            <Option value="de">Deutsch</Option>
            <Option value="mult">Multilingual</Option>
            <Option value="ind">Language Independent</Option>
            <Option value="code-switch">Code-switching Corpus</Option>
          </Select>
        </Form.Item>
        <b>
        {t("addTool.domain")}
         
        </b>
        <Form.Item label="Domains" name="domains" >
          <Select name="domain" label="Domains" mode="tags" tokenSeparators={[',']}></Select>
        </Form.Item>
        <b>
          {t("addTool.contact")}
        </b>
        <Form.Item name="contact" label="Contact Address" required="true">
          <Input placeholder="utku.turk@boun.edu.tr" />
        </Form.Item>

        <b>
        {t("addTool.bibtex")}
      
        </b>
        <Form.Item name="bibtex" label="Bibtex Entry">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="doi" label="DOI">
          <Input placeholder="DOI/10.8971" />
        </Form.Item>

        <b>
        {t("addTool.links")}
        </b>
        <Form.List name="links"
          className={styles.linklist}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  style={{ margin: "0px", }}
                  {...(index === 0 ? formItemLayout : buttonItemLayout)}
                  label={index === 0 ? 'Link' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item validateTrigger={['onChange', 'onBlur']} {...field}>
                    <div className={styles.align}>
                      <Input placeholder="https://github.com" style={{ width: '60%' }} />
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className={styles.delete}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </div>
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item {...buttonItemLayout}>
                <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined className={styles.plus} />}>Add Link</Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <b>
        {t("addTool.endpoint")}
        </b>
        <Form.Item name="endpoint" label="Endpoint to call the tool's API" required="true">
          <Input placeholder="api/parser" addonBefore="http://ip:port/" />
        </Form.Item>
        <b>
        {t("addTool.inout")}
         
        </b>

        <div className={styles.input}>
          <div className={styles.column}>
            <b>
            {t("addTool.input")}
            </b>



            <Form form={nestedform}
              {...nestedFormItemLayout}
            >
              <Form.Item label="Name">

                <Input value={inputTemp["data_type"]} onChange={(v) => { inputTemp['data_type'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </Form.Item>

              <Form.Item label="Input Format">

                <Select value={inputTemp['type']} onChange={(v) => {
                  inputTemp['type'] = v;
                  setInputTemp({ ...inputTemp });
                }} placeholder="Select Input Type" label="Data Format">
                  {Object.keys(inputTypes).map((key, index) => (
                    <Option value={key}>{inputTypes[key]}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Example:">
                <Input value={inputTemp["example"]} onChange={(v) => { inputTemp['example'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </Form.Item>

              <Form.Item label="Field:">
                <Input value={inputTemp["field"]} onChange={(v) => { inputTemp['field'] = v.target.value; setInputTemp({ ...inputTemp }); }} />
              </Form.Item>

              <Form.Item >
                <Button type="primary" onClick={addInput}>Add Input</Button>
              </Form.Item>
            </Form>
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
            {t("addTool.output")}
            </b>



            <Form
              form={outputForm}
              onFinish={addOutput}
              {...nestedFormItemLayout}
            >

              <Form.Item label="Name">

                <Input value={outputTemp["data_type"]} onChange={(v) => { outputTemp['data_type'] = v.target.value; setOutputTemp({ ...outputTemp }); }} />
              </Form.Item>
              <Form.Item label="Output Description">
                <Select value={outputTemp['type']} onChange={(v) => {
                  outputTemp['type'] = v;
                  setOutputTemp({ ...outputTemp });
                }} placeholder="Select Output Type" label="Data Format">
                  {Object.keys(inputTypes).map((key, index) => (
                    <Option value={key}>{inputTypes[key]}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Field">
                <Input value={outputTemp["field"]} onChange={(v) => { outputTemp['field'] = v.target.value; setOutputTemp({ ...outputTemp }); }} />
              </Form.Item>
            


              <Form.Item >
                <Button type="primary" onClick={addOutput}>Add output</Button>
              </Form.Item>
            </Form>
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
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>

      </Form>

      {wait && <Result {...{ title: "Wait please" }}></Result>}
      {Object.keys(serverResponse).length != 0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
  );
};
export default AddTools;
