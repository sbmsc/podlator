import React from 'react';
import bbckaldi from '../../../apis/bbckaldi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_eCySixt2iVp3Lob1nXKGy2a800iQdQJUus');

export default class Plan extends React.Component {
  state = {
    plans: null,
  };
  componentDidMount() {
    bbckaldi
      .get('/plans')
      .then((response) => {
        this.setState({ plans: response.data });
      })
      .catch((err) => {
        alert('Something went wrong');
        console.log(err);
      });
  }

  handleSubscription = () => {
    
  };
  renderPlans = () => {
    if (this.state.plans) {
      const { plans } = this.state;
      const mappedPlans = plans.map((ele) => {
        return (
          <div className='col-md-3' key={ele._id}>
            <div className='payment-box'>
              <h2>
                {ele.name} <br />
              </h2>
              <h4>{ele.summary}</h4>
              <p>{ele.details}</p>
              <button className='bluebutton' onClick={this.handleSubscription}>
                Select Plan
              </button>
            </div>
          </div>
        );
      });
      return mappedPlans;
    }
  };
  render() {
    return (
      <div className='plan-container'>
        <h2>Choose Your Plan</h2>
        <hr></hr>
        <div className='row'>
          <h5 className='col-5'>Your current plan expires on 02/03/2021</h5>
          <h5 className='col-5'>
            Silver Tier: 125mn consumed over 240 credit - 21 days left
          </h5>
        </div>
        <Elements stripe={stripePromise}>
          <div className='row'>{this.renderPlans()}</div>
        </Elements>
      </div>
    );
  }
}
