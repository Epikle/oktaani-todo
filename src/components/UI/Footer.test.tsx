import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
  it('Footer shows copyright', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent('oktaani.com');
  });
});
