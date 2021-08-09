import React, { useState, useEffect } from 'react';
import { Result, Form, Input, Button, Checkbox } from 'antd';
import { putQuery, getQuery, postQuery } from "../utils";

const url_register = "/api/user/register"
const url_tools = "/api/tools"
const url_update_user = "/api/user/update/";


const UserForm = ({ createNew, user, callbackFeth, setShowModal }) => {
  const [form] = Form.useForm();
  const [tools, setTools] = useState([]);
  const [serverResponse, setServerResponse] = useState({});

  const getTools = async () => {
    let { tools, status } = await getQuery(url_tools);
    setTools(tools);
  };

  useEffect(() => {
    form.setFieldsValue(user);
    getTools();
  }, [user]);

  const onFinish = async (values) => {
    let response = {};
    setServerResponse({});
    if (typeof values.username === 'undefined'
      || typeof values.email === 'undefined'
      || typeof values.password === 'undefined'
      || typeof values.roles === 'undefined') {
      response = { data: { title: "You need to specify all values" } };
    }
    else if (values.roles.length === 0) {
      response = { data: { title: "You need to select at least one role" } };
      setServerResponse(response);
    }
    else {
      if (createNew) {
        let response = await postQuery(url_register, values);
        if (response.status == 200) {
          callbackFeth();
        }
        setServerResponse(response);
      } else {
        let response = await putQuery(url_update_user + user.username, values);
        if (response.status === 200) {
          callbackFeth();
          setShowModal(false);
          setServerResponse({});
        } else {
          form.setFieldsValue(user);
          setServerResponse(response);
        }
      }
    }
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
      {createNew
        ? <h2>Create New User</h2>
        : <h2>Update Existing User</h2>}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Username" name="username" >
          <Input placeholder="alican" />
        </Form.Item>
        <Form.Item label="email" name="email" >
          <Input placeholder="alican@gmail.com" />
        </Form.Item>
        {!createNew && <p>If you don't want to update the password, leave it blank.</p>}
        <Form.Item label="Password" name="password1" >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Password" name="password2" >
          <Input.Password />
        </Form.Item>
        <hr />

        <Form.Item label="User Role" name="roles">
          <Checkbox.Group>
            <Checkbox value="admin">admin</Checkbox>
            <Checkbox value="user">user</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <hr />
        <p>Tool Access (if new user is Admin you can skip this)</p>
        <br />
        <Form.Item label="Tools:" name="tools">
          <Checkbox.Group>
            {tools.map((t) => {
              return (
                <div>
                  <Checkbox value={t.enum}>{t.enum}</Checkbox>
                </div>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Send User Info</Button>
        </Form.Item>

      </Form>
      {Object.keys(serverResponse).length !== 0 && <pre><Result {...serverResponse.data}></Result></pre>}

    </>
  );
};
export default UserForm;


