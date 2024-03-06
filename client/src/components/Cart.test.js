import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';

describe('Cart Component', () => {
  it('renders cart items correctly', () => {
    render(<Cart />);
    const cartItemElements = screen.getAllByTestId('cart-item');
    expect(cartItemElements.length).toBe(2); 
  });
});
