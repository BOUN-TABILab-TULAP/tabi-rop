import equal from "fast-deep-equal";
import "./brat_css/style-vis.css";
import React from "react";
import setState from "react-dom"
import SkeletonInput from "antd/lib/skeleton/Input";


var colldata = {
  'entity_types': [
    // this is optional
    {
      'type': 'SPAN_DEFAULT',
      'bgColor': '#7fa2ff',
      'borderColor': 'darken'
    },
    {
      'type': 'ARC_DEFAULT',
      'color': 'black',
      'arrowHead': 'triangle,5',
      'labelArrow': 'triangle,3,5',
    },
    {
      'type': 'token',
      'labels': ['\u00A0\u00A0'], // non-breaking space for empty
    },
    {
      'type': '-',
      'labels': ['\u00A0\u00A0'], // non-breaking space for empty
    }
  ],
  'event_attribute_types': [],
  'entity_attribute_types': [
    {
      'type': 'Name',
      'values': {
        'Name': { 'glyph': '(N)' },
      },
    },
  ],
  'relation_types': [
   
            {
                'type': 'subj',
                'labels': [ 'subj' ],
                'dashArray': '3,3',
                'color': 'green',
                'args': [
                    {
                        'role': 'arg1',
                        'targets': [ 'token' ]
                    },
                    {
                        'role': 'arg2',
                        'targets': [ 'token' ]
                    }
                ]
            }
  ],
  'event_types': [],
};

class Brat extends React.Component {
  constructor(props) {
    super(props);
   
    this.con=""
    
  }
  componentDidMount() {
    // const head_script = document.createElement("script");
    // head_script.type = "text/javascript";
    // head_script.src = "../brat/head.js";
    // head_script.setAttribute("id", "headjs");

    // const loader_script = document.createElement("script");
    // loader_script.src = "../brat/brat_loader.js";
    // loader_script.type = "text/javascript";
    // loader_script.setAttribute("id", "loader_script");

    // head_script.onload = () => {
    //   document.body.appendChild(loader_script);
    //   console.log("Brat header script is loaded");
    //   this.setState({conll:this.props.conll})

    // };

    // loader_script.onload = () => {
    //   console.log("Brat loader script is loaded.");
    //   this.setState({conll:this.props.conll});
    // }
    // if (document.getElementById("headjs") === null) {
    //   console.log("headjs yyukleniyor");
    //   // keep the scripts loaded all the time, and don't reload
    //   document.head.appendChild(head_script);

    // }
    this.updateImage()

  }

  // componentDidUpdate(prevProps) {
  //  console.log("didupdate calismiyor")
  //   this.updateImage();
   
  // }

  conllu_parser = function (conll) {
    var doc = new window.ConllU.Document();

    var includeEmpty = true;    // assume empty nodes are always shown

    var a = doc.parse(conll, console.log, true).toBrat(console.log, includeEmpty);
    console.log(a);
    return a;
  }


  updateImage() {
    if (typeof window.Util === "undefined") {
      console.log("dvdfsdd")
      

     return
    }
    this.con = this.conllu_parser(this.props.conll)
    console.log(this.con);

    if (typeof this.dispatcher === "undefined") {
      this.dispatcher = window.Util.embed(
        "embedding-brat",
        colldata,
        this.con,
        window.webFontURLs
      );
    }
    this.dispatcher.post("collectionLoaded", [
      { collection: null, ...colldata },
    ]);
    this.dispatcher.post("requestRenderData", [this.con]);
  }

 

  render() {
    console.log("bok");

    return <>
      <div id="embedding-brat">
      </div>
    </>
  }
}

export default Brat;
