import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSelectedStore from './useSelectedStore';

describe('useSelectedStore', () => {
  it('Should set selected to true', async () => {
    const { result } = renderHook(() => useSelectedStore((state) => state));
    act(() => {
      result.current.actions.setSelectedCollection({});
    });
    await waitFor(() => {
      expect(result.current.selected).toBeTruthy();
    });
  });
});
