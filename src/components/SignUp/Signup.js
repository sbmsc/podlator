import React from 'react';
import kaldi from '../../apis/bbckaldi';
// import logo from '../../images/logo.png';
import Validation from '../../utils/validation';
import { setUserSession } from '../../utils/session';
class Signup extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };
  async handleRegister() {
    if (!Validation.validateEmail(this.state.email)) {
      this.setState({ error: 'Invalid email' });
      return;
    }
    if (!Validation.validatePassword(this.state.password)) {
      this.setState({ error: 'Invalid password, must have 4 characters' });
      return;
    }
    if (!Validation.validateName(this.state.firstName)) {
      this.setState({ error: 'Invalid First Name' });
      return;
    }
    if (!Validation.validateName(this.state.lastName)) {
      this.setState({ error: 'Invalid Last Name' });
      return;
    }
    let data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    if (this.state.password === this.state.confirm) {
      await kaldi
        .post('/register', data)
        .then((response) => {
          if (response.status === 200) {
            setUserSession(response.data.token);
            this.props.history.push('/payment');
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.msg
          ) {
            this.setState({ error: error.response.data.msg });
          } else {
            this.setState({ error: 'Something went wrong' });
            console.log(error);
          }
        });
    } else {
      this.setState({ error: 'Password and confirm password do not match' });
    }
  }

  handleSignin = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <div className='box-layout'>
        <form className='box'>
          <div className='error'>{this.state.error}</div>
          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            onChange={(event) => {
              this.setState({ firstName: event.target.value });
            }}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            onChange={(event) => {
              this.setState({ lastName: event.target.value });
            }}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />

          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />

          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmpassword'
            onChange={(event) => {
              this.setState({ confirm: event.target.value });
            }}
          />
          <div>
            <button
              className='bluebutton'
              type='submit'
              title='Sign In'
              onClick={(e) => {
                e.preventDefault();
                this.handleRegister();
              }}
            >
              Next
            </button>
          </div>
          <p style={{ color: '#CBCBCB' }}>
            Already have an account?
            <span style={{ color: '#218EE8' }} onClick={this.handleSignin}>
              {' '}
              Login
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
