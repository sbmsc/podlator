import React from 'react';
import Utils from '../../utils/utils';
class SpeakerNo extends React.Component {
  state = {
    inp: false,
    speaker: this.props.speaker,
  };

  handleBlur = () => {
    console.log(this.props, 'props');
    this.props.handleSpeaker(this.state.speaker, this.props.key1);
    this.setState({ inp: false });
  };
  render() {
    let ret = '';
    if (this.props.startTime) {
      ret = Utils.secondsToStandard(Math.floor(this.props.startTime));
    }
    console.log('inp', this.props.key1);
    return (
      <div className="speakerContainer">
        {!this.state.inp ? (
          <h2 className="speakerName" onClick={() => this.setState({ inp: true })}>
            {this.props.speaker}
          </h2>
        ) : (
          <input
            value={this.state.speaker}
            onChange={(e) => this.setState({ speaker: e.target.value })}
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
