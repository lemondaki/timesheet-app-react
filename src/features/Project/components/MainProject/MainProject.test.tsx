import React from 'react';
import { render, screen } from '@testing-library/react';
import MainProject from './MainProject';
test('renders learn react link', () => {
  render(<MainProject />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
