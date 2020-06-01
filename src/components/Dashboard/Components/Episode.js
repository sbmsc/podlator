import React from "react";
import { Link } from "react-router-dom";

const Episode = (props) => {
  // changing seconds to hours:minutes:seconds
  let ret = "";
  if(props.duration){
    let time = props.duration;
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  }
  console.log(props)
  return (
    <div>
      <div className="row listitem" style={{textAlign: "center"}}>
        <div className="col-1">
          <i className="fas fa-check"></i>
        </div>
        <div className="col-8 title">
          {props.rss==='Rss'?
         ( <Link to={{ pathname: "/transcriber", id: props.id ,rss:true}}>
            {" "}
            <h3>{props.title}</h3>
          </Link>):
          ( <Link to={{ pathname: "/transcriber", id: props.id ,rss:false}}>
          {" "}
          <h3>{props.title}</h3>
        </Link>)}
        </div>
        <div className="col-1">
          <p className="duration">{ret}</p>
        </div>
        <div className="col-1">
          <span className="dot">
            <i className="fas fa-rss righticons"></i>
          </span>
          </div>
        <div className="col-1">
          <span className="dot2">
            <i className="fas fa-folder-open righticons"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Episode;
