import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { z } from 'zod';

import useSelectedStore, { type SelectedEntry } from './useSelectedStore';
import * as todoService from '../services/todo';

export const TodoTypeEnum = z.enum(['todo', 'note', 'unset']);
export const TodoItemPriorityEnum = z.enum(['low', 'medium', 'high']);
export type TodoItemPriority = z.infer<typeof TodoItemPriorityEnum>;
export const ItemZ = z.object({
  id: z.string(),
  text: z.string(),
  done: z.boolean().default(false),
  created: z.string(),
  priority: TodoItemPriorityEnum.default('low'),
});
export const CollectionZ = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string(),
  shared: z.boolean(),
  created: z.string(),
  todos: ItemZ.array(),
  note: z.string().default(''),
  type: TodoTypeEnum.default('todo'),
});

type TodoState = typeof initialTodoState;
export type TodoSlice = TodoState & {
  actions: {
    initCollections: () => void;
    createCollection: (entry: NewCollectionEntry) => void;
    createSharedCollection: (shareId: string) => Promise<void>;
    updateSharedCollection: (id: string) => Promise<void>;
    editNote: ({ id, note }: { id: string; note: string }) => Promise<void>;
    createCollectionItem: ({ id, itemEntry }: { id: string; itemEntry: ItemEntry }) => Promise<void>;
    changeOrder: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void;
    deleteCollection: ({ id, shared }: { id: string; shared: boolean }) => Promise<void>;
    toggleItemDone: ({ id, colId }: { id: string; colId: string }) => Promise<void>;
    removeDoneItems: (id: string) => Promise<void>;
    removeTodoItem: ({ id, colId }: { id: string; colId: string }) => Promise<void>;
    editCollection: (entry: SelectedEntry & { noShare?: boolean }) => Promise<void>;
    toggleHelp: () => void;
  };
};

export type TodoTypes = z.infer<typeof TodoTypeEnum>;
export type Collection = z.infer<typeof CollectionZ>;
export type Item = z.infer<typeof ItemZ>;
export type NewCollectionEntry = Pick<Collection, 'title' | 'color'>;
export type ItemEntry = Omit<Item, 'id' | 'done' | 'created'>;

const initialTodoState: { collections: Collection[] | []; help: boolean } = { collections: [], help: false };

const useTodoStore = create<TodoSlice>()(
  immer((set, get) => ({
    ...initialTodoState,
    actions: {
      initCollections: () =>
        set(() => {
          try {
            const collections = CollectionZ.array().parse(todoService.getTodosFromLS());
            return { collections };
          } catch (error) {
            return { collections: [] };
          }
        }),
      createCollection: (entry) =>
        set((state) => {
          const createdEntry = todoService.createCollectionEntry(entry, 'unset');
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
      editNote: async ({ id, note }) => {
        const { collections } = get();
        const collectionStateCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
        const selectedCollection = collectionStateCopy.find((col) => col.id === id);

        if (!selectedCollection) return;

        selectedCollection.note = note;

        if (selectedCollection && selectedCollection.shared) {
          await todoService.updateSharedCollection(selectedCollection);
        }

        todoService.saveCollectionsToLS(collectionStateCopy);

        set(() => ({ collections: collectionStateCopy }));
      },
      createCollectionItem: async ({ id, itemEntry }) => {
        const { collections } = get();
        const collectionStateCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
        const selectedCollection = collectionStateCopy.find((col) => col.id === id);

        if (!selectedCollection) return;

        const createdItem = ItemZ.parse(todoService.createItemEntry(itemEntry));

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
      removeTodoItem: async ({ id, colId }) => {
        const { collections } = get();
        const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
        const selectedCollection = collectionsCopy.find((col) => col.id === colId);

        const removedItemIndex = collectionsCopy
          .map((col) => col.todos)
          .flat()
          .findIndex((item) => item.id === id);

        if (!selectedCollection) return;

        selectedCollection.todos.splice(removedItemIndex, 1);

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

        if (collection && collection.shared && !entry.shared && !entry.noShare) {
          await todoService.deleteSharedCollection(collection.id);
        }

        set((state) => {
          const stateCollection = state.collections.find((col) => col.id === entry.id);

          if (stateCollection) {
            Object.assign(stateCollection, entry);
            todoService.saveCollectionsToLS(state.collections);
            const { id, title, color } = stateCollection;
            useSelectedStore.setState((s) => ({ ...s, id, title, color, type: entry.type }));
          }
        });
      },
      toggleHelp: () => set((state) => ({ help: !state.help })),
    },
  })),
);

export default useTodoStore;
