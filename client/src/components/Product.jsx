import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../services/apiService';
import { useCart } from '../contexts/CartContext';

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); 

  useEffect(() => {
    fetchProductById(productId)
      .then(setProduct)
      .catch(console.error);
  }, [productId]);

  const handleAddToCart = () => {
    if(product) {
      addToCart(product, 1); 
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
