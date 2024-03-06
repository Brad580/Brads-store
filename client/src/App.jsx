import React, { useState, useEffect } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import { addToCartApi, fetchCartItems, removeFromCart } from './services/apiService';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchCartItems(userId).then(setCartItems).catch(console.error);
    }
  }, [isLoggedIn, userId]);

  // Directly set a simulated user ID upon "login"
  const handleLogin = () => {
    const simulatedToken = "simulatedToken"; // Simulate token for example purposes
    localStorage.setItem('token', simulatedToken);

    // Generate a fixed or random user ID for demonstration
    const simulatedUserId = 1234; // For consistency, use a static ID or use Math.floor(Math.random() * 10000) for a random ID
    setUserId(simulatedUserId);
    setIsLoggedIn(true);
  };

  const handleSignupSuccess = () => {
    setShowLogin(true);
  };

  const toggleView = () => setShowLogin(!showLogin);

  const handleAddToCart = async (product) => {
    if (!userId) {
      console.error("User ID is missing. User must be logged in to add items to cart.");
      return;
    }
    try {
      await addToCartApi(userId, product);
      const updatedItems = await fetchCartItems(userId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      const updatedItems = await fetchCartItems(userId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Brad's Store</h1>
      {!isLoggedIn ? (
        <>
          {showLogin ? (
            <>
              {/* Adjust to call handleLogin instead */}
              <button onClick={handleLogin}>Log In</button> 
              <button onClick={toggleView}>Sign Up Instead</button>
            </>
          ) : (
            <>
              <Signup onSignupSuccess={handleSignupSuccess} />
              <button onClick={toggleView}>Login Instead</button>
            </>
          )}
        </>
      ) : (
        <>
          <ProductList onAddToCart={handleAddToCart} />
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
        </>
      )}
    </div>
  );
}

export default App;
