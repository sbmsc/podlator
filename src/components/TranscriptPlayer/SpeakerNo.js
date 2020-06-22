import React from 'react';
import Utils from '../../utils/utils';
class SpeakerNo extends React.Component {
  state = {
    inp: false,
    speaker: this.props.speaker,
  };
  constructor(props)
  { super(props)
    this.setState({speaker: this.props.speaker})
  }
  componentDidMount=()=>
  {
    this.setState({speaker: this.props.speaker})
  }
  handleBlur = () => {
    
    this.props.handleSpeaker(this.props.speaker, this.props.key1);
    this.setState({ inp: false ,speaker:""});
  };
  render() {
    let ret = '';
    if (this.props.startTime) {
      ret = Utils.secondsToStandard(Math.floor(this.props.startTime));
    }

    return (
      <div className="speakerContainer">
        {!this.state.inp ? (
          <h2 className="speakerName" onClick={() => this.setState({ inp: true })}>
            {this.props.speaker}
          </h2>
        ) : (
          <input
            value={this.props.speaker}
            onChange={(e) => this.props.handleSpeakerInput(e.target.value,this.props.key1)}
            onBlur={(e) => this.handleBlur}
            className='speakerName'
            onKeyUp={(e) => {
              if (e.keyCode === 13 || e.which === 13) this.handleBlur();
            }}
          />
        )}
        <span className='startTime'>{ret}</span>
      </div>
    );
  }
}

export default SpeakerNo;
