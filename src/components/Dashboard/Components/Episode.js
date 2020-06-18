import React from 'react';
// import { Link } from "react-router-dom";
import loadTranscript from '../../../images/edit.svg';
import transcribe from '../../../images/edited.svg';
import rss from '../../../images/rss.svg';
import wav from '../../../images/wav.svg';
import epTick from '../../../images/epTick.svg';
import epSound from '../../../images/epSound.svg';
import Utils from '../../../utils/utils';
import deleteImg from '../../../images/delete.svg';
const Episode = (props) => {
  // changing seconds to hours:minutes:seconds
  let ret = '';
  if (props.duration) {
    ret = Utils.secondsToStandard(props.duration);
  }
  return (
    <div>
      <div className='row listitem forsearch' style={{ textAlign: 'center' }}>
        <div className='col-1'>
          {props.isTranscribed ? (
            <img src={epTick} alt='Transcribed' />
          ) : (
            <img src={epSound} alt='Not Transcribed' />
          )}
        </div>
        <div className='col-6 title'>
          {' '}
          <h3
            onClick={() => props.openTranscribeModal(props)}
            style={{ cursor: 'pointer' }}
          >
            {props.title}
          </h3>
        </div>
        <div className='col-1'>
          <p className='duration'>{ret}</p>
        </div>
        <div className='col-1'>
          <span className='dot dot1'>
            {props.source === 'Manual' ? (
              <img src={wav} alt='wav' className='righticons' />
            ) : (
              <img src={rss} alt='rss' className='righticons' />
            )}
          </span>
        </div>

        <div className='col-1'>
          <span
            className='dot dot2'
            onClick={() => props.openTranscribeModal(props)}
          >
            {props.isTranscribed ? (
              <img
                src={loadTranscript}
                alt='Transcribed'
                className='righticons'
              />
            ) : (
              <img
                src={transcribe}
                alt='Not Transcribed'
                className='righticons'
              />
            )}
          </span>
        </div>
        <div className='col-1'>
          <span className='dot dot3'>
            <img
              src={deleteImg}
              alt='delete'
              className='righticons'
              onClick={(e) =>
                props.deleteEpisode(
                  props.id,
                  props.index,
                  props.source,
                  props.isEdited
                )
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Episode;
