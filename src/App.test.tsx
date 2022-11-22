import { render } from '@testing-library/react';

jest.mock('@formkit/auto-animate', jest.fn());
jest.mock('nanoid', jest.fn());

import App from './App';

describe('App', () => {
  it('Testing if testing works', () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});
