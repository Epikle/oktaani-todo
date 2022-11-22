import { renderWithProviders } from './utils/test-utils';

import App from './App';

describe('App', () => {
  it('Testing if testing works', () => {
    renderWithProviders(<App />);

    expect(true).toBeTruthy();
  });
});
