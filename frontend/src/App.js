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
import { getQuery} from "./utils";
import About from "./About";
const url_tools = "/api/tools/name";


const { Content, Footer, Header } = Layout;
const App = () => {
  const { t, i18n } = useTranslation();
  const [tools, setTools] = useState([]);
  const getTools = async () => {
    let {data: data, status: status} = await getQuery(url_tools);
    if (status !== 200){
      return;
    }
    data = data.map((tool, index)=>{
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
      <Layout>
        <GlobalHeader />
        <Content>
          <Layout className="site-layout-background">
            <SideMenu tools={tools}/>
            <Content
              className="site-layout"
              style={{
                paddingLeft: "340px",
                paddingRight: "100px",
                paddingTop: "100px",
                paddingBottom: "0px",
                minHeight: "700px",
              }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/panel" component={ToolPanel} />
                {tools.map((tool, index) => {
                  return (
                    <Route path={"/"+tool.enum} 
                    component={() => <UseTool tool={tool}/>}
                     />
                    );
                })}
                <Route path="*" component={Home} />
              </Switch>
              <Footer style={{ textAlign: "center" }}>{t("footer")}</Footer>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
