import React from 'react';
import userImg from '../../images/userImg.svg';
import bbckaldi from '../../apis/bbckaldi';
import Modal from 'react-modal';
import { removeUserSession } from '../../utils/session';
import Validation from '../../utils/validation';
import { Redirect } from 'react-router-dom';
import { Radio } from '@material-ui/core';
import Dropzone from 'react-dropzone';
export default class Account extends React.Component {
  state = {
    user: null,
    selectedOption: false,
    newPassword: '',
    confirmPassword: '',
    error: null,
    imageUrl: null,
  };
  componentDidMount = () => {
    this.getUser();
  };

  getUser = async () => {
    const response = await bbckaldi.get('/user');
    if (response.data) {
      this.setState({ user: response.data, imageUrl: response.data.avatarUrl });
      this.props.getImg(response.data.avatarUrl);
    }
  };
  handleInput = (e) => {
    const { user } = this.state;
    this.setState({ user: { ...user, [e.target.name]: e.target.value } });
  };
  handleLanguage = (e) => {
    let { settings } = this.state.user;
    const { user } = this.state;
    settings.language = e.target.value;
    this.setState({ user: { ...user, settings } });
  };
  handleUpdate = async (e) => {
    e.preventDefault();
    const { user } = this.state;
    if (!Validation.validateName(user.firstName)) {
      this.setState({ error: 'Invalid First Name' });
      return;
    }
    if (!Validation.validateName(user.lastName)) {
      this.setState({ error: 'Invalid Last Name' });
      return;
    }
    if (!Validation.validateEmail(user.email)) {
      this.setState({ error: 'Invalid Email' });

      return;
    }
    this.setState({ error: null });
    await bbckaldi
      .put('/user', { ...user })
      .then((resp) => alert('update sucessful'))
      .catch((err) => alert('couldnt update'));
  };

