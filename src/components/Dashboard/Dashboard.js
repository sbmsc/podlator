import React from 'react';
import LeftMenu from './Components/LeftMenu';
import Middlemenu from './Components/Middlemenu';
import Navbar from '../Navbar/Navbar';
import Rightbutton from './Components/Rightbutton';
import Bigmenu from './Components/Bigmenu';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import bbckaldi from '../../apis/bbckaldi';
import { getToken } from '../../utils/session';
import { ProgressBar } from 'react-bootstrap';
import volume from '../../images/volume.svg';
import epNtr from '../../images/epNtr.svg';
import rssBig from '../../images/rssBig.svg';
export default class Dashboard extends React.Component {
  state = {
    left: true,
    right: false,
    episodes: [],
    param: null,
    selectedOption: undefined,
    newfeed: [],
    percentTranscribeCompleted: 0,
    rssFeedList: [],
  };

  componentDidMount() {
    bbckaldi.defaults.headers.common['token'] = getToken();

    this.setState({
      left: true,
    });
    this.getEpisodes();
    this.getRss();
    this.getManual();
    this.getIsEdited();
    this.getRssFeedList();
  }

  lefthandler = () => {
    if (
      this.state.rss.length !== this.state.newfeed.length &&
      this.state.newfeed.length !== 0
    ) {
      this.getEpisodes();
      this.getRss();
    }
    this.setState({
      left: true,
      right: false,
      param: null,
      addfeed: false,
    });
  };

