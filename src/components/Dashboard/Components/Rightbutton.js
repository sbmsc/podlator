import React from "react";
import upload from "../../../images/upload.svg";
const Rightbutton = (props) => (
  <div className="box-right" onClick={props.clicked}>
    <img src={upload} alt="upload"></img>
    <h3>Upload files to transcribe</h3>
  </div>
);

export default Rightbutton;
