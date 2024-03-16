import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext'; 
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, calculateTotal } = useCart(); 
  const navigate = useNavigate();
  
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    paymentMethod: 'Credit Card', 
  });

  const handleChange = (e) => {
    setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout Info:', checkoutInfo);
    console.log('Cart items for checkout:', cart);
    console.log('Total Cost:', calculateTotal()); 
    alert('Checkout Successful!'); 
    navigate('/thank-you'); 
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for basic information */}
        <input type="text" name="name" placeholder="Full Name" value={checkoutInfo.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={checkoutInfo.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={checkoutInfo.city} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" value={checkoutInfo.zip} onChange={handleChange} required />
        
        {/* Input fields for contact information */}
        <input type="email" name="email" placeholder="Email" value={checkoutInfo.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={checkoutInfo.phone} onChange={handleChange} required />
        
        {/* Dropdown for payment method selection */}
        <select name="paymentMethod" value={checkoutInfo.paymentMethod} onChange={handleChange} required>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        
        <button type="submit">Complete Checkout</button>
      </form>

      {/* Displaying the total cost */}
      <h3>Total Cost: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Checkout;
