import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Footer from './Footer';

describe('Footer', () => {
  it('Footer shows copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(`${currentYear} © oktaani.com`),
    ).toBeInTheDocument();
  });
});
