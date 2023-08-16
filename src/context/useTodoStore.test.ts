import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useTodoStore from './useTodoStore';
import * as todoService from '../services/todo';
import { Collection } from '../utils/types';
import { testCollections, testItem } from '../setupTests';

const spyGetTodosFromLS = vi.spyOn(todoService, 'getFromLocalStorage');
const spySaveCollectionsToLS = vi.spyOn(todoService, 'saveToLocalStorage');
const spyCreateCollectionEntry = vi.spyOn(todoService, 'createCollectionEntry');
// const spyGetSharedCollectionData = vi.spyOn(todoService, 'getSharedCollection');
const spyUpdateSharedCollection = vi.spyOn(todoService, 'updateSharedCollection');

beforeEach(() => {
  spyGetTodosFromLS.mockReturnValueOnce(null);
  const { result } = renderHook(() => useTodoStore((state) => state));
  act(() => {
    result.current.actions.initCollections();
  });
  vi.resetAllMocks();
});

const initMockCollections = (collections: Collection[]) => {
  spyGetTodosFromLS.mockReturnValueOnce(collections);
  const { result } = renderHook(() => useTodoStore((state) => state));
  act(() => {
    result.current.actions.initCollections();
  });
};

describe('useTodoStore', () => {
  it('initCollections, Should get collections from LS', async () => {
    spyGetTodosFromLS.mockReturnValueOnce(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
    });
    await waitFor(() => {
      expect(spyGetTodosFromLS).toBeCalledTimes(1);
      expect(result.current.collections?.length).toBe(testCollections.length);
    });
  });

  it('initCollections, Should fail to get collections from LS', async () => {
    spyGetTodosFromLS.mockImplementationOnce(() => {
      throw new Error('error');
    });
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
    });
    await waitFor(() => {
      expect(spyGetTodosFromLS).toBeCalledTimes(1);
      expect(result.current.collections).toBe(null);
    });
  });

  it('createCollection, Should create new collection', async () => {
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.createCollection({ title: testCollections[0].title, color: testCollections[0].color });
    });
    await waitFor(() => {
      expect(spyCreateCollectionEntry).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(result.current.collections?.length).toBe(1);
    });
  });

  it('editNote, Should update note to LS, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.updateNote({ colId: testCollections[0].id, message: 'test-note' });
    });
    await waitFor(() => {
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(result.current.notes?.[0].message).toBe('test-note');
    });
  });

  it('createCollectionItem, Should create new collection item, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.createItem(testItem);
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(result.current.items?.length).toBe(1);
    });
  });

  it('changeOrder, Should change order of two collections', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.changeOrder({ dragIdx: 0, hoverIdx: 1 });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(result.current.collections?.[0].id).toBe(testCollections[1].id);
      expect(result.current.collections?.[1].id).toBe(testCollections[0].id);
    });
  });

  it('deleteCollection, Should delete collection, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.deleteCollection(testCollections[0].id);
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(3);
      expect(result.current.collections?.length).toBe(testCollections.length - 1);
    });
  });

  it('toggleItemStatus, Should not toggle collection item with fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.toggleItemStatus('fake-id');
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
    });
  });
});
