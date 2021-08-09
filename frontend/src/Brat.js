import equal from "fast-deep-equal";
import "./brat_css/style-vis.css";
import React from "react";

//TODO: need to fix this later
const PUBLIC_URL = "localhost:3000/";

class Brat extends React.Component {
  constructor(props) {
    super(props);
    this.updateImage = this.updateImage.bind(this);
  }
  componentDidMount() {
    const head_script = document.createElement("script");
    head_script.type = "text/javascript";
    head_script.src = PUBLIC_URL + "brat/head.js";
    head_script.setAttribute("id", "headjs");

    const loader_script = document.createElement("script");
    loader_script.src = PUBLIC_URL + "brat/brat_loader.js";
    loader_script.type = "text/javascript";
    loader_script.setAttribute("id", "loader_script");

    head_script.onload = () => {
      document.body.appendChild(loader_script);
      console.log("Brat header script is loaded");
    };

    loader_script.onload = () => {
      console.log("Brat loader script is loaded.");
    };
    if (document.getElementById("headjs") === null) {
      // keep the scripts loaded all the time, and don't reload
      document.head.appendChild(head_script);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !equal(this.props.coll, prevProps.coll) ||
      !equal(this.props.doc, prevProps.doc)
    ) {
      this.updateImage();
    }
  }

  updateImage() {
    if (typeof window.Util === "undefined") {
      return;
    }

    let collData = this.props.coll || {};
    let docData = this.props.doc || {};

    if (typeof this.dispatcher === "undefined") {
      this.dispatcher = window.Util.embed(
        "embedding-brat",
        collData,
        docData,
        window.webFontURLs
      );
    }
    this.dispatcher.post("collectionLoaded", [
      { collection: null, ...collData },
    ]);
    this.dispatcher.post("requestRenderData", [docData]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return <div id="embedding-brat"></div>;
  }
}

export default Brat;
