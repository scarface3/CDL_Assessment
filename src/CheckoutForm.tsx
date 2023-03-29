import './CheckoutForm.css';

import { CartItem, Checkout, PricingRules } from './Checkout';
import React, { useState } from 'react';

type CheckoutFormProps = {
  pricingRules: PricingRules;
};

const CheckoutForm = ({ pricingRules }: CheckoutFormProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemToAdd, setItemToAdd] = useState<string>('');

  const checkout = new Checkout(pricingRules);

  const handleScanItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setCart(checkout.scan(itemToAdd, cart));
      setItemToAdd('');
    } catch (error: any) {
      alert(error.message);
    }
};


  const handleItemToAddChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemToAdd(event.target.value.toUpperCase());
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleScanItem}>
        <label>
          Item:
          <input
            type="text"
            value={itemToAdd}
            onChange={handleItemToAddChange}
          />
        </label>
        <button type="submit">Scan</button>
      </form>
      <button onClick={handleClearCart}>Clear Cart</button>
      <div className="cart">
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.item}>
                <td>{cartItem.item}</td>
                <td>{cartItem.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <h3>Total: £{(
            checkout.getTotal(cart))}</h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
