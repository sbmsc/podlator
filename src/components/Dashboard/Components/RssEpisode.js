import React from 'react';
import edited from '../../../images/edited.svg';
import deleteImg from '../../../images/delete.svg';
import eng from '../../../images/english.svg';
import fr from '../../../images/french.svg';

const RssEpisode = (props) => {
  return (
    <div>
      <div
        className='row listitem forsearch align-items-center'
        style={{ fontWeight: '200' }}
      >
        <div className='col-3'>
          <h3 style={{ fontWeight: '400' }}>{props.title}</h3>
          {props.author}
        </div>
        <div className='col-2'>{props.category}</div>
        <div className='col-2'>{props.date}</div>
        <div className='col-2'>
          {props.language.match(/en+/i) ? (
            <img src={eng} alt='eng' className='righticons' />
          ) : (
            <img src={fr} alt='eng' className='righticons' />
          )}
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
