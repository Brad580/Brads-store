import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  test('shows the login component when not logged in', () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('shows product list and cart when logged in', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/login/i));

    expect(screen.getByText(/welcome to our store/i)).toBeInTheDocument();
    expect(screen.getByText(/product list/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
