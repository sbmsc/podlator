import React from "react";
import Filter from "./Filter";
import Episode from "./Episode";
import bbckaldi from "../../../apis/bbckaldi";
import Modal from "react-modal";
import volume from "../../../images/volume.svg";
import edit from "../../../images/edit.svg";
import transcribeImg from "../../../images/transcribe.svg";
import { Link } from "react-router-dom";
class Middlemenu extends React.Component {
  state = {
    transcribeFile: false,
    transcribed: false,
  };
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
            transcribeEpisode={this.transcribeEpisode}
            openTranscribeModal={this.openTranscribeModal}
            closeTranscribeModal={this.closeTranscribeModal}
          />
        );
      });
      return mappedEpisodes;
    }
  };
  openTranscribeModal = (props) => {
    this.setState({
      transcribeFile: true,
      props,
    });
  };

  closeTranscribeModal = () => {
    this.setState(() => {
      return {
        transcribeFile: false,
      };
    });
  };
  transcribeEpisode = async (id) => {
    if (this.state && this.state.transcribeFile) {
      this.closeTranscribeModal();
    }
    await bbckaldi
      .get("/transcribe/" + id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log("Something went wrong while transcribing");
      });
  };
  deleteEpisode = async (id, index, source, isEdited) => {
    await bbckaldi
      .delete("/episode/" + id)
      .then((response) => {
        if (response.status === 200) {
          console.log("Episode deleted successfully");
        }
      })
      .catch((err) => console.log(err.response.data.msg));
    this.props.episodes.splice(index, 1);
    this.props.delParamWise(source, isEdited);
    this.setState({ tab: true });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.transcribeFile}
          onRequestClose={this.closeTranscribeModal}
          contentLabel="sometext"
          closeTimeoutMS={200}
          ariaHideApp={false}
          className="uploadModal"
          style={{
            overlay: {
              backgroundColor: "rgb(33,142,232,0.9)",
            },
          }}
        >
          <div className="loadTranscribeModal">
            <img src={volume} alt="volume" style={{ margin: "15px" }} />
            <h2>{this.state.props ? this.state.props.title : ""}</h2>
            {this.state.props && this.state.props.isTranscribed ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <span>
                  There is already a transcript available for this episode.
                  <br />
                  Hit transcribe to start a new one or open to load the editor.
                </span>
                <br />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Link
                    to={{
                      pathname: "/transcriber",
                      id: this.state.props.id,
                      rss: this.state.props.source === "Rss" ? true : false,
                      title: this.state.props.title,
                    }}
                  >
                    <button
                      className="bluebutton align-items-center"
                      onClick={this.handleLoad}
                    >
                      Load Transcript
                      <img src={edit} alt="load" />
                    </button>
                  </Link>
                  <button
                    className="bluebutton align-items-center"
                    onClick={() => {
                      this.closeTranscribeModal();
                      this.props.handleTranscribe(this.state.props.id,this.state.props.title);
                    }}
                  >
                    Transcribe Again
                    <img src={transcribeImg} height="35px" alt="transcribe" />
                  </button>
                </span>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <span>
                  No Transcript is available for this episode.
                  <br /> Hit Transcribe to launch a transcription job.
                  <br /> You will get a notification when transcription is done.
                </span>
                <button
                  className="bluebutton align-items-center"
                  onClick={() => {
                    this.closeTranscribeModal();
                    this.props.handleTranscribe(this.state.props.id,this.state.props.title);
                  }}
                >
                  Transcribe
                  <img src={transcribeImg} height="35px" alt="transcribe" />
                </button>
              </div>
            )}
          </div>
        </Modal>
        <div className="box-middle">
          <div className="box-middle-content">
            <Filter />
            {this.renderEpisodes()}
          </div>
        </div>
      </div>
    );
  }
}

export default Middlemenu;
