import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

describe('Header', () => {
  it('Logo is showing', () => {
    render(<Header />);

    expect(screen.getByText('oktaani')).toBeInTheDocument();
  });
});
