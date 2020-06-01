import React from 'react';
import bbckaldi from '../../../apis/bbckaldi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Router } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_eCySixt2iVp3Lob1nXKGy2a800iQdQJUus');
export default class Plan extends React.Component {
  state = {
    plans: null,
    selectedPlan: null,
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

  // handleSubscription = () => {
  //   this.state.selectedPlan = true;
  // };
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
              <button className='bluebutton' onClick={() => this.setState({ selectedPlan: ele })}>
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
    // let res = (
    // <div>
    //   <h2>Choose Your Plan</h2>
    //   <hr></hr>
    //   <div className='row'>
    //     <h5 className='col-5'>Your current plan expires on 02/03/2021</h5>
    //     <h5 className='col-5'>
    //       Silver Tier: 125mn consumed over 240 credit - 21 days left
    //     </h5>
    //   </div>
    //   <div className='row'>{this.renderPlans()}</div>
    // </div>
    // );
    // if (this.state.selectedPlan) {
    //   res = (
    // <CheckoutForm
    //   price={1}
    //   onSuccessfulCheckout={() => Router.push('/dashboard')}
    // />
    //   );
    // }
    return (
      <div className='plan-container'>
        <div>
          <h2>Choose Your Plan</h2>
          <hr></hr>
          <div className='row'>
            <h5 className='col-5'>Your current plan expires on 02/03/2021</h5>
            <h5 className='col-5'>Silver Tier: 125mn consumed over 240 credit - 21 days left</h5>
          </div>
          <div className='row'>{this.renderPlans()}</div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            selectedPlan={this.state.selectedPlan}
            onSuccessfulCheckout={() => Router.push('/dashboard')}
          />
        </Elements>
      </div>
    );
  }
}
