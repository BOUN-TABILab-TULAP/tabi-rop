import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

const SideMenu = ({ tools }) => {
  const { t, i18n } = useTranslation();
  return (
    <Sider
      className="site-layout-background"
      width={300}
      style={{
        overflow: "auto",
        height: "90vh",
        position: "fixed",
        top: "70px",
        left: 0,
      }}
    >

      {
        (i18n.language.slice(0, 2) === "en" || i18n.language.slice(0, 2) === "tr")
        &&
        <>
          <Menu theme="white" mode="inline">
            {tools.map((tool, index) => {
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
