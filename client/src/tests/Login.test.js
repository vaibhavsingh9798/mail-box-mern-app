// Signup.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Login from "../components/Auth/Login"

test('renders signup form correctly', () => {

  const { getByPlaceholderText, getByText } = render(<Login />);
  
  // Check if form elements are rendered correctly
  const useremailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  // Assert that all form elements are present
  expect(useremailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
