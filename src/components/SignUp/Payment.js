import React from 'react';
import bbckaldi from '../../apis/bbckaldi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Settings/Plan/CheckoutForm';
// import { Router } from 'react-router-dom'
const stripePromise = loadStripe('pk_test_eCySixt2iVp3Lob1nXKGy2a800iQdQJUus');
export default class Payment extends React.Component {
  state = {
    plans: null,
    selectedPlan: null,
    subscriptionDetails: null,
    loading: true,
  };
  componentDidMount() {
    this.getPlans();
  }
  getPlans = async () => {
    await bbckaldi
      .get('/plans')
      .then((response) => {
        this.setState({ plans: response.data });
      })
      .catch((err) => {
        alert('Something went wrong');
        console.log(err);
      });
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
              {this.state.subscriptionDetails &&
              this.state.subscriptionDetails.planId === ele._id ? (
                <button
                  className='bluebutton'
                  onClick={() => this.setState({ selectedPlan: ele })}
                  disabled
                >
                  {' '}
                  Selected Plan
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
  handleNext = () => {
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div className='box-layout-payment'>
        <div className='box-payment'>
          <div>
            <div className='row'>{this.renderPlans()}</div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              selectedPlan={this.state.selectedPlan}
              onSuccessfulCheckout={() => this.successfulCheckoutHandler()}
            />
          </Elements>
          <div>
            <button
              className='bluebutton'
              type='submit'
              title='Sign In'
              onClick={(e) => {
                e.preventDefault();
                this.handleNext();
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
