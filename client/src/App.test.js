import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import App from './App';

test('renders HomePage by default', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const header = screen.getByTestId('logoH1');
  const text = within(header).getByText(/NexuHealth/i);
  expect(text).toBeInTheDocument();
});
