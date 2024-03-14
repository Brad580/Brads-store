import React, { useState, useEffect, useContext } from 'react';
import { fetchProductById } from '../services/apiService';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import './Product.css'; 

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const { addToCart } = useCart();
  const { isLoggedIn, triggerLoginModal } = useContext(AuthContext);

  useEffect(() => {
    fetchProductById(productId)
      .then(productData => setProduct(productData))
      .catch(console.error);
  }, [productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      triggerLoginModal();
      return;
    }
    addToCart(product, quantity); 
  };

  const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="quantity-controls">
        <button onClick={decrementQuantity}>-</button>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
        <button onClick={incrementQuantity}>+</button>
      </div>
      <button onClick={handleAddToCart}>Add to Bag</button>
    </div>
  );
};

export default Product;
