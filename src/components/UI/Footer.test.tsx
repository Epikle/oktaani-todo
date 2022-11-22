import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Footer from './Footer';

describe('Footer', () => {
  it('Footer shows copyright', () => {
    render(<Footer />);

    expect(screen.getByText('2022 © oktaani.com')).toBeInTheDocument();
  });
});
