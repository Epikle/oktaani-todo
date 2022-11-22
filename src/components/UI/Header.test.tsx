import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';
import { renderWithProviders } from '../../utils/test-utils';

describe('Header', () => {
  it('Logo is showing', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('oktaani')).toBeInTheDocument();
  });
});
