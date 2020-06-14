import React from 'react';
import bbckaldi from '../../apis/bbckaldi';
import NotesMenu from './NotesMenu';
import SpeakerNo from './SpeakerNo';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-modal';
import fileSaver from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Redirect } from 'react-router-dom';
import Utils from '../../utils/utils';
class Transcript extends React.Component {
  state = {
    id: '',
    transcript: [],
    step: 1,
    paused: true,
    playbackSpeed: 1,
    playbackVolume: 100,
    exportSpeaker: false,
    exportTimestamp: false,
    exportHighlight: false,
    inline: true,
    redirect: false,
  };

  componentDidMount = async () => {
    const { id, rss } = this.props;
    if (id) {
      localStorage.setItem('t_id', id);
      this.setState({ id: id });
    }
    if (rss === true) {
      localStorage.setItem('rss', true);
    }
    if (rss === false) localStorage.setItem('rss', false);

    const t_id = localStorage.getItem('t_id');
    this.setState({ id: t_id });
    const rssCheck = localStorage.getItem('rss');
    let response;
    if (rssCheck === true || rssCheck === 'true') {
      response = await bbckaldi.get('/episode/' + t_id);
      this.props.getTitle({
        title: response.data.title,
        img: response.data.image,
      });
      if (!response.data.transcription)
        await bbckaldi
          .get('/transcribe/' + t_id)
          .then((resp) => (response = resp))
          .catch((error) => {
            alert('something went wrong with server');
            this.setState({ redirect: true });
          });
      await this.setState({
        transcript: response.data.transcription,
        src: response.data.url,
        title: response.data.title,
      });
    } else {
      response = await bbckaldi.get('/episode/' + t_id).catch((err) => {
        alert('Server was unable to transcribe the given file');
        this.setState({ redirect: true });
      });
      this.props.getTitle({
        title: response.data.title,
        img: response.data.image,
      });
      if (!response.data.transcription)
        response = await bbckaldi.get('/transcribe/' + t_id).catch((err) => {
          alert('Server was unable to transcribe the given file');
          this.setState({ redirect: true });
        });

      let getUrl = await bbckaldi.get('/episode/' + t_id + '/generate_url');
      if (!getUrl)
        getUrl =
          response !== undefined
            ? { data: { url: response.data.url } }
            : { data: { url: '' } };
      if (!response) response = { data: { transcription: [] } };
      await this.setState({
        transcript: response.data.transcription,
        src: getUrl.data.url,
      });
    }

    if (id) localStorage.setItem('t_id', id);

    if (response.data.transcription) {
      response.data.transcription.forEach((result, arrkey) =>
        result.words.forEach((ele, key) => {
          const str = arrkey + '' + key;
          const str2 = arrkey + '' + key + 'i';
          this.setState({ [str2]: ele.word, [str]: ele.word });
        })
      );
    } else {
      alert('Transcript could not be fetched for this audio');
      this.setState({ redirect: true });
    }
  };
  getTimestamp = (input) => {
    return Utils.secondsToStandard(Math.floor(input));
  };
  exportData = () => {
    const { exportSpeaker, exportTimestamp } = this.state;
    console.log('Spaker', exportSpeaker);
    console.log('timestamp', exportTimestamp);
    let doc = new Document();
    let children = [];

    this.state.transcript.forEach((e) => {
      let child = [];
      if (exportSpeaker) {
        child.push(
          new TextRun({
            text: e.speaker,
            bold: true,
          })
        );
      }
      if (exportTimestamp) {
        const text = ' (' + this.getTimestamp(e.words[0].start) + ') - ';
        child.push(
          new TextRun({
            text,
            bold: true,
          })
        );
      }
      child.push(
        new TextRun({
          text: e.text,
        })
      );
      children.push(
        new Paragraph({
          children: child,
          spacing: {
            after: 200,
          },
        })
      );
    });
    doc.addSection({
      children,
    });
    console.log(children);
    Packer.toBlob(doc).then((blob) => {
      fileSaver.saveAs(blob, this.state.title + '.docx');
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { transcript } = this.state;
    const mappedio = transcript.map((set, arrkey) => {
      const transcripter = set.words; //here
      let textString = '';
      const words = transcripter.map((ele, key) => {
        const str = arrkey + '' + key; //here
        textString = textString + this.state[str] + ' ';
        const newObj = {
          start: ele.start,
          end: ele.end,
          conf: ele.conf,
          word: this.state[str],
        };
        return newObj;
      });
      return { words: words, text: textString, speaker: set.speaker };
    });
    console.log(mappedio);
    const edit = {
      transcription: mappedio,
    };
    await bbckaldi
      .put('/episode/' + this.props.id, edit)
      .then((resp) => alert('saved sucessfully'))
      .catch((error) => alert('couldnt save'));
  };
  opentranscript = (transcript, arrkey) => {
    const { src } = this.state;

    if (src === undefined) {
      return <br></br>;
    } else {
      const mappedWord = transcript.map((ele, key) => {
        const strKey = arrkey + '' + key;
        const str1 = arrkey + '' + key + 'i';
        const str2 = arrkey + '' + key + 'hidi';
        const str3 = arrkey + '' + key + 'hid';

        if (ele)
          return (
            <div style={{ display: 'inline' }} key={key}>
              <span
                id={strKey}
                onClick={this.handleWordClick(ele.word, strKey)}
                hidden={this.state[str3] ? this.state[str3] : false}
              >
                {' '}
                {this.state[strKey]}{' '}
              </span>
              <input
                type='text'
                id={str1}
                name={str1}
                value={this.state[str1]}
                hidden={
                  this.state[str2] === undefined ? true : this.state[str2]
                }
                onChange={this.handleChange(strKey, str1)}
                onBlur={this.handleBlur(str2, str3)}
                onSubmit={this.handleBlur(str2, str3)}
                onKeyUp={this.handleEnter(str2, str3)}
              />
            </div>
          );
        else
          return (
            <span id={key} key={key}>
              {' '}
              {ele.word} <br />
            </span>
          );
      });

      return (
        <div style={{ overflowY: 'auto', paddingLeft: '20px' }}>
          {' '}
          {mappedWord}
        </div>
      );
    }
  };
  handleEnter = (input1, input2) => (e) => {
    if (e.keyCode === 13 || e.which === 13)
      this.setState({ [input1]: true, [input2]: false });
  };
  handleBlur = (input1, input2) => (e) => {
    this.setState({ [input1]: true, [input2]: false });
  };
  handleChange = (input1, input2) => (e) => {
    this.setState({ [input1]: e.target.value, [input2]: e.target.value });
  };
  handleWordClick = (word, index) => async (ele) => {
    const str = index + 'hidi';
    const str1 = index + 'i';
    const str2 = index + 'hid';
    document.getElementById(str1).focus();
    if (this.state.step === 1) {
      await this.setState({ [str2]: true, [str]: false, isOpen: str, step: 2 });
    } else {
      const { isOpen } = this.state;
      const close = isOpen.substring(0, isOpen.length - 1);
      await this.setState({
        [str2]: true,
        [str]: false,
        isOpen: str,
        [isOpen]: true,
        [close]: false,
      });
    }
  };
  handlePausePlay = (e) => {
    const audio = document.getElementById('audiofile');
    if (audio.paused) {
      this.setState({ paused: false });
      audio.play();
    } else {
      this.setState({ paused: true });
      audio.pause();
    }
  };
  setSongPosition = (e) => {
    //Gets the offset from the left so it gets the exact location.
    let obj = document.getElementById('slide');
    let songSliderWidth = obj.offsetWidth;
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let percentage = x / songSliderWidth;
    //Sets the song location with the percentage.
    this.setLocation(percentage);
  };
  setLocation = (percentage) => {
    let activeSong = document.getElementById('audiofile');
    const current = Math.round(activeSong.duration * percentage);
    activeSong.currentTime = current;
  };

  handleOpen = (x, y) => (e) => {
    if (this.state[x] === 'open' && this.state[y] === 'close') {
      this.setState({ [x]: 'close', [y]: 'close' });
      document.getElementById(x).style.display = 'none';
    } else if (this.state[x] === 'close' && this.state[y] === 'close') {
      this.setState({ [x]: 'open', [y]: 'close' });
      document.getElementById(x).style.display = '';
    } else {
      this.setState({ [x]: 'open', [y]: 'close' });
      document.getElementById(x).style.display = '';
      document.getElementById(y).style.display = 'none';
    }
  };
  handleControl = (input) => (e) => {
    this.setState({ [input]: e.target.value });
    let audio = document.getElementById('audiofile');
    if (input === 'playbackSpeed') audio.playbackRate = e.target.value;
    else audio.volume = e.target.value / 100;
  };
  handleTime = (event) => {
    let currentSeconds =
      (Math.floor(event.target.currentTime % 60) < 10 ? '0' : '') +
      Math.floor(event.target.currentTime % 60);
    let currentMinutes = Math.floor(event.target.currentTime / 60);
    let percentageOfSong = event.target.currentTime / event.target.duration;
    let percentageOfSlider =
      document.getElementById('slide').offsetWidth * percentageOfSong;

    document.getElementById('trackProgress').style.width =
      Math.round(percentageOfSlider) + 'px';
    this.setState({ time: { currentMinutes, currentSeconds } });

    const { transcript } = this.state;
    transcript.forEach((ele, arrkey) => {
      const transcripter = ele.words;
      transcripter.forEach((word, ind) => {
        const index = arrkey + '' + ind;
        if (
          event.target.currentTime >= word.start &&
          event.target.currentTime <= word.end
        ) {
          document.getElementById(index).style.background = 'yellow';
        } else if (event.target.currentTime >= word.end) {
          document.getElementById(index).style.background = 'none';
          document.getElementById(index).style.color = 'black';
        } else {
          document.getElementById(index).style.background = 'none';
          document.getElementById(index).style.color = 'blue';
        }
      });
    });
  };
  mapEverything = () => {
    const { transcript } = this.state;
    const mapped = transcript.map((ele, key) => {
      return (
        <div className='dialogue row' key={key}>
          <div className='left-text col-2'>
            <SpeakerNo speaker={ele.speaker} startTime={ele.words[0].start} />
          </div>
          <div className='transcribed-data col-10'>
            {this.opentranscript(ele.words, key)}
          </div>
          <br />
        </div>
      );
    }); //here
    return mapped;
  };

  openModal = () => {
    this.setState({
      selectedOption: true,
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        selectedOption: false,
      };
    });
  };
  extractOptions = async (event) => {
    event.persist();
    await this.setState({ [event.target.value]: event.target.checked });
  };
  exportFormatHandler = (event) => {
    console.log(event);
    this.setState({ inline: event.target.checked });
  };
  deleteEpisode = async () => {
    await bbckaldi
      .delete('/episode/' + this.state.id)
      .then((response) => {
        if (response.status === 200) {
          console.log('deleted successfully');
        }
      })
      .catch((err) => console.log(err.response.data.msg));
    this.setState({ redirect: true });
  };
  render() {
    const { src, transcript } = this.state;
    if (src === undefined || transcript === undefined)
      return (
        <center>
          {this.state.redirect ? <Redirect to='/'></Redirect> : ''}
          <Spinner animation='border' variant='primary' className='spinner ' />;
        </center>
      );
    else {
      return (
        <div>
          {this.state.redirect ? <Redirect to='/'></Redirect> : ''}
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
            <div className='exportModal'>
              <span className='exportModal-title'>Download Transcript</span>
              <div className='exportModal-subtitle'>
                Output Format <hr />
              </div>

              <div className='btn-group btn-group-toggle' data-toggle='buttons'>
                <label className='btn btn-primary active'>
                  <input
                    type='radio'
                    name='options'
                    id='inline'
                    autoComplete='off'
                    checked={this.state.inline}
                    onChange={(event) => this.exportFormatHandler(event)}
                  />{' '}
                  In-line
                </label>
                <label className='btn btn-primary'>
                  <input
                    type='radio'
                    name='options'
                    id='columns'
                    checked={this.state.inline}
                    autoComplete='off'
                  />{' '}
                  Columns
                </label>
              </div>

              <div className='exportModal-subtitle'>
                File Type <hr />
              </div>
              <div className='docType'>
                <span>Microsoft Document (docx)</span>
              </div>
              <div className='exportModal-subtitle'>
                Export Options <hr />
              </div>
              <div>
                <ul>
                  <li>
                    <input
                      type='checkbox'
                      checked={this.state.exportSpeaker}
                      value='exportSpeaker'
                      name='exportSpeaker'
                      onClick={this.extractOptions}
                      style={{ height: '17px', width: '17px' }}
                    />
                    {'  '}
                    <label htmlFor='exportSpeaker'>Include Speaker Names</label>
                  </li>
                  <li>
                    <input
                      type='checkbox'
                      checked={this.state.exportTimestamp}
                      value='exportTimestamp'
                      name='exportTimestamp'
                      onClick={(event) => this.extractOptions(event)}
                      style={{ height: '17px', width: '17px' }}
                    />
                    {'  '}
                    <label htmlFor='exportTimestamp'>Include Timestamps</label>
                  </li>
                  <li>
                    <input
                      type='checkbox'
                      checked={this.state.exportHighlight}
                      value='exportHighlight'
                      name='exportHighlight'
                      onClick={(event) => this.extractOptions(event)}
                      style={{ height: '17px', width: '17px' }}
                    />
                    {'  '}
                    <label htmlFor='exportHighlight'>
                      Include highlighted section only
                    </label>
                  </li>
                </ul>
              </div>
              <button
                className='bluebutton'
                style={{ margin: ' 0 auto' }}
                onClick={this.exportData}
              >
                Export
              </button>
            </div>
          </Modal>

          <div className='row sliderRow'>
            <div
              id='speed'
              style={{ display: 'none', textAlign: 'center' }}
              className='col-md-2 offset-md-7'
            >
              <label>{this.state.playbackSpeed}</label>
              <input
                type='range'
                min='0.5'
                max='2'
                step='0.1'
                value={this.state.playbackSpeed}
                onChange={this.handleControl('playbackSpeed')}
                className='slider'
              />
            </div>
            <div
              id='volume'
              style={{ display: 'none', textAlign: 'center' }}
              className='col-md-2 offset-md-8'
            >
              <label>{this.state.playbackVolume}</label>
              <input
                type='range'
                max='100'
                min='0'
                step='1'
                value={this.state.playbackVolume}
                onChange={this.handleControl('playbackVolume')}
                className='slider'
              />
            </div>
          </div>
          <div className='row audioPlayer'>
            <div className='col-1'>
              <button onClick={this.handlePausePlay} className='audioControls'>
                {this.state.paused ? (
                  <i className='fas fa-play fa-2x'></i>
                ) : (
                  <i className='fas fa-pause fa-2x'></i>
                )}
              </button>
            </div>
            <audio
              id='audiofile'
              src={src}
              onTimeUpdate={this.handleTime}
            ></audio>
            <div
              className='progress col-7'
              id='slide'
              onClick={(e) => this.setSongPosition(e)}
            >
              <div className='progress-bar' id='trackProgress' />
              <div id='songSlider' />
            </div>

            <div className='col-1' style={{ padding: '20px' }}>
              {this.state.time ? this.state.time.currentMinutes : '00'}:
              {this.state.time ? this.state.time.currentSeconds : '00'}
            </div>
            <div className='col-3'>
              <button
                className='audioControls'
                style={{ fontSize: '22px' }}
                onClick={this.handleOpen('speed', 'volume')}
              >
                {this.state.playbackSpeed}x
              </button>
              <button
                className='audioControls'
                onClick={this.handleOpen('volume', 'speed')}
              >
                <i className='fas fa-volume-up fa-2x'></i>
              </button>
              <button className='audioControls' onClick={this.handleSubmit}>
                <i className='fas fa-save fa-2x'></i>
              </button>
              <button className='exportBtn' onClick={this.openModal}>
                EXPORT
              </button>
            </div>
          </div>
          <div className='transcriptEditor'>
            <div className='row'>
              <div className='transcriptDisplay col-9'>
                {this.mapEverything()}
              </div>
              <div className='col-3'>
                <NotesMenu />
                <center>
                  <button
                    className='deleteBtn'
                    onClick={(e) => this.deleteEpisode()}
                  >
                    Delete Episode
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Transcript;
