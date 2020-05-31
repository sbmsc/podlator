import React from "react";
import { TimedTextEditor } from "@bbc/react-transcript-editor";
import trans from "../trans.json";

class Transcript extends React.Component {
  state = {
    data: "yes",
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <TimedTextEditor
          transcriptData={trans}
          mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
          handleAutoSaveChanges={this.handleAutoSaveChanges}
          autoSaveContentType={"digitalpaperedit"}
          isEditable={true}
          spellCheck={false}
          sttJsonType={"bbckaldi"}
          handleAnalyticsEvents={this.handleAnalyticsEvents}
          fileName={"ted-talk.mp4"}
          title={"Ted Talk"}
          ref={this.transcriptEditorRef}
        />
      </div>
    );
  }
}

export default Transcript;
