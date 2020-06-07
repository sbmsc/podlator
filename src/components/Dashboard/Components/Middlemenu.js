import React from "react";
import Filter from "./Filter";
import Episode from "./Episode";

class Middlemenu extends React.Component {
  renderEpisodes = () => {
    if (this.props.episodes && this.props.episodes.length > 0) {
      const { episodes } = this.props;
      const mappedEpisodes = episodes.map((ele) => {
        return (
          <Episode
            key={ele.id}
            title={ele.title}
            source={ele.source}
            filename={ele.filename}
            duration={ele.duration}
            isEdited={ele.isEdited}
            isTranscribed={ele.transcription ? true : false}
            id={ele._id}
            rss={ele.source}
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
