import React, { useState, useEffect } from 'react';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const categories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'https://fakestoreapi.com/products';
      if (selectedCategory !== 'All') {
        url += `/category/${selectedCategory}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const filterByPrice = () => {
      const filtered = products.filter(product => {
        const price = product.price;
        return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
      });
      setFilteredProducts(filtered);
    };

    filterByPrice();
  }, [minPrice, maxPrice, products]);

  return (
    <div>
      <div className="filter-sort-controls">
        <label htmlFor="category-select">Select Category: </label>
        <select id="category-select" onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Price Filters */}
        <label htmlFor="min-price">Min Price: </label>
        <input id="min-price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="No Min" />

        <label htmlFor="max-price">Max Price: </label>
        <input id="max-price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="No Max" />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} productId={product.id} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
