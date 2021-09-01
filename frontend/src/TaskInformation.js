import React from "react";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const TaskInformation = ({ tool }) => {

  return (
    <Collapse>
      <Panel header="Project Details" key="1">
        <div>
          <b>Version: </b>
          <p>
            {tool["version"]}
          </p>
        </div>
        {tool['domains'] &&
          <div>
            <b>Domains: </b>
            <p>
              {tool["domains"]}
            </p>
          </div>}
        {tool['bibtex'] &&
          <div>
            <b>Bibtex: </b>
            <p>
              {tool["bibtex"]}
            </p>
          </div>}
        {tool['doi'] &&
          <div>
            <b>Doi: </b>
            <p>
              {tool["doi"]}
            </p>
          </div>
        }
        {
          tool['links'] &&
          <div>
            <b>Related Links: </b>
            <ul>
              {
                tool['links'].map((program_link, index) => {
                  return (<>
                    <li>
                      <a href={program_link}>
                        {program_link.replaceAll("\"", "")}
                      </a>
                    </li>
                    {/* {["link1", "link2"].length - 1 > index && ", "} */}
                  </>
                  );
                })
              }
            </ul>
          </div>
        }
      </Panel>
    </Collapse>
  );
};

export default TaskInformation;
