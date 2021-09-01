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
import FormItemLabel from 'antd/lib/form/FormItemLabel';

const Form = withTheme(AntDTheme);
// import Form  from 'react-jsonschema-form';
const url = process.env.REACT_APP_BACKEND + "/api/tool";
const url_auth = process.env.REACT_APP_BACKEND + "/api/user/isauth";



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

const AddResource = ({ isAuth, setIsAuth }) => {
  const [form, outputForm] = OldForm.useForm();
  const [nestedform] = OldForm.useForm();

  const [inputTemp, setInputTemp] = useState({
    "input_type": null,
    "data_type": null
  });
  const [outputTemp, setOutputTemp] = useState({
    "output_type": null,
    "data_type": null
  });
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

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
    if (inputTemp['input_type'] == null || inputTemp['data_type'] == null) return;
    console.log(inputTemp);
    setInputs(inputs => [...inputs, inputTemp]);

    setInputTemp({
      "input_type": null,
      "data_type": null
    });
  }


  const addOutput = (e) => {
    if (outputTemp['output_type'] == null || outputTemp['data_type'] == null) return;
    console.log(outputTemp);
    setOutputs(outputs => [...outputs, outputTemp]);

    setOutputTemp({
      "output_type": null,
      "data_type": null
    });
  }



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


  return (
    <>
      <OldForm
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >

        {/* Repository address */}
        <b>
        You should enter the git address which is resource of the given corpus.
        </b>
        <OldForm.Item label="Git Address" name="git" >
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </OldForm.Item>

        {/* Unique Name */}
        <b>
            Select the type of the source
        </b>
        <OldForm.Item name="Type" label="Resource Type">
          <Select  placeholder="Select... ">
            <Option value="Corpus">Corpus</Option>
            <Option value="TreeBank">Treebank</Option>
            <Option value="Dataset">Dataset</Option>
          </Select>
        </OldForm.Item>
        

        {/* Description */}
        <b>
          Select the format of the resource
        </b>
        <OldForm.Item  required name="description" label="Format Type:">
        <Select  placeholder="Select... ">
            <Option value=".prop">.prop</Option>
            <Option value=".conll">.conll</Option>
            <Option value=".cupt">.cupt</Option>
          </Select>
          
        </OldForm.Item>
        <b>
        Give a description for the resource 
        </b>
        <OldForm.Item label="Description:">
        <Input.TextArea placeholder="Description"/>
        </OldForm.Item>

      

        <b>
          You can specify domain of the resource
        </b>

        <OldForm.Item name="Domain" label="Domain">
          <Select mode="multiple" mode="tags" tokenSeparators={[',']} placeholder="news, sport">
            <Option value="news">news</Option>
            <Option value="story">story</Option>

          </Select>
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
export default AddResource;
