import React from "react";
import Filter from "./Filter";
import Episode from "./Episode";

class Bigmenu extends React.Component {
  renderRss = () => {
    if (this.props.rss) {
      const { rss } = this.props;

      const mappedrss = rss.map((ele) => {
        return (
          <Episode
            key={ele.id}
            title={ele.title}
            filename={ele.published}
            id={ele.id}
            duration={ele.duration}
            rss={ele.source}
          />
        );
      });
      return mappedrss;
    } else {
      return <h1>Loading</h1>;
    }
  };

  render() {
    return (
      <div className="box-big">
        <div className="box-middle-content">
          <div className="row" style={{ width: "100%" }}>
            <div className="col-9">
              <Filter />
            </div>
            <div className="col-3">
              <button
                className="add-button"
                onClick={(e) => {
                  this.props.getRSSModal();
                }}
              >
                <i
                  className="fas fa-plus-circle"
                  style={{ marginRight: 5 + "px" }}
                >
                  {" "}
                </i>
                Add Feed
              </button>
            </div>
          </div>
          {this.renderRss()}
          <br />
        </div>
      </div>
    );
  }
}

export default Bigmenu;
