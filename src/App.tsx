import CheckoutForm from './CheckoutForm';
import { PricingRules } from './Checkout';
import React from 'react';

const pricingRules: PricingRules = {
  A: {
    unitPrice: 50,
    specialPrice: {
      quantity: 3,
      price: 130,
    },
  },
  B: {
    unitPrice: 30,
    specialPrice: {
      quantity: 2,
      price: 45,
    },
  },
  C: {
    unitPrice: 20,
  },
};

function App() {
  return (
    <div className="App">
      <h1>Checkout</h1>
      <CheckoutForm pricingRules={pricingRules} />
    </div>
  );
}

export default App;
