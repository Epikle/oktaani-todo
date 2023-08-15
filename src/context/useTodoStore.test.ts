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
const spyDeleteSharedCollection = vi.spyOn(todoService, 'deleteSharedCollection');

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

  // TODO
  // it('createSharedCollection, Should fetch and fail to create new collection from share id, same id, has collection', async () => {
  //   spyGetTodosFromLS.mockReturnValueOnce(testCollections);
  //   spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollections[0]));
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.initCollections();
  //     result.current.actions.createSharedCollection('share-id');
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(0);
  //   });
  // });

  // TODO
  // it('createSharedCollection, Should fetch and  create new collection from share id, has collection', async () => {
  //   spyGetTodosFromLS.mockReturnValueOnce(testCollections);
  //   spyGetSharedCollectionData.mockImplementationOnce(async () =>
  //     Promise.resolve({ ...testCollections[0], id: 'new-id' }),
  //   );
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.initCollections();
  //     result.current.actions.createSharedCollection('share-id');
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(1);
  //   });
  // });

  // TODO
  // it('createSharedCollection, Should fetch and fail to create new collection from share id, no collections', async () => {
  //   spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollections[0]));
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.createSharedCollection('share-id');
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(1);
  //   });
  // });

  // TODO
  // it('updateSharedCollection, Should fetch shared collection but no match found', async () => {
  //   spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollections[0]));
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.updateSharedCollection('share-id');
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(0);
  //   });
  // });

  // TODO
  // it('updateSharedCollection, Should fetch shared collection and update', async () => {
  //   initMockCollections(testCollections);
  //   spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollections[0]));
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.updateSharedCollection(testCollections[0].id);
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(1);
  //   });
  // });

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

  // TODO
  // it('editNote, Should update note to LS, shared', async () => {
  //   initMockCollections([{ ...testCollections[0], shared: true }]);
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.updateNote({ colId: testCollections[0].id, message: 'test-note' });
  //   });

  //   await waitFor(() => {
  //     expect(spyUpdateSharedCollection).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(1);
  //     expect(result.current.notes?.[0].message).toBe('test-note');
  //   });
  // });

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

  // TODO
  // it('createCollectionItem, Should create new collection item, shared', async () => {
  //   initMockCollections([{ ...testCollections[0], shared: true }]);
  //   spyGetSharedCollectionData.mockImplementation(() => Promise.resolve(testCollections[0]));
  //   const { result } = renderHook(() => useTodoStore((state) => state));
  //   act(() => {
  //     result.current.actions.createItem(testItem);
  //   });
  //   await waitFor(() => {
  //     expect(spyGetSharedCollectionData).toBeCalledTimes(1);
  //     expect(spyUpdateSharedCollection).toBeCalledTimes(1);
  //     expect(spySaveCollectionsToLS).toBeCalledTimes(1);
  //     expect(result.current.items?.length).toBe(1);
  //   });
  // });

  it('changeOrder, Should change order of two collections', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.changeOrder({ dragIndex: 0, hoverIndex: 1 });
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
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyDeleteSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections?.length).toBe(testCollections.length - 1);
    });
  });

  it('deleteCollection, Should delete collection, shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.deleteCollection({ id: testCollections[0].id, shared: true });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyDeleteSharedCollection).toBeCalledTimes(1);
      expect(result.current.collections.length).toBe(testCollections.length - 1);
    });
  });

  it('toggleItemDone, Should not toggle collection item with fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.toggleItemDone({ id: 'fake-id', colId: 'fake-cid' });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
    });
  });

  it('toggleItemDone, Should toggle collection item, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.toggleItemDone({ id: testCollections[0].todos[0].id, colId: testCollections[0].id });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(testCollections[0].todos[0].done).not.toBe(result.current.collections[0].todos[0].done);
    });
  });

  it('toggleItemDone, Should toggle collection item, shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.toggleItemDone({ id: testCollections[0].todos[0].id, colId: testCollections[0].id });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(1);
      expect(testCollections[0].todos[0].done).not.toBe(result.current.collections[0].todos[0].done);
    });
  });

  it('removeDoneItems, Should not remove done items fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeDoneItems('fake-id');
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(testCollections[0].todos.length).toBe(result.current.collections[0].todos.length);
    });
  });

  it('removeDoneItems, Should remove done items, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeDoneItems(testCollections[0].id);
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].todos.length).toBe(testCollections[0].todos.length - 1);
    });
  });

  it('removeDoneItems, Should remove done items, shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeDoneItems(testCollections[0].id);
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(1);
      expect(result.current.collections[0].todos.length).toBe(testCollections[0].todos.length - 1);
    });
  });

  it('removeTodoItem, Should not remove item, fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeTodoItem({ id: 'fake-id', colId: 'fake-cid' });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(testCollections[0].todos.length).toBe(result.current.collections[0].todos.length);
    });
  });

  it('removeTodoItem, Should remove item, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeTodoItem({ id: testCollections[0].todos[0].id, colId: testCollections[0].id });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].todos.length).toBe(testCollections[0].todos.length - 1);
    });
  });

  it('removeTodoItem, Should remove item, shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.removeTodoItem({ id: testCollections[0].todos[0].id, colId: testCollections[0].id });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(1);
      expect(result.current.collections[0].todos.length).toBe(testCollections[0].todos.length - 1);
    });
  });

  it('editTodoItemPriority, Should not change item priority, fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editTodoItemPriority({ id: 'fake-id', colId: 'fake-cid', newPriority: 'low' });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].todos[0].priority).toBe(testCollections[0].todos[0].priority);
    });
  });

  it('editTodoItemPriority, Should change item priority low -> medium, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editTodoItemPriority({
        id: testCollections[0].todos[0].id,
        colId: testCollections[0].id,
        newPriority: 'medium',
      });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].todos[0].priority).toBe('medium');
    });
  });

  it('editTodoItemPriority, Should change item priority low -> medium, shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editTodoItemPriority({
        id: testCollections[0].todos[0].id,
        colId: testCollections[0].id,
        newPriority: 'medium',
      });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(1);
      expect(result.current.collections[0].todos[0].priority).toBe('medium');
    });
  });
  // editCollection
  // { id: testCollections[0].id, shared: false, noShare: true }
  it('editCollection, Should not edit collection, fake id, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editCollection({ id: 'fake-cid', shared: false, noShare: true });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(0);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(spyDeleteSharedCollection).toBeCalledTimes(0);
    });
  });

  it('editCollection, Should edit collection title, not shared', async () => {
    initMockCollections(testCollections);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editCollection({
        id: testCollections[0].id,
        title: 'new-title',
        shared: false,
        noShare: true,
      });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(spyDeleteSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].title).toBe('new-title');
    });
  });

  it('editCollection, Should edit collection title, not shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editCollection({
        id: testCollections[0].id,
        title: 'new-title',
        shared: false,
        noShare: false,
      });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(0);
      expect(spyDeleteSharedCollection).toBeCalledTimes(1);
      expect(result.current.collections[0].title).toBe('new-title');
    });
  });

  it('editCollection, Should edit collection title, shared', async () => {
    initMockCollections([{ ...testCollections[0], shared: true }]);
    const { result } = renderHook(() => useTodoStore((state) => state));
    act(() => {
      result.current.actions.editCollection({
        id: testCollections[0].id,
        title: 'new-title',
        shared: true,
        noShare: false,
      });
    });
    await waitFor(() => {
      expect(spySaveCollectionsToLS).toBeCalledTimes(1);
      expect(spyUpdateSharedCollection).toBeCalledTimes(1);
      expect(spyDeleteSharedCollection).toBeCalledTimes(0);
      expect(result.current.collections[0].title).toBe('new-title');
    });
  });
});
