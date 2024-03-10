import React, { useState } from 'react';

const Checkout = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting billing info:', billingInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default Checkout;
