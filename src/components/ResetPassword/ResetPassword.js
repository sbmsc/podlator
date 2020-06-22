import React from "react";
import kaldi from "../../apis/bbckaldi";
import logo from "../../images/logo.png";
import queryString from "query-string";
import { Spinner } from "react-bootstrap";
class ResetPassword extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    loading: false,
  };
  //   componentWillMount() {
  //     var query = queryString.parse(this.props.location.search);
  //     if (!query.token) {
  //       this.props.history.push("/");
  //     }
  //   }

  async handleSubmit() {
    this.setState({ loading: true });
    var query = queryString.parse(this.props.location.search);
    if (!query.token) {
      this.setState({ error: "Invalid Reset link", loading: false });
      this.props.history.push("/");
    } else if (
      this.state.newPassword === "" ||
      this.state.newPassword !== this.state.confirmPassword
    ) {
      this.setState({
        error: "New And confirm password don't match",
        loading: false,
      });}
      else if(this.state.newPassword.length<=4)
      {
        this.setState({
          error: "Password Must be greater than 4 characters",
          loading: false,
        });
       
    } else {
      var data = {
        password:this.state.newPassword,
      };
      await kaldi
        .put("/user/password", data, { headers: { token: query.token } })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            alert("password reset successful");
            this.props.history.push("/");
          }
        })
        .catch((error) => {
          this.setState({
            error: "Password Reset Failed",
            loading: false,
          });
          alert("password reset failed");
          console.log(error);
          this.props.history.push("/");
        });
    }
    //       console.log(response)
  }

  //   handleSignup = () => {
  //     this.props.history.push("/signup");
  //   };

  // token=window.location.search.split("?token=")[1];
  gmailHandler = () => {
    window.open("https://kaldi-api.herokuapp.com/auth/google/login", "_self");
  };
  facebookHandler = () => {
    window.open("https://kaldi-api.herokuapp.com/auth/fb/login", "_self");
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
            <div className="box">
              <form>
                <div className="logo">
                  <img src={logo} alt="logo" height="140px" width="150px" />
                </div>
                <div className="error">{this.state.error}</div>
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) =>
                    this.setState({ newPassword: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
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
                    Reset Password
                  </button>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ResetPassword;
