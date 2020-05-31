import React from "react";
import LeftMenu from "./Components/LeftMenu";
import Middlemenu from "./Components/Middlemenu";
import Navbar from "../Navbar/Navbar";
import Rightbutton from "./Components/Rightbutton";
import Bigmenu from "./Components/Bigmenu";
import Modal from "react-modal";
import Dropzone from "react-dropzone";
import bbckaldi from "../../apis/bbckaldi";
import { getToken } from "../../session/session";
import { ProgressBar } from "react-bootstrap";
import volume from "../../images/volume.svg"
export default class Dashboard extends React.Component {
  state = {
    left: true,
    right: false,
    episodes: [],
    param: null,
    selectedOption: undefined,
  };

  componentDidMount() {
    bbckaldi.defaults.headers.common["token"] = getToken();

    this.setState({
      left: true,
    });
    this.getEpisodes();
    this.getRss();
    this.getManual();
    this.getIsEdited();
  }

  lefthandler = () => {
    this.setState({
      left: true,
      right: false,
      param: null,
    });
  };

  righthandler = () => {
    this.setState({
      left: false,
      right: true,
    });
  };
  getConfig = () => {
    const config = {
      headers: {
        token: getToken(),
      },
    };
    return config;
  };
  getEpisodes = async () => {
    const episodes = await bbckaldi.get("/episode");
    this.setState({ episodes: episodes.data });
  };
  getRss = async () => {
    const rss = await bbckaldi.get("/episode", { params: { source: "Rss" } });
    this.setState({ rss: rss.data });
  };
  getManual = async () => {
    const manual = await bbckaldi.get("/episode", {
      params: { source: "Manual" },
    });
    this.setState({ manual: manual.data });
  };
  getIsEdited = async () => {
    const isEdited = await bbckaldi.get("/episode", {
      params: { isEdited: true },
    });
    this.setState({ isEdited: isEdited.data });
  };

  handleClick = (param) => (e) => {
    if (param === "isEdited" || param === "manual") {
      this.setState({
        left: true,
        right: false,
      });
    } else if (param === "Feed") {
      this.righthandler();
    }
    this.setState({ param });
    console.log(param);
  };

  openModal = () => {
    this.setState({
      selectedOption: true,
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        selectedOption: undefined,
      };
    });
  };
  openModal2 = () => {
    this.setState({
      selectedOption2: true,
    });
  };

  closeModal2 = () => {
    this.setState(() => {
      return {
        selectedOption2: undefined,
      };
    });
  };

  handleModalMessage = () => {
    if (this.state.uploading === "in progress")
      return (
        <div>
          <img src={volume} alt="volume" style={{margin: "15px"}}/>
          <h1>Uploading and transcribing</h1>
          <p className="percent">{this.state.percentCompleted} %</p>
          <ProgressBar animated now={this.state.percentCompleted}/>
        </div>
      );
    else return <h1>Completed</h1>;
  };

  handleDrop = async (accepted) => {
    this.setState({ uploading: "in progress" });
    const currentFile = accepted[0];
    console.log(currentFile);
    var formData = new FormData();

    await formData.append("file", currentFile);
    formData.append("transcribe", true);
    const response = await bbckaldi.post("/upload", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        this.setState({ percentCompleted });
      },
    });
    console.log(response);
    this.setState({ uploading: "uploaded" });
    this.closeModal();
    this.setState({ uploading: undefined });
    window.location.reload();
  };

  handleURL = (e) => {
    this.setState({ url: e.target.value });
  };
  handleRss = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    const response = await bbckaldi.post("/feed/add", { url });
    console.log(response);
    this.closeModal2();
  };
  render() {
    const { param } = this.state;
    return (
      <div className="dashboard">
        <Modal
          isOpen={this.state.selectedOption}
          onRequestClose={this.closeModal}
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
          <div className="modalContent">
            {!this.state.uploading ? (
              <Dropzone onDrop={this.handleDrop} accept="audio/mpeg">
                {({ getRootProps, getInputProps, isDragReject }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragReject && (
                        <h1>
                          Select or drag & drop your file in this area to get
                          started
                        </h1>
                      )}
                      {isDragReject && <h1> Supports only mp3</h1>}
                      <button className="bluebutton">SELECT</button>
                    </div>
                  </section>
                )}
              </Dropzone>
            ) : (
              this.handleModalMessage()
            )}
          </div>
        </Modal>
        <Modal
          isOpen={this.state.selectedOption2}
          onRequestClose={this.closeModal2}
          contentLabel="sometext"
          closeTimeoutMS={200}
          ariaHideApp={false}
          className="uploadModal"
          style={{
            overlay: {
              backgroundColor: "rgb(33,142,232,0.9)",
            },
          }}
        ><div className="rssFeedModal">

          <input
            type="text"
            name="rssUrl"
            onChange={this.handleURL}
            value={this.state.value}
            placeholder="https://example.com/podcasts"
          />
          <button className="add-button" onClick={this.handleRss}>
            Add
          </button>
        </div>
        </Modal>
        <Navbar />
        <div className="select row">
          <button
            className="epBtn col"
            onClick={() => {
              this.lefthandler();
            }}
          >
            <span className="dot-top">
              <i className="fas fa-copy buttonIcons"></i>
            </span>
            <span className="btnTitle">Episodes & Transcripts</span>
            <span>
              {this.state.left && <i className="fas fa-check tick"></i>}
            </span>
          </button>
          <button
            className="feedBtn col"
            onClick={() => {
              this.righthandler();
            }}
          >
            <span className="dot-top">
              <i className="fas fa-rss buttonIcons"></i>
            </span>
            <span className="btnTitle">Podcast Feeds</span>
            <span>
              {this.state.right && <i className="fas fa-check tick"></i>}
            </span>
          </button>
        </div>

        {this.state.left ? (
          <div className="row main">
            <div className="col-md-2">
              <LeftMenu handleClick={this.handleClick} />
            </div>
            <div className="col-md-8">
              <Middlemenu
                episodes={
                  this.state.param === null
                    ? this.state.episodes
                    : this.state[param]
                }
              />
            </div>
            <div className="col-md-2">
              <Rightbutton clicked={this.openModal} />
            </div>
          </div>
        ) : (
          <div className="main">
            <Bigmenu rss={this.state.rss} getRSSModal={this.openModal2} />
          </div>
        )}
      </div>
    );
  }
}
