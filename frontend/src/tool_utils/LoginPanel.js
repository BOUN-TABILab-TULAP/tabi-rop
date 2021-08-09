import React, { useState} from "react";
import { Form, Input, Button, Result } from 'antd';
import { postQuery } from "../utils";

// refer to: https://ant.design/components/form/ 

const url = "/api/user/login";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const LoginPanel = ({isAuth, setIsAuth}) => {
  const [serverResponse, setServerResponse] = useState({});
  const onFinish = async (values) => {
    console.log(values);
    let response = await postQuery(url, values);
    let {data, status} = response;
    if (status===200){
      setIsAuth(true);
    }
    setServerResponse(response);
  };

  return (
    <>
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    { Object.keys(serverResponse).length!==0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
  );
};
export default LoginPanel;
