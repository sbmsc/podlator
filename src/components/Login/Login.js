import React from 'react';
import kaldi from '../../apis/bbckaldi';
import logo from '../../images/logo.png';
import { setUserSession } from '../../utils/session';
import { Spinner } from 'react-bootstrap';
import queryString from 'query-string';
import Validation from '../../utils/validation';
class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
    loading: false,
  };
  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      setUserSession(query.token);
      this.props.history.push('/');
    }
  }

  async handleSubmit() {
    this.setState({ loading: true });
    if (!Validation.validateEmail(this.state.username)) {
      this.setState({ error: 'Invalid Email', loading: false });
    } else if (!Validation.validatePassword(this.state.password)) {
      this.setState({
        error: 'Invalid Password! At least 4 characters required',
        loading: false,
      });
    } else {
      var data = {
        email: this.state.username,
        password: this.state.password,
      };
      await kaldi
        .post('/login', data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            setUserSession(response.data.token);
            this.props.history.push('/dashboard');
          }
        })
        .catch((error) => {
          this.setState({
            error: 'Email or password do not match',
            loading: false,
          });
          console.log(error);
        });
    }
    //       console.log(response)
  }

  handleSignup = () => {
    this.props.history.push('/signup');
  };

  // token=window.location.search.split("?token=")[1];
  gmailHandler = () => {
    window.open('https://kaldi-api.herokuapp.com/auth/google/login', '_self');
  };
  facebookHandler = () => {
    window.open('https://kaldi-api.herokuapp.com/auth/fb/login', '_self');
  };
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <center>
            <Spinner animation='border' variant='primary' className='spinner' />
          </center>
        ) : (
          <div className='box-layout'>
            <div className='box'>
              <form>
                <div className='logo'>
                  <img src={logo} alt='logo' height='140px' width='150px' />
                </div>
                <div className='error'>{this.state.error}</div>
                <input
                  type='text'
                  placeholder='Email'
                  name='username'
                  onChange={(event) => {
                    this.setState({ username: event.target.value });
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
                <div>
                  <button
                    className='bluebutton'
                    type='submit'
                    title='Sign In'
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleSubmit();
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div>
                <p style={{ color: '#CBCBCB' }}>or log with:</p>
                <button className='facebook' onClick={this.facebookHandler}>
                  Facebook
                </button>
                <button className='gmail' onClick={this.gmailHandler}>
                  Gmail
                </button>
                <p style={{ marginTop: 40, color: '#CBCBCB' }}>
                  Don't have an account?
                  <span
                    style={{ color: '#218EE8' }}
                    onClick={this.handleSignup}
                  >
                    Create your account
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
