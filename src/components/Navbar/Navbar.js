import React from 'react';
import navbanner from '../../images/navbanner.svg';
import navGraph from '../../images/navGraph.svg';
import logout from '../../images/signs.png';
import userImg from '../../images/userImg.svg';
import { removeUserSession } from '../../utils/session';
import { withRouter } from 'react-router-dom';
import settingsLogo from '../../images/settings.svg';
import { Link } from 'react-router-dom';
import bbckaldi from '../../apis/bbckaldi';
import { getToken } from '../../utils/session';
class Navbar extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    imageUrl: null,
  };
  handleLogout = (props) => {
    removeUserSession();
    this.props.history.push('/');
  };
  componentDidMount = async () => {
    bbckaldi.defaults.headers.common['token'] = getToken();
    this.getUser();
  };

  getUser = () => {
    bbckaldi
      .get('/user')
      .then((resp) => {
        if (resp.data.avatarUrl)
          localStorage.setItem('img', resp.data.avatarUrl);
        this.setState({
          email: resp.data.email,
          firstName: resp.data.firstName,
          lastName: resp.data.lastName,
          imageUrl: resp.data.avatarUrl,
        });
      })
      .catch((err) => console.log(err));
  };
  // componentDidUpdate=()=>
  // {
  //   if(this.props.image!==null)
  //   {
  //     const {image}=this.props;

  //     this.setState({imageUrl:image})

  //   }
  // }

  render() {
    const { image } = this.props;
    if (image) {
      localStorage.setItem('img', image);
      if (this.props.imgDel) this.props.imgDel();
    }
    console.log('status', this.props.status);
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light navbar1 align-items-center'>
        <a className='navbar-brand' href='/'>
          <img src={navbanner} alt='logo' />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              {this.props.img ? (
                <img
                  className='audioImg'
                  src={this.props.img}
                  alt='audioImg'
                  style={{ height: '75px' }}
                />
              ) : (
                <img src={navGraph} alt='graph' className='navGraph'></img>
              )}
            </li>
            {this.props.title && !this.props.transcribeCompleted ? (
              <li className='nav-item audioTitle-container align-items-center'>
                <span className='audioTitle align-items-center'>
                  {this.props.title}
                </span>
                {this.props.status ? (
                  <span className='transcribeStatus'>
                    {this.props.status === 'true' ? 'Finished' : 'Failed'}
                  </span>
                ) : null}
              </li>
            ) : null}
            {this.props.transcribeCompleted ? (
              <li className='nav-item audioTitle-container align-items-center'>
                <span className='audioTitle align-items-center'>
                  {this.props.title}
                </span>
                <span className='transcribeStatus'>
                  {`${this.props.transcribeCompleted}%`}
                </span>
              </li>
            ) : null}
          </ul>
          <ul className='navbar nav' style={{ minWidth: '380px' }}>
            <li className='nav-item'>
              <img
                src={
                  localStorage.getItem('img') !== null
                    ? localStorage.getItem('img')
                    : userImg
                }
                alt='User Img'
                className='userImg'
              ></img>
            </li>
            <li className='nav-item'>
              <div className='info'>
                <h3>{this.state.firstName + ' ' + this.state.lastName}</h3>
                <p>{this.state.email}</p>
              </div>
            </li>
            <li className='nav-item'>
              <Link to='/settings'>
                <img
                  src={settingsLogo}
                  alt='settings'
                  className='settings'
                ></img>
              </Link>
            </li>
            <li className='nav-item'>
              <img
                src={logout}
                alt='logout'
                className='logout nav-item'
                onClick={() => {
                  this.handleLogout();
                }}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
