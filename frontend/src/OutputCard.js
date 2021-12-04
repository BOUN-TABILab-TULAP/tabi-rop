import React, { Fragment } from "react";
import { Collapse, Card } from "antd";
import { useTranslation, withTranslation } from "react-i18next";
import Text from "antd/lib/typography/Text";
import styles from "./UseTool.module.css"
import ReactJson from 'react-json-view'
import Brat from "./Brat.js"
import { useEffect, useState } from "react";
const tabListNoTitle = [
  {
    key: 'Tool Information',
    tab: 'Tool Information',
  },
  {
    key: 'Project Details',
    tab: 'Project Details',
  },
  {
    key: 'Demo',
    tab: 'Demo',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};
class OutputCard extends React.Component {
  // const [content, setContent] = useState([
  content = [
  ];
  contentTab = {
  }

  // setContent(content)
  state = { key: Object.keys(this.props.text)[0] }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };




  constructor(props) {
    super(props);
    console.log(this.props)

      Object.keys(this.props.text).map((data, index) => {
        console.log(index, data)

        let temp = { key: "", tab: "" }
        temp["key"] = data
        temp["tab"] = data
        console.log(this.props.text[data])



        if (data == "json") {
          let temp = JSON.stringify(this.props.text[data])
          this.contentTab[data] = <ReactJson src={JSON.parse(temp)} iconStyle={"triangle"} collapseStringsAfterLength={false} enableClipboard={false} displayDataTypes={false} />
        }
        else if (data=="brat"){
          this.contentTab[data]=<Brat conll={this.props.text["raw"]}/>
          
        }

        else {
          
          this.contentTab[data] = <Text style={{whiteSpace:"pre-wrap"}}>{`${this.props.text[data]}`}</Text>
        }
        

        this.content.push(temp)

        // setContent(content => [...content, temp])


      })

    
  }
    render(){
      return (
        <>
          <Card
            style={{ width: '100%' }}
            tabList={this.content}
            activeTabKey={this.state.key}

            onTabChange={key => {
              this.state.key = key;
              this.onTabChange(key, 'key');
            }}
          >
            {this.contentTab[this.state.key]}
          </Card>
        </>)
    }
  };


export default OutputCard;
