import React from "react";

export default class Payment extends React.Component {
  render() {
    return (
      <div className="box-layou">
        <div className="bo">
        <div className="row">
        <div className="col-md-3">
          <div className="payment-box">
          <h2>Pay As You Go </h2>
          <h4>No Episodes Included In Plan <br/> 0.10€/mn</h4>
          <p>60 mn per file<br/> 
          Free customer support<br/>
          Choose your language <br/> 
          All export options
          </p>
         <button className="bluebutton">Select Plan</button>
          </div>
        </div>
        <div className="col-md-3">
          <div className="payment-box">
          <h2>Silver Tier <br/> 15.99€ monthly</h2>
          <h4>4 Episodes Per Month 240 minutes</h4>
          <h4>Additional Audio 0.10€/mn</h4>
          <p>60 mn per file<br/>
          Free customer support<br/>
          Choose your language <br/> 
          All export options
          </p>
          <hr></hr>
          <h3>Human Corrected Transcript</h3>
          <h3>0.7€/mn</h3>
          <button className="bluebutton">Select Plan</button>
          </div>
        </div>
        <div className="col-md-3">
          <div className="payment-box">
          <h2>Gold Tier <br/> 24.99€ monthly </h2>
          <h4>10 Episodes Per Month 600 minutes</h4>
          <h4>Additional Audio 0.7€/mn</h4>
          <p>60 mn per file<br/>
          Free customer support<br/>
          Choose your language <br/> 
          All export options
          </p>
          <hr></hr>
          <h3>Human Corrected Transcript</h3>
          <h3>0.7€/mn</h3>
          <button className="bluebutton">Select Plan</button>
          </div>
        </div>
        <div className="col-md-3">
        <div className="payment-box">
        <h2>Free Trial <br/></h2>
        <h4>No Episodes Included In Plan <br/> 0.10€/mn</h4>
        <p>60 mn per file<br/> 
        Free customer support<br/>
        Choose your language <br/> 
        All export options
        </p>
       <button className="bluebutton">Select Plan</button>
        </div>
      </div>
        </div>
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
        </div>
      </div>
    );
  }
}
