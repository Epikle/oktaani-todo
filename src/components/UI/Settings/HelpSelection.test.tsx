/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render, waitFor } from '@testing-library/react';

import HelpSelection from './HelpSelection';
import useTodoStore from '../../../context/useTodoStore';
import { testCollections } from '../../../setupTests';

describe('HelpSelection', () => {
  it('Button should not have class help-active', () => {
    const { getByTestId } = render(<HelpSelection />);
    const btn = getByTestId('help-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveClass('help-active');
  });

  it('Button should be disabled', () => {
    const { getByTestId } = render(<HelpSelection />);
    const btn = getByTestId('help-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('Button should not be disabled', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockReturnValue(testCollections);
    const { getByTestId } = render(<HelpSelection />);
    const btnElem = getByTestId('help-btn');
    expect(btnElem).toBeInTheDocument();
    expect(btnElem).not.toBeDisabled();
  });

  it('Button should have class help-active', async () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockReturnValue(testCollections);
    const { getByTestId } = render(<HelpSelection />);
    const btnElem = getByTestId('help-btn');
    fireEvent.click(btnElem);
    await waitFor(() => {
      expect(btnElem).toBeInTheDocument();
      expect(btnElem).not.toBeDisabled();
      expect(btnElem.getAttribute('class')).toContain('help-active');
    });
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
