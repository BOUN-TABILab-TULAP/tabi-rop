import React from "react";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const TaskInformation = ({ authorSpecs }) => {
  
  return (
    <Collapse>
      <Panel header="Project Details" key="1">
        <div>
          <b>Papers: </b>
          <p>
            {
              authorSpecs["paper_names"].map((paper_name, index) => {
                return (<>
                        <a href={authorSpecs["paper_handles"][index]}>
                        {paper_name}
                        </a>
                        {authorSpecs["paper_names"].length-1 > index && " ,"}
                        </>
                        );})
              }
          </p>
        </div>
        <div>
          <b>Author(s) of the paper: </b>
          <p>
            {
              authorSpecs["paper_authors"].map((paper_author, index) => {
                return (<>
                        {paper_author}
                        {authorSpecs["paper_authors"].length-1 > index && " ,"}
                        </>
                        );})
              }
          </p>
        </div>
        <div>
          <b>Authors of the program: </b>
          <p>
            {
              authorSpecs["program_authors"].map((program_author, index) => {
                return (<>
                        {program_author}
                        {authorSpecs["program_authors"].length-1 > index && " ,"}
                        </>
                        );})
              }
          </p>
        </div>
        <div>
          <b>Program Links: </b>
          <p>
            {
              authorSpecs["program_links"].map((program_link, index) => {
                return (<>
                        <a href={program_link}>Program-{index+1}</a>
                        {authorSpecs["program_authors"].length-1 > index && " ,"}
                        </>
                        );})
              }
          </p>
        </div>
      </Panel>
    </Collapse>
  );
};

export default TaskInformation;
