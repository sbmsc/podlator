import React from "react";
import kaldi from "../../apis/bbckaldi";
import logo from "../../images/logo.png";
import { setUserSession } from "../../session/session";
import Facebook from "./Facebook";
import Gmail from "./Gmail";
import { Spinner } from "react-bootstrap";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    loading: false,
  };

  async handleSubmit() {
    this.setState({ loading: true });
    if (this.state.username === "") {
      this.setState({ error: "Please Enter Email" });
    } else if (this.state.password === "") {
      this.setState({ error: "Please Enter Password" });
    } else {
      var data = {
        email: this.state.username,
        password: this.state.password,
      };
      await kaldi
        .post("/login", data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            setUserSession(response.data.token);
            this.props.history.push("/dashboard");
          }
        })
        .catch((error) => {
          this.setState({
            error: "Email or password do not match",
            loading: false,
          });
          console.log(error);
        });
    }
    //       console.log(response)
  }

  handleSignup = () => {
    this.props.history.push("/signup");
  };

  // token=window.location.search.split("?token=")[1];
  gmailHandler = () => {
    console.log("GMAIL HANDLER ACTIVATED");
    this.setState({ loading: true });
    let win = window.open(
      "https://kaldi-api.herokuapp.com/auth/google/login",
      "windowname1",
      "width=800, height=600"
    );
    let token = win.location.search.split("?=token")[1];
    console.log(token);
    this.setState({ loading: false });
  };
  facebookHandler = () => {
    console.log("FACEBOOK HANDLER ACTIVATED");
  };
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <center>
            <Spinner animation="border" variant="primary" className="spinner" />
          </center>
        ) : (
          <div className="box-layout">
            <form className="box">
              <div className="logo">
                <img src={logo} alt="logo" height="140px" width="150px" />
              </div>
              <div className="error">{this.state.error}</div>
              <input
                type="text"
                placeholder="Email"
                name="username"
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
              <div>
                <button
                  className="bluebutton"
                  type="submit"
                  title="Sign In"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                >
                  Sign In
                </button>
              </div>
              <div>
                <p style={{ color: "#CBCBCB" }}>or log with:</p>
                <Facebook />
                <Gmail clicked={this.gmailHandler} />
                <p style={{ marginTop: 40, color: "#CBCBCB" }}>
                  Don't have an account?
                  <span
                    style={{ color: "#218EE8" }}
                    onClick={this.handleSignup}
                  >
                    {" "}
                    Create your account
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
