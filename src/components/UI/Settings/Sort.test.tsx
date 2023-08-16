/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';

import Sort from './Sort';
import useTodoStore from '../../../context/useTodoStore';
import { testCollections } from '../../../setupTests';

describe('Sort', () => {
  it('Btn should be disabled', () => {
    const { getByRole } = render(<Sort disabled />);
    const btn = getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });

  it('Btn should be still disabled, no collections', () => {
    const { getByRole } = render(<Sort disabled={false} />);
    const btn = getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });

  it('Btn should be active, with collections', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockReturnValueOnce(testCollections);
    const { getByRole } = render(<Sort disabled={false} />);
    const btn = getByRole('button');
    expect(btn).not.toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
