import React from 'react';

import bbckaldi from '../../apis/bbckaldi';
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTranscription: false,
      notifyTranscription: false,
      newsletter: false,
    };
  }
  componentDidMount() {
    this.getPreferences();
  }
  getPreferences = async () => {
    await bbckaldi
      .get('/user')
      .then((response) => {
        this.setState({
          emailTranscription: response.data.settings.emailTranscription,
          notifyTranscription: response.data.settings.notifyTranscription,
          newsletter: response.data.settings.newsletter,
        });
      })
      .catch((err) => console.log(err));
  };
  notificationHandler = async (event) => {
    const { value, checked } = event.target;
    
    if (value === 'newsletter') {
      await this.setState({ newsletter: checked });
    } else if (value === 'emailTranscription') {
      await this.setState({ emailTranscription: checked });
    } else if (value === 'notifyTranscription') {
      await this.setState({ notifyTranscription: checked });
    }
    const settings = this.state;
    await bbckaldi.put('/user', { settings }).then((response) => {
      console.log(response);
    });
  };
  render() {
    return (
      <div className='notification-container'>
        <div className='notification-content'>
          <h2>Notifications Settings</h2>
          <hr />
          <div>
            <h3>Email alert</h3>
            <input
              type='checkbox'
              checked={this.state.notifyTranscription}
              value='notifyTranscription'
              name='notifyTranscription'
              onChange={(event) => this.notificationHandler(event)}
              style={{ height: '17px', width: '17px' }}
            />
            {'  '}
            <label htmlFor='notifEmail'>
              Receive email when transcript is available
            </label>
            <br />
            <input
              type='checkbox'
              checked={this.state.emailTranscription}
              name='emailTranscription'
              onChange={(event) => this.notificationHandler(event)}
              value='emailTranscription'
              style={{ height: '17px', width: '17px' }}
            />
            {'  '}
            <label htmlFor='transEmail'>
              Automatically receive transcription via email when ready
            </label>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3>Newsletter</h3>
            <input
              type='checkbox'
              checked={this.state.newsletter}
              name='newsletter'
              onChange={(event) => this.notificationHandler(event)}
              value='newsletter'
              style={{ height: '17px', width: '17px' }}
            />
            {'  '}
            <label htmlFor='subNews'>
              Subscribe to news letter and receive product updates
            </label>
          </div>
        </div>
      </div>
    );
  }
}
