import React from "react";
import kaldi from "../../apis/bbckaldi";
import logo from "../../images/logo.png";
import Validation from "../../utils/validation";
class ResetPassword extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    loading: false,
  };
 

  async handleSubmit() {
    if (!Validation.validateEmail(this.state.username)) {
      this.setState({ error: "Invalid Email", loading: false });
    } else {
      
      var data = {
        email: this.state.username,
      };
      await kaldi
        .post("/reset_password", data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: true });
            console.log(response.data.url);
          }
        })
        .catch((error) => {
          this.setState({
            error: "user not found",
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

  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <center>
            <h1>A password reset email has been sent to your account</h1>
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
                  type="text"
                  placeholder="Email"
                  name="username"
                  onChange={(event) => {
                    this.setState({ username: event.target.value });
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
                    Reset Password
                  </button>
                </div>
              </form>
              <div>
                <p style={{ marginTop: 40, color: "#CBCBCB" }}>
                  Don't have an account?
                  <span
                    style={{ color: "#218EE8" }}
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

export default ResetPassword;
