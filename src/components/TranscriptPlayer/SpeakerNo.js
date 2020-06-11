import React from 'react';
import Utils from '../../utils/utils';
const SpeakerNo = (props) => {
  let ret = '';
  if (props.startTime) {
    ret = Utils.secondsToStandard(Math.floor(props.startTime));
  }
  return (
    <div>
      <p>{props.speaker}</p>
      <span className='startTime'>{ret}</span>
    </div>
  );
};

export default SpeakerNo;
