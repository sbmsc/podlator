import React from 'react';
import Navbar from '../Navbar/Navbar';
import Account from './Account';
import Notifications from './Notifications';
import Plan from './Plan/Plan';
import Billing from './Billing';

export default class Settings extends React.Component {
  state = {
    active: 'account',
    imgUrl:null
  };

  handleClick = (divname) => {
    this.setState({
      active: divname,
    });
  };
  getImg=(image)=>
  { console.log('here')
    this.setState({imgUrl:image})
  }
  imgDel=()=>
  {
    this.setState({imgUrl:null})
  }
  render() {
    return (
      <div className='setting'>
        <Navbar image={this.state.imgUrl} imgDel={this.imgDel}/>
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
          <div className='display-box col-md-9'>
            {this.state.active === 'account' && <Account getImg={this.getImg}/>}
            {this.state.active === 'notifications' && <Notifications />}
            {this.state.active === 'plan' && <Plan />}
            {this.state.active === 'billing' && <Billing />}
          </div>
        </div>
      </div>
    );
  }
}
