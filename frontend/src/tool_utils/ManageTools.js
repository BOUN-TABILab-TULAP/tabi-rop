import React,  { useState, useEffect } from "react";
import {Button, Modal, Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { getQuery, putQuery, deleteQuery } from "../utils";
import UpdateTool from "./UpdateTool";

const url_tools = "/api/tools"
const url_update = "/api/tool/"


const ManageTools = ({isAuth, setIsAuth}) => {
  const [tools, setTools] = useState([]);
  const getTools = async () => {
    let {data: tools, status: status} = await getQuery(url_tools);
    // set keys:
    tools = tools.map((tool, index)=>{
      let o = Object.assign({}, tool);
      o.key = index;
      return o;
    });
    setTools(tools);
  };

  useEffect(() => {
    getTools();
  }, []);

  return (
  <>
  <Button  onClick={getTools}>
    Refresh
  </Button>
  {tools.length!=0 && <EditableTable rowData={tools} callbackFetch={getTools}></EditableTable>}
  </>
  );
};
export default ManageTools;

//--------------------------------------------
// from: https://ant.design/components/table/#components-table-demo-edit-row



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({rowData, callbackFetch}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(rowData);
  const [editingKey, setEditingKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [curToolFields, setCurToolFields] = useState({});
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const edit = (record) => {
    const key = record.key;
    const index = data.findIndex((item) => key === item.key);
    const item = data[index];
    setCurToolFields(item);
    setShowModal(true);
  };  

  const cancel = () => {
    setEditingKey('');
  };

  const delTool = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        let {data: response, status: status} = await deleteQuery(url_update+data[index].enum);
        if (status === 200){
          setData(newData);
        }
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '16%',
      editable: true,
    },
    {
      title: 'Enum',
      dataIndex: 'enum',
      width: '9%',
      editable: true,
    },
    {
      title: 'Git Address',
      dataIndex: 'git',
      width: '21%',
      editable: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      width: '11%',
      editable: true,
    },
    {
      title: 'Port',
      dataIndex: 'port',
      width: '10%',
      editable: true,
    },
    {
      title: 'Updated',
      dataIndex: 'update_time',
      width: '12%',
      editable: true,
    },
    {
      title: 'Contact',
      dataIndex: 'contact_info',
      width: '11%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{
                marginRight: 8,
              }}>
            Edit
          </Typography.Link>
          <Popconfirm title="Are you sure to delete it?" onConfirm={() => delTool(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          </span>
          
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    <Modal 
      title="Update Tool" visible={showModal} 
      footer={[
            <Button key="back" onClick={handleModalCancel}>
              Return
            </Button>,]
          }
          width={1000}>
        <UpdateTool fields={curToolFields} callbackFetch={callbackFetch}></UpdateTool>
    </Modal>
    </>
  );
};
