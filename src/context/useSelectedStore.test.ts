import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSelectedStore from './useSelectedStore';
import * as todoService from '../services/todo';
import { testCollections } from '../../setupTests';
import useTodoStore from './useTodoStore';

const spyGetTodosFromLS = vi.spyOn(todoService, 'getFromLocalStorage');

beforeEach(() => {
  spyGetTodosFromLS.mockReturnValueOnce(testCollections);
  const { result } = renderHook(() => useTodoStore((state) => state));
  act(() => {
    result.current.actions.initCollections();
  });
});

describe('useSelectedStore', () => {
  it('Should set selected collection', () => {
    const { result } = renderHook(() => useSelectedStore((state) => state));
    act(() => {
      result.current.actions.setSelectedCollection({ id: testCollections[0].id, edit: false });
    });
    expect(result.current.selectedCollection).not.toBeNull();
  });

  it('Should reset selected collection', () => {
    const { result } = renderHook(() => useSelectedStore((state) => state));
    act(() => {
      result.current.actions.resetSelection();
    });
    expect(result.current.selectedCollection).toBeNull();
  });
});
