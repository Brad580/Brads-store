import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../services/apiService';

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(productId)
      .then(setProduct)
      .catch(console.error);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default Product;
