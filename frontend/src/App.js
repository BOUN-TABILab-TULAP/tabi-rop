import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalHeader from "./GlobalHeader";
import Home from "./Home";
import ToolPanel from "./ToolPanel";
import "antd/dist/antd.css";
import SideMenu from "./SideMenu";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import UseTool from "./UseTool";
import { getQuery } from "./utils";
import About from "./About";
import styles from "./App.module.css"
import { useMediaQuery } from 'react-responsive';



const url_tools = process.env.REACT_APP_BACKEND + "/api/tools/name";

const { Content, Footer } = Layout;
const App = () => {

  const { t, i18n } = useTranslation();
  const [tools, setTools] = useState([]);
  const getTools = async () => {
    let { data: data, status: status } = await getQuery(url_tools);
    if (status !== 200) {
      return;
    }
    data = data.map((tool, index) => {
      let o = Object.assign({}, tool);
      o.key = index;
      return o;
    });
    console.log("Tools are gathered.", data.length);
    setTools(data);
  };
  useEffect(() => {
    getTools();
  }, []);

  return (
    <Router>
      <Layout 
      className={styles.layout}
      >
        <GlobalHeader />
        <Layout  className="site-layout-background">
          <SideMenu tools={tools} />
          <Content
            className={styles.sitelayout}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/panel" component={ToolPanel} />
              {tools.map((tool, index) => {
                return (
                  <Route path={"/" + tool.enum}
                    component={() => <UseTool tool={tool} />}
                  />
                );
              })}
              <Route path="*" component={Home} />
            </Switch>
          </Content>
        </Layout>
        <Footer className={styles.footer} >{t("footer")}</Footer>
      </Layout>
    </Router>
  );
};

export default App;
