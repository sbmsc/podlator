import React from "react";
import userImg from "../../images/userImg.png";
import bbckaldi from "../../apis/bbckaldi";

export default class Account extends React.Component {
  state = {
    info: {},
    name:""
  };
  componentDidMount = async () => {
    const response = await bbckaldi.get("/user");
    this.setState({ info: response.data ,name:response.data.firstName});
    console.log(this.state);
  };
  handleInput = (e) => {
    const { info } = this.state;
    this.setState({ info: { ...info, [e.target.name]: e.target.value } });
  };
  handleUpdate=async(e)=>
  { e.preventDefault()
    const {info}=this.state
    const response=await bbckaldi.put('/user',{...info})
    console.log(response)
  }
  render() {
    const { info } = this.state;
    return (
      <div className="container account">
        <div className="head">
          <div>
            <img
              src={userImg}
              alt="User Img"
              className="rounded-circle nav-item userImg"
            />
          </div>
          <div className="info">
            <h3>{this.state.name? this.state.name : ""}</h3>
            <p>Change profile picture</p>
          </div>
        </div>
        <hr />
        <h3>Personal Information</h3>
        <div className="information row">
          <div className="col-md-6">
            <input
              placeholder="First Name"
              name="firstName"
              value={info.firstName ? info.firstName : ""}
              onChange={this.handleInput}
            />
            <input
              placeholder="Email"
              name="email"
              value={info.email ? info.email : ""}
              onChange={this.handleInput}
            />
            <input
              placeholder="Organization"
              name="organization"
              value={info.organization ? info.organization : ""}
              onChange={this.handleInput}
            />
            <input
              placeholder="Podcast Website"
              name="podcastWebsite"
              value={info.podcastWebsite ? info.podcastWebsite: ""}
              onChange={this.handleInput}
            />
          </div>
          <div className="col-md-6">
            <input
              placeholder="Last Name"
              name="lastName"
              value={info.lastName ? info.lastName : ""}
              onChange={this.handleInput}
            />
            <input
              placeholder="Phone Number"
              name="phone"
              value={info.phone ? info.phone : ""}
              onChange={this.handleInput}
            />
            <button className="bluebutton" onClick={this.handleUpdate}> Update Profile</button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h3>Password</h3>
          </div>
          <div className="col-md-6">
            <button className="bluebutton" style={{ margin: 0 }}>
              {" "}
              Change Password
            </button>
          </div>
        </div>
        <hr />
        <h3>Transcription Settings</h3>
        <div className="row">
          <div className="col-md-6">
            <h5>Language</h5>
          </div>
          <div className="col-md-6">
            <h5>Use Custom Transcription model</h5>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h3>Account Deletion</h3>
          </div>
          <div className="col-md-6">
            <button className="bluebutton" style={{ margin: 0 }}>
              {" "}
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
