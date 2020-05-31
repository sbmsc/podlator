import React from "react";
import Navbar from "../Navbar/Navbar";
import Transcript from "./Transcripter";

export default class Transcriber extends React.Component {
  render() {
    console.log(this.props.location);
    return (
      <div style={{height: "100vh", padding: "20px 20px 20px 20px"}}>
        <Navbar/>
        <Transcript id={this.props.location.id} />
      </div>
    );
  }
}
