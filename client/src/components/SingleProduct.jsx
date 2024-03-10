import React from 'react';
import { useParams } from 'react-router-dom';

function SingleProduct({ products }) {
  let { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      {/* Add more products here */}
    </div>
  );
}

export default SingleProduct;
