import React from 'react';

export default class Notifications extends React.Component {
  render() {
    return (
      <div className='notification-container'>
        <div className='notification-content'>
          <h2>Notifications Settings</h2>
          <hr />
          <h5>Email alert</h5>
          <form>
            <input
              type='radio'
              id='notifEmail'
              name='email'
              value='notifEmail'
            />
            <label for='notifEmail'>
              Receive email when transcript is available
            </label>
            <br />
            <input
              type='radio'
              id='transEmail'
              name='email'
              value='transEmail'
            />
            <label for='transEmail'>
              Automatically receive transcription via email when ready
            </label>
          </form>

          <h5>Newsletter</h5>
          <form>
            <input type='radio' id='subNews' name='subNews' value='subNews' />
            <label for='subNews'>
              Subscribe to news letter and receive product updates
            </label>
          </form>
        </div>
      </div>
    );
  }
}
