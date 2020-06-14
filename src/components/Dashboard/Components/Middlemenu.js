import React from "react";
import Filter from "./Filter";
import Episode from "./Episode";
import bbckaldi from '../../../apis/bbckaldi'

class Middlemenu extends React.Component {
  renderEpisodes = () => {
    if (this.props.episodes && this.props.episodes.length > 0) {
      const { episodes } = this.props;
      const mappedEpisodes = episodes.map((ele, index) => {
        return (
          <Episode
            index={index}
            key={ele.id}
            title={ele.title}
            source={ele.source}
            filename={ele.filename}
            duration={ele.duration}
            isEdited={ele.isEdited}
            isTranscribed={ele.transcription ? true : false}
            id={ele._id}
            rss={ele.source}
            deleteEpisode={this.deleteEpisode}
            
          />
        );
      });
      return mappedEpisodes;
    }
  };
  deleteEpisode = async (id, index,source ,isEdited) => {
    await bbckaldi
      .delete('/episode/' + id)
      .then((response) => {
        if (response.status === 200) {
          console.log('Episode deleted successfully');
        }
      })
      .catch((err) => console.log(err.response.data.msg));
    this.props.episodes.splice(index, 1);
    this.props.delParamWise(source,isEdited)
    this.setState({tab:true})
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
