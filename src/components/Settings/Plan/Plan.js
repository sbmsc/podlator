import React from 'react';
import bbckaldi from '../../../apis/bbckaldi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
// import { withTheme } from '@material-ui/core';
// import { Router } from 'react-router-dom'
const stripePromise = loadStripe('pk_test_eCySixt2iVp3Lob1nXKGy2a800iQdQJUus');
export default class Plan extends React.Component {
  state = {
    plans: null,
    selectedPlan: null,
    subscriptionDetails: null,
    loading: true,
  };
  componentDidMount() {
    this.getSubscriptionStatus();
    this.getPlans();
  }

  getSubscriptionStatus = async () => {
    await bbckaldi.get('/subscription').then((response) => {
      this.setState({ subscriptionDetails: response.data, loading: false });
    });
  };

  getPlans = async () => {
    await bbckaldi
      .get('/plans')
      .then((response) => {
        this.setState({ plans: response.data });
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err);
      });
  };
  renderPlans = () => {
    if (this.state.plans) {
      const { plans } = this.state;
      const mappedPlans = plans.map((ele) => {
        return (
          <div className='col-md-4' key={ele._id}>
            <div className='payment-box'>
              <h2>
                {ele.name} <br />
              </h2>
              <h4>{ele.summary}</h4>
              <p>{ele.details}</p>
              {this.state.subscriptionDetails &&
              this.state.subscriptionDetails.planId === ele._id ? (
                <button
                  className='bluebutton'
                  style={{ backgroundColor: '#FAF7F7', color: '#218EE8' }}
                  onClick={() => this.setState({ selectedPlan: ele })}
                  disabled
                >
                  Current Plan
                </button>
              ) : (
                <button
                  className='bluebutton'
                  onClick={() => this.setState({ selectedPlan: ele })}
                >
                  Select Plan
                </button>
              )}
            </div>
          </div>
        );
      });
      return mappedPlans;
    }
  };
  successfulCheckoutHandler = () => {
    console.log('Successfully created subscription');
    this.setState({ selectedPlan: null });
  };
  render() {
    return (
      <div className='plan-container'>
        <h2>Choose Your Plan</h2>
        <hr />

        {this.state.loading ? (
          <div className='row'>Loading your subscription details</div>
        ) : this.state.subscriptionDetails ? (
          <div>
            <div className='row'>
              <h5 className='col-5'>
                Your current plan started on{' '}
                {this.state.subscriptionDetails.createdAt.split('T')[0]}
              </h5>
              <h5 className='col-5'>
                Silver Tier: {this.state.subscriptionDetails.creditsConsumed}{' '}
                consumed over {this.state.subscriptionDetails.totalCredits}{' '}
                total credits
              </h5>
            </div>
            <div className='row'>{this.renderPlans()}</div>
          </div>
        ) : (
          <div>
            <div className='row'>No subscription found</div>
            <div className='row'>{this.renderPlans()}</div>
          </div>
        )}

        <Elements stripe={stripePromise}>
          <CheckoutForm
            selectedPlan={this.state.selectedPlan}
            onSuccessfulCheckout={() => this.successfulCheckoutHandler()}
          />
        </Elements>
      </div>
    );
  }
}
