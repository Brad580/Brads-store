import React, { useState } from 'react';
import { signup } from '../services/apiService';

function Signup({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: ''
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes("name.")) {
      const key = name.split(".")[1]; 
      setFormData({
        ...formData,
        name: { ...formData.name, [key]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(formData);
      console.log(response); 
      onSignupSuccess(); 
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up </h2>
      {/* Email, Username, Password fields */}
      <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      {/* Name fields */}
      <input type="text" name="name.firstname" value={formData.name.firstname} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="name.lastname" value={formData.name.lastname} onChange={handleChange} placeholder="Last Name" />
      {/* Add other input fields as necessary */}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
