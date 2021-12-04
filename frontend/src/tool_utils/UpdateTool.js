import React, { useState, useEffect } from 'react';
import { Result, Form, Input, Button} from 'antd';
import { putQuery } from "../utils";

const url = process.env.REACT_APP_BACKEND+"/api/tool";
const url_update = process.env.REACT_APP_BACKEND+"/api/tool/"
const { TextArea } = Input;

const UpdateTool = ({fields, callbackFetch}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [wait, setWait] = useState(false);
  const [serverResponse, setServerResponse] = useState({});

  useEffect(() => {
      form.setFieldsValue(fields);
  }, );

  const onFinish =  async (values) => {
    let response = {};
    setServerResponse({});
    console.log("updateTools |||", values);
    console.log(fields.enum);
    console.log("132123", fields);
    if (typeof values.ip === 'undefined' 
        || values.port === 'undefined' 
        || values.git === 'undefined' 
        || values.enum === 'undefined'
        || values.name === "undefined"){
      response = {data: {title: "You need to specify all values"}};
    }
    else{
      setWait(true);
      response = await putQuery(url_update + fields.enum, values);
      setWait(false);
      if (response.status === 200){
        await callbackFetch();
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
      Once you have a program up and running on a server; enter its port and IP address below.
      <br />
      </b>
        <Form.Item label="IP" name="ip" >
          <Input placeholder="127.0.0.1" />
        </Form.Item>
        <Form.Item label="Port" name="port" >
          <Input/>
        </Form.Item>
        <b>
        Also you should enter the git address which is used by proxy to save the input/output specifications of the given program.
        </b>
        <Form.Item label="Git Address" name="git" >
          <Input placeholder="e.g. https://github.com/tabilab-dip/BOUN-PARS.git" />
        </Form.Item>
        <b>
        Finally, you also specify a "unique" name for the program and a human readable name
        </b>
         <Form.Item label="Name (enum)" name="enum" >
          <Input placeholder="boun-pars (no spaces, use only alphanumeric characters and '-')" />
        </Form.Item>
         <Form.Item label="Name" name="name" >
          <Input placeholder="Dependency Parser: BOUN-PARS" />
        </Form.Item>
        <b>
        Below you can enter the author_specs.json, if you enter it will overwrite the one in the above repository
        <br/>
        See an example at <a href="https://github.com/tabilab-dip/morphological_parser_sak/blob/main/dip_specs/author_specs.json" target="_blank"> this link</a>
        </b>
        <Form.Item label="author_specs.json" name="author_json" >
          <TextArea rows={6} />
        </Form.Item>
         <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
        
      </Form>
      {wait && <Result {...{title: "Wait please"}}></Result>}
      { Object.keys(serverResponse).length!=0 && <pre><Result {...serverResponse.data}></Result></pre>}

    </>
  );
};
export default UpdateTool;


