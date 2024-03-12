import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/apiService';
import Product from './Product'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  if (!products.length) return <div>Loading products...</div>;

  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} productId={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
