import React from "react";
import "antd/dist/antd.css";
import tr_flag from "./assets/images/tr.svg";
import en_flag from "./assets/images/gb.svg";
// TODO change the logo
import logo from "./assets/images/tabilab_big.png";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const GlobalHeader = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <Header
      className="header"
      style={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        paddingLeft: "0",
        height: "6%",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["-1"]}
        style={{
          marginTop: "0",
          height: "100%",
        }}
      >
        <Menu.Item key="1" className="local-header-text">
          <a href="/home">{t("header.home")}</a>
        </Menu.Item>
        <Menu.Item key="2" className="local-header-text">
          <a href="/about">{t("header.about")}</a>
        </Menu.Item>
        <Menu.Item key="3" className="local-header-text">
          <a
            href="https://tabilab.cmpe.boun.edu.tr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("header.repository")}
          </a>
        </Menu.Item>

        <Menu.Item key="4" className="local-header-text">
          <a
            href="https://tabilab.cmpe.boun.edu.tr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("header.tabilab_home")}
          </a>
        </Menu.Item>
      </Menu>
      <a>
        <img
          src={tr_flag}
          style={{
            position: "fixed",
            top: "15px",
            right: "50px",
            float: "right",
            height: "25px",
            width: "35px",
          }}
          onClick={() => changeLanguage("tr")}
        />
      </a>
      <a>
        <img
          src={en_flag}
          style={{
            position: "fixed",
            top: "15px",
            right: "15px",
            float: "right",
            height: "25px",
            width: "35px",
            overflow: "hidden",
          }}
          onClick={() => changeLanguage("en")}
        />
      </a>
    </Header>
  );
};

export default GlobalHeader;
