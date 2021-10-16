import React from "react";
import "antd/dist/antd.css";
import tr_flag from "./assets/images/tr.svg";
import en_flag from "./assets/images/gb.svg";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./GlobalHeader.module.css"
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
      // className="header"
      // className={styles.header}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["-1"]}
        // className={styles.menu}
      >
        <Menu.Item key="1" >
          <a href="/">{t("header.home")}</a>
        </Menu.Item>
        <Menu.Item key="2" >
          <a href="/demo/about">{t("header.about")}</a>
        </Menu.Item>
        <Menu.Item key="3" >
          <a
            href="https://tabilab.cmpe.boun.edu.tr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("header.repository")}
          </a>
        </Menu.Item>

        <Menu.Item key="4" >
          <a
            href="https://tabilab.cmpe.boun.edu.tr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("header.tabilab_home")}
          </a>
        </Menu.Item>
      </Menu>
      <div className={styles.flag}>
      <a>
        <img
          src={tr_flag}
          className={styles.flagtr} 
          onClick={() => changeLanguage("tr")}
        />
      </a>
      <a>
        <img
          src={en_flag}
          onClick={() => changeLanguage("en")}
        />
      </a>
      </div>
    </Header>
  );
};

export default GlobalHeader;
