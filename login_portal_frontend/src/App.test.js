import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login portal title', () => {
  render(<App />);
  const text = screen.getByText(/Rainbow Login Portal/i);
  expect(text).toBeInTheDocument();
});
