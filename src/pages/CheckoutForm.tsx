import '../style/CheckoutForm.css';

import { CartItem, Checkout, PricingRules } from '../components/Checkout';
import React, { useState } from 'react';

import {ReactComponent as Cancel} from "../svg/inactiveTrash.svg";
import { Link } from 'react-router-dom';
import {ReactComponent as Minus} from "../svg/minus.svg";
import {ReactComponent as Plus} from "../svg/plus.svg";

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



const handleItemQuantityChange = (
  item: CartItem,
  newQuantity: number
) => {
  const updatedCart = [...cart];
  const itemIndex = updatedCart.findIndex(
    (cartItem) => cartItem.item === item.item
  );
  if (itemIndex >= 0) {
    updatedCart[itemIndex].quantity = newQuantity;
    setCart(updatedCart);
    if (newQuantity === 0){
      handleRemoveFromCart(item)
    }
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
  const handleRemoveFromCart = (item: CartItem) => {
    const updatedCart = cart.filter(cartItem => cartItem.item !== item.item);
    setCart(updatedCart);
  };

  return (


    <div className='.container'>

      <div className='card'>

    
      <div className='header'> Check-out</div>
      <div className='scan'>
        <form onSubmit={handleScanItem}>
       <div className='labelClass'>

          <input
            type="text"
         value={itemToAdd}
            onChange={handleItemToAddChange}
            placeholder ="Scan item..."
           />

<button type="submit">Scan</button>
       </div>
     
        
       </form>

      </div>
      <div className='cartSection'>
      <div className="cart">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
              <th>Item</th>
             <th>Quantity</th>
             <th>Price</th>
             <th></th>
           </tr>
         </thead>
           <tbody>
           {cart.map((cartItem) => (
           <tr key={cartItem.item}>
              <td>{cartItem.item}</td>
              <td className='data'>
                      <Minus className='plus'
                        onClick={() =>
                          handleItemQuantityChange(
                            cartItem,
                            cartItem.quantity - 1
                          )
                        }
                      />

                      {cartItem.quantity}
                      <Plus className='plus'
                        onClick={() =>
                          handleItemQuantityChange(
                            cartItem,
                            cartItem.quantity + 1
                          )
                        }
                      />

                    </td>
               <td>£{(
            checkout.getPrice(cartItem.item,cartItem.quantity))}</td>
                           <td>    <div className='cancel' onClick={() => {
handleRemoveFromCart(cartItem);

                           } }> <Cancel className='cancel'/></div></td>
             </tr>
             
           ))}
         </tbody>
        </table>
        <div className="total">
{ cart.length > 0 &&         <div className='TotalSection'>
          <button className='button2' onClick={handleClearCart}>Clear Cart</button>
        <Link to= "success">  <button > Proceed to Payment</button> </Link>

          </div>}

  <h3>Total: £{(checkout.getTotal(cart))}</h3>
</div>

        </div>

      </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
