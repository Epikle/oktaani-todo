import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSelectedStore from './useSelectedStore';

describe('useSelectedStore', () => {
  it('Should set selected to true', () => {
    const { result } = renderHook(() => useSelectedStore((state) => state));
    act(() => {
      result.current.actions.setSelectedCollection({});
    });
    expect(result.current.selected).toBeTruthy();
  });
});
