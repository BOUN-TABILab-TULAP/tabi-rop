import React, { useEffect, useState } from "react";
import {getQuery, putQuery, deleteQuery} from "../utils";
import { Descriptions, Space, Popconfirm, Modal, Tag, List, Form, Table, Result, Input, Collapse, Button } from "antd";
import UserForm from "./UserForm";
const { Panel } = Collapse;
const url_get_user = process.env.REACT_APP_BACKEND+"/api/user";
const url_get_users = process.env.REACT_APP_BACKEND+"/api/users";
const url_update_user_info = process.env.REACT_APP_BACKEND+"/api/user/update_info";
const url_update_user_pass = process.env.REACT_APP_BACKEND+"/api/user/update_pass";
const url_delete_user = process.env.REACT_APP_BACKEND+"/api/user/";



const AccountManagement = ({isAuth, setIsAuth}) => {
    const [user, setUser] = useState({});
    const [update, setUpdate] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        let {data: data, status: status} = await getQuery(url_get_users);
        if (status !== 200){
          console.log(data)
          return;
        }
        data = data.map((user, index)=>{
            let o = Object.assign({}, user);
            o.key = index;
            return o;
            });
        setUsers(data);
    };

    const getUser = async () => {
        let {data: data, status: status} = await getQuery(url_get_user);
        if (status === 401) {
            setIsAuth(false);
            return;
        }
        setUser(data);
    };

    useEffect(() => {
        console.log("UF");
        getUser();
        getUsers();
        
    }, [update]);


    return (
    <div>
        { 
        (Object.keys(user).length!=0)
            ? (
            <>  
                <hr/>
                <AccountInfo user={user}></AccountInfo>
                <hr/>
                <hr/>
                <UpdateCurUser user={user} getUserCallback={getUser}></UpdateCurUser>
                <hr/>
                <hr/>
                {(user.roles.includes("admin")) && (
                    <div>
                        <UsersList users={users} callbackFeth={getUsers}></UsersList>
                        <hr/>
                        <hr/>
                        <UserForm createNew={true} callbackFeth={getUsers}></UserForm>
                    </div>
                    )
                }
            </> 
            )
            : <p>Waiting</p>
        }
    </div>
    );
};

const AccountInfo = ({user}) => {

    return (
    <div>
    <Descriptions title="User Info" bordered labelStyle={{fontWeight: "bold"}}>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
    </Descriptions>
    <Collapse defaultActiveKey="0">
        <Panel header="Tools" key="1">
            <List
                header={<div>List:</div>}
                bordered
                dataSource={user.tools}
                renderItem={item => (
                    <List.Item>
                        - {item}
                    </List.Item>
                )}
            />
        </Panel>
      

    </Collapse>
    
  </div>
  )
};

const UpdateCurUser = ({user, getUserCallback}) => {
    const [serverResponse, setServerResponse] = useState({});
    const updatePassword = async (values) => {
        let response = await putQuery(url_update_user_pass, values);
        setServerResponse(response);
    };

    const updateUserInfo = async (values) => {
        let response = await putQuery(url_update_user_info, values);
        setServerResponse(response);
        if (response.status === 200){
          getUserCallback();
        }
    };

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
    return (
        <>
    <h2>Update your information:</h2>
    <Form
      {...layout}
      name="basic"
      onFinish={updateUserInfo}
    >
      <Form.Item
        label="Username"
        name="username"
        initialValue={user.username}
        rules={[
          {
            required: true,
            message: 'Change this if you want to update your username',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        initialValue={user.email}
        rules={[
          {
            required: true,
            message: 'Change this if you want to update your e-mail',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    <h2>Update Password</h2>
    <Form
      {...layout}
      name="basic"
      onFinish={updatePassword}
    > 
      <Form.Item
        label="New Password"
        name="password1"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="password2"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
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
    { Object.keys(serverResponse).length!=0 && <pre><Result {...serverResponse.data}></Result></pre>}
    </>
    );
};

const UsersList = ({users, callbackFeth}) => {
    const [data, setData] = useState([]);
    const [curEditingUser, setCurEditingUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        setData(users);
    }, [users]);
    
    const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles',
        render: roles => (
            <>
            {roles.map((r) => {
                return (
                <Tag  key={r}>
                    {r.toUpperCase()}
                </Tag>);
            })}
            </>
        )
    },
    {
        title: 'Tools',
        key: 'tools',
        dataIndex: 'tools',
        render: tools => (
        <>
            {tools.map(tool => {
            return (
                <Tag key={tool}>
                    {tool.toUpperCase()}
                </Tag>
            );
            })}
        </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <Space size="middle">
            <a onClick={() => onEdit(record.key)}>Edit</a>
            <Popconfirm title="Are you sure to delete it?" onConfirm={() => onDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
        </Space>
        ),
    },
    ];
    const onEdit = (key) => {
        const index = data.findIndex((item) => key === item.key);
        const item = data[index];
        setCurEditingUser(item);
        setShowModal(true);
    };

    const onDelete = async (key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            newData.splice(index, 1);
            let {data: response, status: status} = await deleteQuery(url_delete_user+data[index].username);
            if (status === 200){
                callbackFeth();
            }
        }
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    return (
    <>
    <h2>Manage Existing Users</h2>
    <Table columns={columns} dataSource={data} />
    <Modal 
      title="Update User" visible={showModal} 
      footer={[
            <Button key="back" onClick={handleModalCancel}>
              Return
            </Button>,]
          }
          width={1000}> 
        <UserForm createNew={false} user={curEditingUser} callbackFeth={callbackFeth} setShowModal={setShowModal}></UserForm>
    </Modal>
    </>
    );
};

export default AccountManagement;
