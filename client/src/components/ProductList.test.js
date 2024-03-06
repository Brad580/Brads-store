import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList Component', () => {
  it('renders products correctly', () => {
    render(<ProductList />);
    const productElements = screen.getAllByTestId('product-item');
    expect(productElements.length).toBe(2); 
  });
});
