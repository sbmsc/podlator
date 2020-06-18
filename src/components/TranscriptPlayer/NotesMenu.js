import React from 'react';
import pin from '../../images/pin.svg';
const NotesMenu = (props) => (
  <div className='notes'>
    <div className='notesTitle'>
      <img src={pin} alt='pin' />
      Show notes
    </div>

    <textarea
      type='textarea'
      className='notesedit'
      value={props.notes}
      onChange={(e) => props.handleNotes(e)}
    ></textarea>

    <button className='bluebutton' onClick={(e) => props.updateNotes()}>
      Save Notes
    </button>
  </div>
);

export default NotesMenu;