  openModal = () => {
    this.setState({
      selectedOption: true,
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        selectedOption: false,
      };
    });
  };

  openModal2 = () => {
    this.setState({
      selectedOption2: true,
    });
  };

  closeModal2 = () => {
    this.setState(() => {
      return {
        selectedOption2: false,
      };
    });
  };

  deleteUser = async () => {
    if (window.confirm('Are you sure you want to delete User?')) {
      await bbckaldi
        .delete('/user')
        .then((response) => {
          if (response.status === 200) console.log('User Deleted');
          else console.log('Something went wrong');
          removeUserSession();
          this.setState({ redirect: true });
        })
        .catch((err) => {
          console.log('Something went wrong');
          console.log(err);
        });
    } else {
      console.log('Account Safe');
    }
  };

  handlePasswordUpdate = async () => {
    if (
      this.state.newPassword !== '' &&
      this.state.newPassword === this.state.confirmPassword
    ) {
      await bbckaldi
        .put('/user/password', { password: this.state.newPassword })
        .then((response) => {
          alert('password changed successfully');
          this.closeModal();
        })
        .catch((error) => {
          alert('couldnt change password');
        });
    } else {
      alert('passwords dont match');
    }
  };
  handleLangSub = async () => {
    if (this.state.user.settings) {
      let settings = this.state.user.settings;
      settings.transcriptionModel = 'v1';
      await bbckaldi
        .put('/user', { settings })
        .then((response) => {
          alert('Settings changed successfully');
        })
        .catch((error) => {
          alert('couldnt change settings');
        });
    }
  };

  handleDrop = async (accepted) => {
    const currentFile = accepted[0];
    var formData = new FormData();
    formData.append('file', currentFile);
    console.log('image is', currentFile);
    await bbckaldi
      .post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        this.getUser();
        this.closeModal2();
        console.log(response);
      })
      .catch((error) => {
        console.log('error is', error);
      });
  };

  render() {
    const { user } = this.state;
    return (
      <div className='container account'>
        {this.state.redirect ? <Redirect to='/'></Redirect> : ''}
        <Modal
          isOpen={this.state.selectedOption}
          onRequestClose={this.closeModal}
          contentLabel='sometext'
          closeTimeoutMS={200}
          ariaHideApp={false}
          className='uploadModal'
          style={{
            overlay: {
              backgroundColor: 'rgb(33,142,232,0.9)',
            },
          }}
        >
          <div className='settingsmodal'>
            <h1>Change Password</h1>
            <input
              type='password'
              placeholder='Enter new password'
              onChange={(e) => this.setState({ newPassword: e.target.value })}
            />
            <input
              type='password'
              placeholder='Enter confirm password'
              onChange={(e) =>
                this.setState({ confirmPassword: e.target.value })
              }
            />
            <button className='bluebutton' onClick={this.handlePasswordUpdate}>
              Update password
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.selectedOption2}
          onRequestClose={this.closeModal2}
          contentLabel='sometext'
          closeTimeoutMS={200}
          ariaHideApp={false}
          className='uploadModal'
          style={{
            overlay: {
              backgroundColor: 'rgb(33,142,232,0.9)',
            },
          }}
        >
          <div className='modalContent'>
            <Dropzone onDrop={this.handleDrop} accept='image/*'>
              {({ getRootProps, getInputProps, isDragReject }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragReject && (
                      <h1>Select or drag & drop your file in this area.</h1>
                    )}
                    {isDragReject && <h1> Supports only .png,.jpeg</h1>}
                    <button className='bluebutton'>SELECT</button>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </Modal>

        <div className='head'>
          <div>
            <img
              src={this.state.imageUrl ? this.state.imageUrl : userImg}
              alt='User Img'
              className='rounded-circle nav-item userImg'
            />
          </div>
          <div className='info'>
            <h3>{this.state.user ? this.state.user.firstName : ''}</h3>
            <p onClick={this.openModal2}>Change profile picture</p>
          </div>
        </div>
        <hr />
        <h3>Personal Information</h3>
        {this.state.error ? (
          <div className='row' style={{ color: 'red', fontSize: '24px' }}>
            {this.state.error}
          </div>
        ) : null}

        <div className='information row'>
          <div className='col-6'>
            <input
              placeholder='First Name'
              name='firstName'
              value={user ? user.firstName : ''}
              onChange={this.handleInput}
            />
            <input
              placeholder='Email'
              name='email'
              value={user ? user.email : ''}
              onChange={this.handleInput}
            />
            <input
              placeholder='Organization'
              name='organization'
              value={user ? user.organization : ''}
              onChange={this.handleInput}
            />
            <input
              placeholder='Podcast Website'
              name='podcastWebsite'
              value={user ? user.podcastWebsite : ''}
              onChange={this.handleInput}
            />
          </div>
          <div className='col-6'>
            <input
              placeholder='Last Name'
              name='lastName'
              value={user ? user.lastName : ''}
              onChange={this.handleInput}
            />
            <input
              placeholder='Phone Number'
              name='phone'
              value={user ? user.phone : ''}
              onChange={this.handleInput}
            />
            <button className='bluebutton' onClick={this.handleUpdate}>
              {' '}
              Update Profile
            </button>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h3>Password</h3>
          </div>
          <div className='col-md-6'>
            <button
              className='bluebutton'
              style={{ margin: 0 }}
              onClick={this.openModal}
            >
              {' '}
              Change Password
            </button>
          </div>
        </div>
        <hr />
        <h3>Transcription Settings</h3>
        <div className='row'>
          <div className='col-md-6 lang'>
            <label htmlFor='lang'>Language</label>
            <select
              name='lang'
              id='selectLang'
              onChange={this.handleLanguage}
              value={
                this.state.user && this.state.user.settings.language
                  ? this.state.user.settings.language
                  : 'select Language'
              }
            >
              <option value='English'>English</option>
              <option value='French'>French</option>
            </select>
          </div>
          <div className='col-md-6 row'>
            <div className='col-1'>
              {' '}
              <Radio color='primary' checked />{' '}
            </div>
            <div className='col-11'>
              <span>Use custom transcription model</span>
              <br />
              <span
                style={{
                  backgroundColor: '#F4F8FA',
                  padding: '3px',
                  borderRadius: '7px',
                }}
              >
                {' '}
                Model_podcast_v1
              </span>
            </div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-6 offset-6'>
            <button className='bluebutton' onClick={this.handleLangSub}>
              {' '}
              Save
            </button>
          </div>
        </div>

        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h3>Account Deletion</h3>
          </div>
          <div className='col-md-6'>
            <button
              onClick={this.deleteUser}
              className='bluebutton'
              style={{ margin: 0 }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
