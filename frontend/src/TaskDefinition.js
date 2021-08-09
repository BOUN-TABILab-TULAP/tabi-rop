import React from "react";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const TaskDefinition = ({ authorSpecs }) => {
  const { i18n } = useTranslation();

  return (
    <div>
      {
        (i18n.language.slice(0, 2) === "en" || i18n.language.slice(0, 2) === "tr")
        &&
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={authorSpecs[i18n.language.slice(0, 2)]["project_name"]} key="1">
            <div>
              <b>Description: </b>
              <div>
                {authorSpecs[i18n.language.slice(0, 2)]["task_description"]
                  .split("\n")
                  .map((line) => (
                    <p>{line}</p>
                  ))}
              </div>
            </div>
            <div>
              <div>
                {authorSpecs[i18n.language.slice(0, 2)]["usage_info"]
                  .split("\n")
                  .map((line) => (
                    <p>{line}</p>
                  ))}
              </div>
            </div>
          </Panel>
        </Collapse>
      }
    </div>

  );
};

export default TaskDefinition;
