import React from 'react';
import userImg from '../../images/userImg.png';

export default class Account extends React.Component {
  render() {
    return (
      <div className='container account'>
        <div className='head'>
          <div>
            <img
              src={userImg}
              alt='User Img'
              className='rounded-circle nav-item userImg'
            />
          </div>
          <div className='info'>
            <h3>Hardcoded Name</h3>
            <p>Change profile picture</p>
          </div>
        </div>
        <hr />
        <h3>Personal Information</h3>
        <div className='information row'>
          <div className='col-md-6'>
            <input placeholder='First Name' />
            <input placeholder='Email' />
            <input placeholder='Organisation' />
            <input placeholder='Podcast Website' />
          </div>
          <div className='col-md-6'>
            <input placeholder='Last Name' />
            <input placeholder='Phone Number' />
            <button className='bluebutton'> Update Profile</button>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h3>Password</h3>
          </div>
          <div className='col-md-6'>
            <button className='bluebutton' style={{ margin: 0 }}>
              {' '}
              Change Password
            </button>
          </div>
        </div>
        <hr />
        <h3>Transcription Settings</h3>
        <div className='row'>
          <div className='col-md-6'>
            <h5>Language</h5>
          </div>
          <div className='col-md-6'>
            <h5>Use Custom Transcription model</h5>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h3>Account Deletion</h3>
          </div>
          <div className='col-md-6'>
            <button className='bluebutton' style={{ margin: 0 }}>
              {' '}
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
