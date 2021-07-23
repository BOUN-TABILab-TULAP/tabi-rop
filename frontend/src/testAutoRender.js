import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import { Button } from "antd";
import { postQuery } from "./utils";
import React, { useState, useEffect } from "react";


// Make modifications to the theme with your own fields and widgets

const Form = withTheme(AntDTheme);
//const Form = JSONSchemaForm.default;

const url = "/evaluate";


const schema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "textarea": {
      "type": "string",
      "title": "Premise"
    },
    "textarea_1": {
      "type": "string",
      "title": "Hypothesis"
    },
    "dropdown": {
      "type": "string",
      "title": "Language",
      "enum": [
        "Turkish",
        "English",
        "German"
      ],
      "enumNames": [
        "Turkish",
        "English",
        "German"
      ]
    },
    "checkboxes": {
      "type": "array",
      "title": "Algorithms",
      "items": {
        "type": "string",
        "enum": [
          "NLI",
          "NER",
          "Dependency-Parsing"
        ]
      },
      "uniqueItems": true,
      "additionalItems": {
        "type": "string",
        "enum": [
          "option-1",
          "option-2",
          "option-3"
        ]
      }
    }
  }
};

const uiSchema = {
  "textarea": {
    "ui:widget": "textarea"
  },
  "textarea_1": {
    "ui:widget": "textarea"
  },
  "checkboxes": {
    "ui:widget": "checkboxes"
  }
};

const formDataDefault = {
  "checkboxes": [
    "NLI",
    "NER"
  ],
  "textarea": "Ali is taller than Veli.",
  "textarea_1": "Veli is shorter than Ali.",
  "dropdown": "Turkish"
};

const log = (type) => console.log.bind(console, type);

const TestAutoRender = () => {
  const [formData, setFormData] = useState(formDataDefault);
  const [query, setQuery] = useState("");
  const handleSubmit = async () => {
    let response = await postQuery(url, formData);
    setQuery(response);
  };
  
  return (
    <div>
      
        <Form
    schema={schema}
    formData={formData}
    uiSchema={uiSchema}
    onChange={(e) => setFormData(e.formData)}
    onSubmit={handleSubmit}
    onError={log("errors")}
  />
  <body>
      {query}
  </body>    
    </div>
  );
};

export default TestAutoRender;
