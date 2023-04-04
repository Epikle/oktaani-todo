import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Collection, ItemEntry, NewCollectionEntry, SelectedEntry } from '../types';
import * as todoService from '../services/todo';

type TodoState = typeof initialTodoState;
type TodoActions = {
  initCollections: () => void;
  createCollection: (entry: NewCollectionEntry) => void;
  createSharedCollection: (shareId: string) => Promise<void>;
  updateSharedCollection: (id: string) => Promise<void>;
  createCollectionItem: ({ id, itemEntry }: { id: string; itemEntry: ItemEntry }) => Promise<void>;
  changeOrder: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void;
  deleteCollection: ({ id, shared }: { id: string; shared: boolean }) => Promise<void>;
  toggleItemDone: ({ id, colId }: { id: string; colId: string }) => Promise<void>;
  removeDoneItems: (id: string) => Promise<void>;
  editCollection: (entry: SelectedEntry) => Promise<void>;
};

const initialTodoState: { collections: Collection[] | [] } = { collections: [] };

const useTodoStore = create(
  immer<TodoState & TodoActions>((set, get) => ({
    ...initialTodoState,
    initCollections: () => set(() => ({ collections: todoService.getTodosFromLS() })),
    createCollection: (entry) =>
      set((state) => {
        const createdEntry = todoService.createCollectionEntry(entry);
        todoService.saveCollectionsToLS([createdEntry, ...state.collections]);
        return { collections: [createdEntry, ...state.collections] };
      }),
    createSharedCollection: async (shareId) => {
      const collection = await todoService.getSharedCollectionData(shareId);

      set((state) => {
        if (state.collections.some((col) => col.id === collection.id)) {
          return { collections: state.collections };
        }

        todoService.saveCollectionsToLS([collection, ...state.collections]);

        return { collections: [collection, ...state.collections] };
      });
    },
    updateSharedCollection: async (id) => {
      const sharedCollectionData = await todoService.getSharedCollectionData(id);
      set((state) => {
        const collection = state.collections.find((col) => col.id === id);
        if (collection) {
          Object.assign(collection, sharedCollectionData);
          todoService.saveCollectionsToLS(state.collections);
        }
      });
    },
    createCollectionItem: async ({ id, itemEntry }) => {
      const { collections } = get();
      const collectionStateCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      const selectedCollection = collectionStateCopy.find((col) => col.id === id);

      if (!selectedCollection) return;

      const createdItem = todoService.createItemEntry(itemEntry);

      if (selectedCollection && selectedCollection.shared) {
        const sharedCollectionData = await todoService.getSharedCollectionData(id);
        selectedCollection.todos = [createdItem, ...sharedCollectionData.todos];
        await todoService.updateSharedCollection(selectedCollection);

        todoService.saveCollectionsToLS(collectionStateCopy);

        set(() => ({ collections: collectionStateCopy }));
        return;
      }

      selectedCollection.todos = [createdItem, ...selectedCollection.todos];

      todoService.saveCollectionsToLS(collectionStateCopy);

      set(() => ({ collections: collectionStateCopy }));
    },
    changeOrder: ({ dragIndex, hoverIndex }) =>
      set((state) => {
        const movingCollection = state.collections[dragIndex];
        state.collections.splice(dragIndex, 1);
        state.collections.splice(hoverIndex, 0, movingCollection);

        todoService.saveCollectionsToLS(state.collections);
      }),
    deleteCollection: async ({ id, shared }) => {
      if (shared) await todoService.deleteSharedCollection(id);
      set((state) => {
        const filteredCollectionList = state.collections.filter((col) => col.id !== id);
        todoService.saveCollectionsToLS([...filteredCollectionList]);

        return { collections: [...filteredCollectionList] };
      });
    },
    toggleItemDone: async ({ id, colId }) => {
      const { collections } = get();
      const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      const selectedCollection = collectionsCopy.find((col) => col.id === colId);

      const toggleItem = collectionsCopy
        .map((col) => col.todos)
        .flat()
        .find((item) => item.id === id);

      if (!toggleItem || !selectedCollection) return;

      toggleItem.done = !toggleItem.done;

      if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      set(() => {
        todoService.saveCollectionsToLS(collectionsCopy);
        return { collections: collectionsCopy };
      });
    },
    removeDoneItems: async (id) => {
      const { collections } = get();
      const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      const selectedCollection = collectionsCopy.find((col) => col.id === id);

      if (!selectedCollection) return;

      selectedCollection.todos = [...selectedCollection.todos.filter((item) => !item.done)];
      if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      set(() => {
        todoService.saveCollectionsToLS(collectionsCopy);
        return { collections: collectionsCopy };
      });
    },
    editCollection: async (entry) => {
      const { collections } = get();
      const collection = collections.find((col) => col.id === entry.id);

      if (collection && entry.shared) {
        const newCollection = { ...collection, ...entry };
        await todoService.updateSharedCollection(newCollection);
      }

      if (collection && collection.shared && !entry.shared) {
        await todoService.deleteSharedCollection(collection.id);
      }

      set((state) => {
        const stateCollection = state.collections.find((col) => col.id === entry.id);

        if (stateCollection) {
          Object.assign(stateCollection, entry);
          todoService.saveCollectionsToLS(state.collections);
        }
      });
    },
  })),
);

export default useTodoStore;
