import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

test('renders login component', () => {
  render(<Login />);
  const linkElement = screen.getByText('Log In TimeSheet');
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Remember me/i })).toBeInTheDocument();
});

test('renders the form correctly', () => {
  render(<Login />);
  const userNameElement = screen.getByPlaceholderText('username or email');
  const passwordElement = screen.getByPlaceholderText('password');
  const submitButton = screen.getByText('Submit');
  expect(userNameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
