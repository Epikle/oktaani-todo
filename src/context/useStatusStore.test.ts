import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useStatusStore from './useStatusStore';

beforeEach(() => {
  const { result } = renderHook(() => useStatusStore((state) => state));
  act(() => {
    result.current.actions.setError('error-message');
  });
});

describe('useStatusStore', () => {
  it('Should have error state', () => {
    const { result } = renderHook(() => useStatusStore((state) => state));
    expect(result.current.isError).toBeTruthy();
    expect(result.current.errorMessage).toBe('error-message');
  });

  it('Should reset error state', () => {
    const { result } = renderHook(() => useStatusStore((state) => state));
    act(() => {
      result.current.actions.resetError();
    });
    expect(result.current.isError).toBe(false);
  });
});
