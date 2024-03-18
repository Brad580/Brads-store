import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext'; 

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <Router>
        <AuthProvider> {}
          <Login />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows user to enter username and password', () => {
    render(
      <Router>
        <AuthProvider> {}
          <Login />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'password' } });

    expect(screen.getByLabelText(/username:/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/password:/i)).toHaveValue('password');
  });

  it('calls login function on form submission', async () => {
    render(
      <Router>
        <AuthProvider> {}
          <Login />
        </AuthProvider>
      </Router>
    );

  });
});
