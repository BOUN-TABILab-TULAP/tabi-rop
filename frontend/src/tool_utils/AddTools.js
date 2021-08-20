import React, { useState, useEffect } from 'react';
import { Result, Form, Input, Button, Select, DatePicker } from 'antd';
import { postQuery } from "../utils";
import {MinusCircleOutlined} from "@ant-design/icons";


const url = process.env.REACT_APP_BACKEND+"/api/tool";
const url_auth = process.env.REACT_APP_BACKEND+"/api/user/isauth";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;


const AddTools = ({isAuth, setIsAuth}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [wait, setWait] = useState(false);
  const [serverResponse, setServerResponse] = useState({});
  

  const onFinish =  async (values) => {
    let response = {};
    setServerResponse({});
    if (typeof  values.git === 'undefined' 
        || values.enum === 'undefined'
        || values.name === "undefined"){
      response = {data: {title: "You need to specify all values"}};
      
    }
    else{
      console.log(values);
      setWait(true);
      response = await postQuery(url, values);
      setWait(false);
      let {data, status} = response;
      if (status===200){
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
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >

        <b>
        Select the domain of the corpus
        </b>
        <Form.Item label="Domains" name="domain" >
          <Select name="domain" label="Domains" mode="tags" tokenSeparators={[',']}></Select>
        </Form.Item>

        {/* Repository address */}
        <b>
        Also you should enter the git address which is used by proxy to save the input/output specifications of the given program.
        </b>
        <Form.Item label="Git Address" name="git" >
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </Form.Item>

        {/* Unique Name */}
        <b>
        Finally, you also specify a "unique" name for the program and a human readable name
        </b>
        <Form.Item label="Name (enum)" name="enum" >
          <Input placeholder="boun-pars (no spaces, use only alphanumeric characters and '-')" />
        </Form.Item>
        {/* Corpus Name */}
        <Form.Item label="Name" name="name">
          <Input placeholder="Dependency Parser: BOUN-PARS" />
        </Form.Item>
        {/* Corpus Name */}
        <Form.Item label="Version" name="version">
          <Input placeholder="2.0" />
        </Form.Item>
        <Form.Item name="last-updated" label="Last Updated">
          <DatePicker />
        </Form.Item>

        {/* Sample Sentence */}
        <Form.Item label="Example" name="sample" >
          <Input placeholder="şekerleri yedim." />
        </Form.Item>

        {/* Description */}
        <b>
        Select the language(s) that resource supports
        </b>  
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <b>
        Select the language(s) that resource supports
        </b>
        <Form.Item name="languages" label="Language(s)">
          <Select mode="multiple" mode="tags" tokenSeparators={[',']} placeholder="Turkish, English, ...">
            <Option value="tr">Turkish</Option>
            <Option value="en">English</Option>
            <Option value="de">Deutsch</Option>
            <Option value="mult">Multilingual</Option>
            <Option value="ind">Language Independent</Option>
            <Option value="code-switch">Code-switching Corpus</Option>
          </Select>
        </Form.Item>

        <b>
        If there is a paper, specify the paper information about the tool in BibTeX Citation
        </b>
        <Form.Item name="bibtex" label="Bibtex Entry">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="doi" label="DOI">
          <Input placeholder="DOI/10.8971" />
        </Form.Item>
        
        <b>
        You can specify additional links in here
        </b>
        <Form.List name="names">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : buttonItemLayout)}
                label={index === 0 ? 'Link' : ''}
                required={false}
                key={field.key}
              >
              <Form.Item validateTrigger={['onChange', 'onBlur']} {...field}>
             
              <Input placeholder="https://github.com" style={{ width: '60%' }}/>
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" onClick={() => add()}>Add Link</Button>
            </Form.Item>
          </>
        )}
        </Form.List>


        <b>
        You must specify input output type
        </b>
        <Form.Item name="input" label="Input Type">
          <Select placeholder="Select Input Type">
            <Option value="tokenized-sentence">Tokenized Sentence</Option>
            <Option value="morphfeatlist">MorphFeatList</Option>
          </Select>
        </Form.Item>

        <Form.Item name="output" label="Output Type">
          <Select placeholder="Select Output Type">
            <Option value="TokenizedSentence">Tokenized Sentence</Option>
            <Option value="ListOfListOfMorphFeatList">List Of List Of MorphFeatList</Option>
          </Select>
        </Form.Item>


        <b>
        You must give a contact information
        </b>
        <Form.Item name="contact" label="Contact Address" required="true">
          <Input placeholder="utku.turk@boun.edu.tr" />
        </Form.Item>

        {/* Submit */}
         <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
        
      </Form>
      {wait && <Result {...{title: "Wait please"}}></Result>}
      { Object.keys(serverResponse).length!=0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
  );
};
export default AddTools;
