import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { fetchProducts } from '../services/apiService';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>The Stuff You Need to Buy Right Now</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <strong>{product.name}</strong>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <button onClick={() => onAddToCart({...product, quantity: 1})}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
