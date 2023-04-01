import { Route, Routes } from 'react-router-dom';

import CheckoutForm from './pages/CheckoutForm';
import { PricingRules } from './components/Checkout';
import React from 'react';
import SuccessPage from './pages/SuccessPage';

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

  D: {
    unitPrice: 15,
  },
};



function App() {
  return (
<Routes>
<Route path="/" element={      <CheckoutForm pricingRules={pricingRules} />} />
<Route path="success" element={      <SuccessPage />} />
</Routes>



  );
}

export default App;