  righthandler = () => {
    this.setState({
      left: false,
      right: true,
      addfeed: false,
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
  getRssFeedList = async () => {
    await bbckaldi
      .get('/rss')
      .then((response) => {
        this.setState({ rssFeedList: response.data });
      })
      .catch((err) => {
        console.log('could not fetch rss');
        console.log(err);
      });
  };
  getEpisodes = async () => {
    const episodes = await bbckaldi.get('/episode');
    this.setState({ episodes: episodes.data });
  };
  getRss = async () => {
    const rss = await bbckaldi.get('/episode', { params: { source: 'Rss' } });
    this.setState({ rss: rss.data });
  };
  getManual = async () => {
    const manual = await bbckaldi.get('/episode', {
      params: { source: 'Manual' },
    });
    this.setState({ manual: manual.data });
  };
  getIsEdited = async () => {
    const isEdited = await bbckaldi.get('/episode', {
      params: { isEdited: true },
    });
    this.setState({ isEdited: isEdited.data });
  };

  handleClick = (param) => (e) => {
    this.setState({
      left: true,
      right: false,
    });

    this.setState({ param });
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
  handleTranscribe = async () => {
    this.setState({ uploading: undefined });
    this.closeModal();

    bbckaldi
      .get('/transcribe/' + this.state.uploadedID, {
        // onUploadProgress: (progressEvent) =>{
        //   let percentCompleted = Math.floor(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );
        //   console.log("Percentage Completed", progressEvent);
        //   this.setState({ percentTranscribeCompleted : percentCompleted });
        // }
      })
      .then((resp) => {
        clearInterval(progress);
        this.setState({ percentTranscribeCompleted: 100 });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.msg === 'No subscription found')
          alert(error.response.data.msg + '\nPlease subscribe to a plan!');
        else {
          alert('Something went wrong');
          window.location.reload();
        }
      });

    var progress = window.setInterval(
      () =>
        this.setState({
          percentTranscribeCompleted: this.state.percentTranscribeCompleted + 1,
        }),
      500
    );
    if (this.state.percentCompleted === 99) clearInterval(progress);
  };

  handleModalMessage = () => {
    if (this.state.uploading === 'in progress')
      return (
        <div>
          <img src={volume} alt='volume' style={{ margin: '15px' }} />
          <h1>Uploading</h1>
          <h3 className='percent'>{this.state.percentCompleted} %</h3>
          <ProgressBar animated now={this.state.percentCompleted} />
        </div>
      );
    else
      return (
        <div>
          <h1>{this.state.uploadedTitle}</h1>
          <button className='bluebutton' onClick={this.handleTranscribe}>
            Transcribe
          </button>
        </div>
      );
  };

  handleDrop = async (accepted) => {
    this.setState({ uploading: 'in progress' });
    const currentFile = accepted[0];
    var formData = new FormData();

    await formData.append('file', currentFile);
    formData.append('transcribe', true);
    const response = await bbckaldi.post('/episode/upload', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        this.setState({ percentCompleted });
      },
    });

    this.setState({
      uploading: 'uploaded',
      uploadedTitle: response.data.title,
      uploadedID: response.data.id,
    });
  };
  delParamWise = (param, isEdited) => {
    this.getEpisodes();
    if (isEdited) this.getIsEdited();
    if (param === 'Manual') this.getManual();
    if (param === 'Rss') this.getRss();
  };
  handleURL = (e) => {
    this.setState({ url: e.target.value });
  };
  handleRss = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    const response = await bbckaldi.post('/feed/add', { url });
    this.setState({ newfeed: response.data });
    this.getRssFeedList();
    this.getEpisodes();
    this.getRss();
    this.getManual();
    this.getIsEdited();
    this.closeModal2();
  };
  adjustedRightHandler = () => {
    this.setState({
      left: false,
      right: true,
      addfeed: true,
    });
  };
  render() {
    const { param } = this.state;
    return (
      <div className='dashboard'>
        <Modal
          isOpen={this.state.selectedOption}
          onRequestClose={this.closeModal}
          contentLabel='sometext'
          closeTimeoutMS={200}
          ariaHideApp={false}
          className='uploadModal'
          style={{
            overlay: {
              backgroundColor: 'rgb(33,142,232,0.9)',
            },
          }}
        >
          <div className='modalContent'>
            {!this.state.uploading ? (
              <Dropzone onDrop={this.handleDrop} accept='audio/*'>
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
                      <button className='bluebutton'>SELECT</button>
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
          contentLabel='sometext'
          closeTimeoutMS={200}
          ariaHideApp={false}
          className='uploadModal'
          style={{
            overlay: {
              backgroundColor: 'rgb(33,142,232,0.9)',
            },
          }}
        >
          <div className='rssFeedModal'>
            <input
              type='text'
              name='rssUrl'
              onChange={this.handleURL}
              value={this.state.value}
              placeholder='https://example.com/podcasts'
            />
            <button className='add-button' onClick={this.handleRss}>
              Add
            </button>
          </div>
        </Modal>
        <Navbar
          title={this.state.uploadedTitle}
          transcribeCompleted={this.state.percentTranscribeCompleted}
        />
        <div className='select row'>
          <button
            className='epBtn col'
            onClick={() => {
              this.lefthandler();
            }}
          >
            <span className='dot-top'>
              <img
                src={epNtr}
                alt='episodes'
                style={{ height: '30px', margin: '7px 0' }}
              />
            </span>
            <span className='btnTitle'>Episodes & Transcripts</span>
            <span>
              {this.state.left && <i className='fas fa-check tick'></i>}
            </span>
          </button>
          <button
            className='feedBtn col'
            onClick={() => {
              this.adjustedRightHandler();
            }}
          >
            <span className='dot-top'>
              <img
                src={rssBig}
                alt='rss'
                style={{ height: '30px', margin: '7px 0' }}
              />
            </span>
            <span className='btnTitle'>Podcast Feeds</span>
            <span>
              {this.state.right && <i className='fas fa-check tick'></i>}
            </span>
          </button>
        </div>

        {this.state.left ? (
          <div className='row main'>
            <div className='col-md-2'>
              <LeftMenu handleClick={this.handleClick} />
            </div>
            <div className='col-md-8'>
              <Middlemenu
                episodes={
                  this.state.param === null
                    ? this.state.episodes
                    : this.state[param]
                }
                type={this.state.param}
                delParamWise={this.delParamWise}
              />
            </div>
            <div className='col-md-2'>
              <Rightbutton clicked={this.openModal} />
            </div>
          </div>
        ) : (
          <div className='main'>
            {this.state.addfeed ? (
              <Bigmenu
                // rss={this.state.newfeed}
                rssFeedList={this.state.rssFeedList}
                getRSSModal={this.openModal2}
              ></Bigmenu>
            ) : (
              <Bigmenu
                rssFeedList={this.state.rssFeedList}
                // rss={this.state.rss}
                getRSSModal={this.openModal2}
              ></Bigmenu>
            )}
          </div>
        )}
      </div>
    );
  }
}
