import React from 'react';
import { Link } from 'react-router-dom';
import edit from '../../../images/edit.svg';
import edited from '../../../images/edited.svg';
import rss from '../../../images/rss.svg';
import wav from '../../../images/wav.svg';
import epTick from '../../../images/epTick.svg';
import epSound from '../../../images/epSound.svg';
import Utils from '../../../utils/utils';
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
        <div className='col-8 title'>
          {props.rss === 'Rss' ? (
            <Link
              to={{
                pathname: '/transcriber',
                id: props.id,
                rss: true,
                title: props.title,
              }}
            >
              {' '}
              <h3>{props.title}</h3>
            </Link>
          ) : (
            <Link
              to={{
                pathname: '/transcriber',
                id: props.id,
                rss: false,
                title: props.title,
              }}
            >
              {' '}
              <h3>{props.title}</h3>
            </Link>
          )}
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
          <span className='dot dot2'>
            {props.isEdited ? (
              <img src={edited} alt='Edited' className='righticons' />
            ) : (
              <img src={edit} alt='Edit' className='righticons' />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Episode;
