import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  test('calls the setIsLoggedIn function when login button is clicked', () => {
    const mockSetIsLoggedIn = jest.fn();
    render(<Login setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    expect(mockSetIsLoggedIn).toHaveBeenCalledTimes(1);
  });
});
