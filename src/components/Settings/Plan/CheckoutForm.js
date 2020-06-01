import React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import bbckaldi from '../../../apis/bbckaldi';

const CheckoutForm = ({ selectedPlan, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    console.log({ selectedPlan });
    return;

    setProcessingTo(true);

    const cardElement = elements.getElement('card');

    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      await bbckaldi.post('/subscription/create', {
        paymentMethodId: paymentMethodReq.paymentMethod.id,
        priceId: selectedPlan.priceId, // this should come from ui
      });
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };
  const cardElementOptions = {
    base: {},
    invalid: {},
    hidePostalCode: true,
  };
  return (
    selectedPlan && (
      <form onSubmit={handleFormSubmit}>
        <CardElement options={cardElementOptions} onChange={handleCardDetailsChange} />
        {checkoutError && <div>{checkoutError}</div>}
        <button className='bluebutton' disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Pay ${selectedPlan.price}€`}
        </button>
      </form>
    )
  );
};

export default CheckoutForm;
