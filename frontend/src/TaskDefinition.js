import React, { Fragment } from "react";
import { Collapse } from "antd";
import { useTranslation, withTranslation } from "react-i18next";
import Text from "antd/lib/typography/Text";

const { Panel } = Collapse;

const TaskDefinition = ({ tool }) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {

        <Collapse defaultActiveKey={["1"]}>
          <Panel header={"Tool Information"} key="1" style={{ whiteSpace: "pre-wrap" }}>
            <div >
              <b>Description: </b>
              <div>
                {tool["description"] + "\n\n"}
              </div>
            </div>
            {tool["contact"] &&
              <div >
                <b>Contact Information: </b>
                <div>
                  {tool["contact"] + "\n\n"}
                </div>
              </div>}

            {tool['usageInformation'] != null &&
              <div>
                <b>Usage Information: </b>
                <div>
                  {tool["usageInformation"] + "\n\n"}
                </div>
              </div>
            }
            {tool['citing'] != null &&
              <div>
                <b>Citation: </b>
                <div>
                  {tool["citing"] + "\n\n"}
                </div>
              </div>
            }
            {tool['funding'] != null &&
              <div>
                <b>Funding: </b>
                <div>
                  {tool["funding"]}
                </div>
              </div>
            }
          </Panel>
        </Collapse>
      }
    </div>

  );
};

export default TaskDefinition;
