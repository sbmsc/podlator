import React from 'react';
import Navbar from '../Navbar/Navbar';
import Account from './Account';
import Notifications from './Notifications';
import Plan from './Plan/Plan';
import Billing from './Billing';

export default class Settings extends React.Component {
  state = {
    active: 'account',
  };

  handleClick = (divname) => {
    this.setState({
      active: divname,
    });
  };

  render() {
    return (
      <div className='setting'>
        <Navbar />
        <div className='row'>
          <div className='box-left col-md-2'>
            <div className='settings-buttons'>
              <button
                onClick={() => this.handleClick('account')}
                className={
                  this.state.active === 'account'
                    ? 'bluebutton'
                    : 'simplebutton'
                }
              >
                Account
              </button>
              <button
                onClick={() => this.handleClick('notifications')}
                className={
                  this.state.active === 'notifications'
                    ? 'bluebutton'
                    : 'simplebutton'
                }
              >
                Notifications
              </button>
              <button
                onClick={() => this.handleClick('plan')}
                className={
                  this.state.active === 'plan' ? 'bluebutton' : 'simplebutton'
                }
              >
                Plan
              </button>
              <button
                onClick={() => this.handleClick('billing')}
                className={
                  this.state.active === 'billing'
                    ? 'bluebutton'
                    : 'simplebutton'
                }
              >
                Billing
              </button>
            </div>
          </div>
          <div className='box-middle col-md-9'>
            {this.state.active === 'account' && <Account />}
            {this.state.active === 'notifications' && <Notifications />}
            {this.state.active === 'plan' && <Plan />}
            {this.state.active === 'billing' && <Billing />}
          </div>
        </div>
      </div>
    );
  }
}
