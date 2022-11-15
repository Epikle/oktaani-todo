import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Testing if testing works', () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});
