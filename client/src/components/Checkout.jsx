import React, { useState,  } from 'react';
import { useCart } from '../contexts/CartContext'; 

const Checkout = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: 'Bronna',
    address: '1234 Bia Road',
    city: 'Ningland',
    zip: '00000',
  });
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(); 

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting billing info:', billingInfo);
    console.log('Cart items for checkout:', cart); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Billing Info*/}
        <label>Name:</label>
        <input type="text" name="name" value={billingInfo.name} onChange={handleChange} />
        
        <label>Address:</label>
        <input type="text" name="address" value={billingInfo.address} onChange={handleChange} />
        
        <label>City:</label>
        <input type="text" name="city" value={billingInfo.city} onChange={handleChange} />
        
        <label>ZIP Code:</label>
        <input type="text" name="zip" value={billingInfo.zip} onChange={handleChange} />

        <button type="submit">Checkout</button>
      </form>

      {/* Display Cart Items */}
      <h2>Review Your Bag</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - Quantity: {item.quantity}
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
