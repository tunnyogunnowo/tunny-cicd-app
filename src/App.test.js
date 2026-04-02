import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Babatunde Ogunnowo', () => {
  render(<App />);
  const heading = screen.getByText(/Babatunde Ogunnowo/i);
  expect(heading).toBeInTheDocument();
});
