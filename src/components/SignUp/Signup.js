import React from "react";
import kaldi from "../../apis/bbckaldi";
import logo from "../../images/logo.png";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  async handleRegister() {
    var data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };
    console.log(data);
    if (this.state.password === this.state.confirm) {
      await kaldi
        .post("/register", data)
        .then((response) => {
          if (response.status === 200) {
            this.props.history.push("/payment");
          }
        })
        .catch((error) => {
          this.setState({ error: "User exists" });
          console.log(error);
        });
    } else {
      this.setState({ error: "Password and confirm password do not match" });
    }
  }
  render() {
    return (
      <div className="box-layout">
        <form className="box">
          <div className="logo">
            <img src={logo} alt="logo" height="140px" width="150px" />
          </div>
          <div className="error">{this.state.error}</div>
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {
              this.setState({ email: event.target.value });
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

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(event) => {
              this.setState({ confirm: event.target.value });
            }}
          />
          <div>
            <button
              className="bluebutton"
              type="submit"
              title="Sign In"
              onClick={(e) => {
                e.preventDefault();
                this.handleRegister();
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
