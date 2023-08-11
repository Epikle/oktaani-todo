import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useTodoStore, { Collection } from './useTodoStore';
import * as todoService from '../services/todo';

const testCollection: Collection[] = [
  {
    id: 'IwYiZF70veJRPzQifSt9K',
    title: 'test23',
    color: '#7b68ee',
    shared: false,
    created: 'Fri Jun 16 2023 13:56:42 GMT+0300 (Itä-Euroopan kesäaika)',
    todos: [
      {
        id: 'PChjiHE-Wr3PZ2KNBN0-z',
        text: '6',
        done: true,
        created: 'Thu Jul 20 2023 09:49:27 GMT+0300 (Itä-Euroopan kesäaika)',
        priority: 'low',
      },
    ],
    note: '',
    type: 'todo',
  },
];

const spyGetTodosFromLS = vi.spyOn(todoService, 'getTodosFromLS');
const spyCreateCollectionEntry = vi.spyOn(todoService, 'createCollectionEntry');
const spySaveCollectionsToLS = vi.spyOn(todoService, 'saveCollectionsToLS');
const spyGetSharedCollectionData = vi.spyOn(todoService, 'getSharedCollectionData');

beforeEach(() => {
  spyGetTodosFromLS.mockReturnValueOnce([]);
  const { result } = renderHook(() => useTodoStore((state) => state));
  act(() => {
    result.current.actions.initCollections();
  });
  vi.resetAllMocks();
});

describe('useTodoStore', () => {
  it('Should get collections from LS', async () => {
    spyGetTodosFromLS.mockReturnValueOnce(testCollection);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
    });
    await waitFor(() => {
      expect(spyGetTodosFromLS).toBeCalledTimes(1);
      expect(result.current.collections.length).toBe(1);
    });
  });

  it('Should fail to get collections from LS', async () => {
    spyGetTodosFromLS.mockImplementationOnce(() => {
      throw new Error('error');
    });
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
    });
    await waitFor(() => {
      expect(spyGetTodosFromLS).toBeCalledTimes(1);
      expect(result.current.collections.length).toBe(0);
    });
  });

  it('Should create new collection', async () => {
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.createCollection({ title: testCollection[0].title, color: testCollection[0].color });
    });
    await waitFor(() => {
      expect(spyCreateCollectionEntry).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(result.current.collections.length).toBe(1);
    });
  });

  it('Should fetch and fail to create new collection from share id, same id, has collection', async () => {
    spyGetTodosFromLS.mockReturnValueOnce(testCollection);
    spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollection[0]));
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
      result.current.actions.createSharedCollection('share-id');
    });
    await waitFor(() => {
      expect(spyGetSharedCollectionData).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
    });
  });

  it('Should fetch and  create new collection from share id, has collection', async () => {
    spyGetTodosFromLS.mockReturnValueOnce(testCollection);
    spyGetSharedCollectionData.mockImplementationOnce(async () =>
      Promise.resolve({ ...testCollection[0], id: 'new-id' }),
    );
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
      result.current.actions.createSharedCollection('share-id');
    });
    await waitFor(() => {
      expect(spyGetSharedCollectionData).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
    });
  });

  it('Should fetch and fail to create new collection from share id, no collections', async () => {
    spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollection[0]));
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.createSharedCollection('share-id');
    });
    await waitFor(() => {
      expect(spyGetSharedCollectionData).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
    });
  });

  it('Should fetch shared collection but no match found', async () => {
    spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollection[0]));
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.updateSharedCollection('share-id');
    });
    await waitFor(() => {
      expect(spyGetSharedCollectionData).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
    });
  });

  it('Should fetch shared collection and update', async () => {
    spyGetTodosFromLS.mockReturnValueOnce(testCollection);
    spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollection[0]));
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.initCollections();
      result.current.actions.updateSharedCollection(testCollection[0].id);
    });
    await waitFor(() => {
      expect(spyGetSharedCollectionData).toBeCalledTimes(1);
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
    });
  });
});
