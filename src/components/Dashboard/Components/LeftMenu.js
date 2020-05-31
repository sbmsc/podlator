import React from "react";

class LeftMenu extends React.Component {
  render() {
    return (
      <div className="box-left">
        <span className="item">
          <i className="fas fa-plus"></i> New Episode
        </span>
        <span className="item">
          <i className="far fa-edit"> </i>
          <a onClick={this.props.handleClick("isEdited")} href="#">
            Edited Episodes{" "}
          </a>
        </span>
        <span className="item">
          <i className="fas fa-rss"> </i>
          <a onClick={this.props.handleClick("Feed")} href="#">
            {" "}
            RSS feed Episodes
          </a>
        </span>
        <span className="item">
          <i className="fas fa-upload"> </i>
          <a onClick={this.props.handleClick("manual")} href="#">
            {" "}
            Uploaded Files
          </a>
        </span>
      </div>
    );
  }
}
export default LeftMenu;
