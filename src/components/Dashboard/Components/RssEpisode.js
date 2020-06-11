import React from 'react';
import edited from '../../../images/edited.svg';
import deleteImg from '../../../images/delete.svg';
import eng from '../../../images/english.svg';
import Utils from '../../../utils/utils';

const RssEpisode = (props) => {
  let duration = '';
  if (props.duration) {
    duration = Utils.secondsToStandard(props.duration);
  }
  return (
    <div>
      <div className='row listitem forsearch align-items-center'>
        <div className='col-3'>
          <h3>{props.title}</h3>
        </div>
        <div className='col-2'>{props.category}</div>
        <div className='col-2'>{props.published.split('T')[0]}</div>
        <div className='col-1'>
          <p>{duration}</p>
        </div>
        <div className='col-2'>
          <img src={eng} alt='eng' className='righticons' />
        </div>
        <div className='col-2'>
          <span className='dot dot2'>
            <img src={edited} alt='edit' className='righticons' />
          </span>
          <span className='dot dot3'>
            <img
              src={deleteImg}
              alt='delete'
              className='righticons'
              onClick={(e) => props.deleteEpisode(props.id, props.index)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RssEpisode;
