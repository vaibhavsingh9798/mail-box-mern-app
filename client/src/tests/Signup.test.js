// Signup.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Signup from './Signup';

test('renders signup form correctly', () => {

  const { getByPlaceholderText, getByText } = render(<Signup />);
  
  // Check if form elements are rendered correctly
  const usernameInput = getByPlaceholderText('Email');
  const emailInput = getByPlaceholderText('Confirm Password');
  
  const passwordInput = getByPlaceholderText('Password');
  const signupButton = getByText('Sign Up');

  // Assert that all form elements are present
  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});
