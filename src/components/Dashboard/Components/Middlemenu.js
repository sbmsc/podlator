import React from "react";
import Filter from "./Filter";
import Episode from "./Episode";

class Middlemenu extends React.Component {
  renderEpisodes = () => {
    if (this.props.episodes) {
      const { episodes } = this.props;
      const mappedEpisodes = episodes.map((ele) => {
        return (
          <Episode
            key={ele.id}
            title={ele.title}
            filename={ele.filename}
            duration={ele.duration}
            id={ele._id}
          />
        );
      });
      return mappedEpisodes;
    }
  };

  render() {
    return (
      <div className="box-middle">
        <div className="box-middle-content">
          <Filter />
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
}

export default Middlemenu;
