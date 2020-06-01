import React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import bbckaldi from '../../../apis/bbckaldi';

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      plan: 'premium',
    };
    setProcessingTo(true);

    const cardElement = elements.getElement('card');

    try {
      const { data: clientSecret } = await bbckaldi.post(
        '/subscription/create',
        {
          amount: price * 100,
        }
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

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
    <form onSubmit={handleFormSubmit}>
      <CardElement
        options={cardElementOptions}
        onChange={handleCardDetailsChange}
      />
      {checkoutError && <div>{checkoutError}</div>}
      <button className='bluebutton' disabled={isProcessing}>
        {isProcessing ? 'Processing...' : `Pay ${price}€`}
      </button>
    </form>
  );
};

export default CheckoutForm;
