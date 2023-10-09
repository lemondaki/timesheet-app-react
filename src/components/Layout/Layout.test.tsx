import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
test('renders learn react link', () => {
  const mockSetColor = jest.fn();
  render(<Layout onSetColor={mockSetColor} />);
  const linkElement = screen.getByText('Timesheet');
  const button = document.querySelector('.ant-dropdown-trigger');
  expect(linkElement).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
