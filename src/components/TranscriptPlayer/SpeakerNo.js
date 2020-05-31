import React from "react";

const SpeakerNo = (props) => {
  let ret = "";
  if (props.startTime) {
    let time = Math.floor(props.startTime);
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  }
  return (
    <div>
      <p>{props.speaker}</p>
      <span className="startTime">{ret}</span>
    </div>
  );
};

export default SpeakerNo;
