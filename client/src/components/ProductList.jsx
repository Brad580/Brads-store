import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { fetchProducts } from '../services/apiService';
import { useCart } from '../contexts/CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const cartContext = useCart(); 

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchAndSetProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => cartContext.addToCart(product, 1)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
