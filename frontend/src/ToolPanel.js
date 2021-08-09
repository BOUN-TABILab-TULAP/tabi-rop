import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import AddTools from "./tool_utils/AddTools";
import ManageTools from "./tool_utils/ManageTools";
import LoginPanel from "./tool_utils/LoginPanel";
import AccountManagement from "./tool_utils/AccountManagement";
import { getQuery } from "./utils";

const { TabPane } = Tabs;

const url = "/api/user/isauth";
const url_get_logout = "/api/user/logout";


/*
In each component: after http requests:
  - if 401 returned, setIsAuth false
  - if logged-in successfully, setIsAuth true 
*/

const ToolPanel = () => {
  const [isAuth, setIsAuth] = useState(false);

  const logOut = async () => {
    let { data, status } = await getQuery(url_get_logout);
    if (status === 200) {
      setIsAuth(false);
    }
  };

  useEffect(async () => {
    let response = await getQuery(url);
    let { data, status } = response;
    console.log("as", status);
    if (status === 200) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      {isAuth
        ? <div>
          <Button onClick={logOut}>Log Out</Button>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Add Tools" key="1">
              <AddTools isAuth={isAuth} setIsAuth={setIsAuth}></AddTools>
            </TabPane>
            <TabPane tab="Manage Tools" key="2">
              <ManageTools isAuth={isAuth} setIsAuth={setIsAuth}></ManageTools>
            </TabPane>
            <TabPane tab="Account Management" key="3">
              <AccountManagement isAuth={isAuth} setIsAuth={setIsAuth}></AccountManagement>
            </TabPane>
          </Tabs>
        </div>

        : <LoginPanel isAuth={isAuth} setIsAuth={setIsAuth} />

      }
    </>
  );
};



export default ToolPanel;
