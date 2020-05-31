import React from "react";
import navbanner from "../../images/navbanner.svg";
import navGraph from "../../images/navGraph.svg";
import logout from "../../images/signs.png";
import userImg from "../../images/userImg.png";
import { removeUserSession } from "../../session/session";
import { withRouter } from "react-router-dom";
import settingsLogo from "../../images/settings.svg";
import {Link} from 'react-router-dom'
class Navbar extends React.Component {
  handleLogout = (props) => {
    removeUserSession();
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar1">
        <a className="navbar-brand" href="/">
          <img src={navbanner} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <img src={navGraph} alt="graph" className="navGraph"></img>
            </li>
          </ul>
          <ul className="navbar nav">
            <li className="nav-item">
                <img
                  src={userImg}
                  alt="User Img"
                  className="rounded-circle nav-item userImg"
                ></img>
            </li>
            <li className="nav-item">
                <div className="info">
                  <h3>Hardcoded Name</h3>
                  <p>Email@email.com</p>
                </div>
            </li>
            <li className="nav-item">
                <Link to="/settings"><img
                  src={settingsLogo}
                  alt="settings"
                  className="settings"
                ></img></Link>
            </li>
            <li className="nav-item">
                <img
                  src={logout}
                  alt="logout"
                  className="logout nav-item"
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
