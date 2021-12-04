import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useTranslation, withTranslation } from "react-i18next";
import styles from "./SideMenu.module.css"
const { Sider } = Layout;

const SideMenu = ({tools}) => {
  const { t, i18n } = useTranslation();
  return (
    <Sider
      width="20%"
      className={styles.side}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
  
    > 
    
    {
      (i18n.language.slice(0, 2) === "en" || i18n.language.slice(0, 2) === "tr") 
      &&  
      <>
      <Menu theme="white" >
        {tools.map((tool, index)=>{
          return (
            <Menu.Item key={tool.enum} className="local-header-text">
              <Link to={tool.enum}>
                {tool["name"]}
              </Link>
            </Menu.Item>
          );
        })}    
      </Menu>
      </>
      }
    </Sider>
  );
};

export default withRouter(SideMenu);
