import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import * as todoService from '../services/todo';
import { Collection, CollectionEntry, Item, ItemEntry, Note, arrayOfCollectionsSchema } from '../utils/types';
import env from '../utils/env';

export type TodoSlice = {
  collections: Collection[] | null;
  items: Item[] | null;
  notes: Note[] | null;
  actions: {
    initCollections: () => void;
    createCollection: (entry: CollectionEntry) => void;
    updateCollection: (entry: Partial<Collection> & { id: string }) => void;
    createItem: (entry: ItemEntry) => void;
    toggleItemStatus: (id: string) => void;
    changeOrder: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void;
    // deleteCollection: ({ id, shared }: { id: string; shared: boolean }) => Promise<void>;
    // toggleItemDone: ({ id, colId }: { id: string; colId: string }) => Promise<void>;
    // removeDoneItems: (id: string) => Promise<void>;
    // removeTodoItem: ({ id, colId }: { id: string; colId: string }) => Promise<void>;
    // editCollection: (entry: Partial<SelectedEntry> & { noShare?: boolean }) => Promise<void>;
  };
};

const useTodoStore = create<TodoSlice>()(
  immer((set) => ({
    collections: null,
    items: null,
    notes: null,
    actions: {
      initCollections: () => {
        try {
          const collections = todoService.getFromLocalStorage<Collection[]>(
            env.LS_NAME_COLLECTIONS,
            arrayOfCollectionsSchema,
          );
          set({ collections });
        } catch (error) {
          // TODO: Error toast
        }
      },
      createCollection: (entry) => {
        try {
          const collectionEntry = todoService.createCollectionEntry(entry);
          set((state) => {
            const newCollections = state.collections ? [collectionEntry, ...state.collections] : [collectionEntry];
            state.collections = newCollections;
            todoService.saveToLocalStorage<Collection[]>(env.LS_NAME_COLLECTIONS, newCollections);
          });
        } catch (error) {
          // TODO: Error toast
        }
      },
      updateCollection: (entry) => {
        set((state) => {
          const collection = state.collections?.find((c) => c.id === entry.id);
          if (state.collections && collection) {
            Object.assign(collection, entry);
            todoService.saveToLocalStorage<Collection[]>(env.LS_NAME_COLLECTIONS, state.collections);
          }
        });
      },
      createItem: (entry) => {
        try {
          const validItem = todoService.createItemEntry(entry);
          set((state) => {
            const newItems = state.items ? state.items.concat(validItem) : [validItem];
            state.items = newItems;
            todoService.saveToLocalStorage<Item[]>(env.LS_NAME_ITEMS, newItems);
          });
        } catch (error) {
          // TODO: Error toast
        }
      },
      toggleItemStatus: (id) => {
        set((state) => {
          const item = state.items?.find((i) => i.id === id);
          if (item) {
            item.status = !item.status;
          }
        });
      },

      changeOrder: ({ dragIndex, hoverIndex }) =>
        set((state) => {
          if (!state.collections) return;
          const movingCollection = state.collections[dragIndex];
          state.collections.splice(dragIndex, 1);
          state.collections.splice(hoverIndex, 0, movingCollection);
          todoService.saveToLocalStorage<Collection[]>(env.LS_NAME_COLLECTIONS, state.collections);
        }),
      // deleteCollection: async ({ id, shared }) => {
      //   if (shared) await todoService.deleteSharedCollection(id);
      //   set((state) => {
      //     const filteredCollectionList = state.collections.filter((col) => col.id !== id);
      //     todoService.saveCollectionsToLS([...filteredCollectionList]);

      //     return { collections: [...filteredCollectionList] };
      //   });
      // },
      // toggleItemDone: async ({ id, colId }) => {
      //   const { collections } = get();
      //   const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      //   const selectedCollection = collectionsCopy.find((col) => col.id === colId);
      //   if (!collectionsCopy) return;
      //   const toggleItem = collectionsCopy
      //     .map((col) => col.todos)
      //     .flat()
      //     .find((item) => item.id === id);

      //   if (!toggleItem || !selectedCollection) return;

      //   toggleItem.done = !toggleItem.done;

      //   if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      //   set(() => {
      //     todoService.saveCollectionsToLS(collectionsCopy);
      //     return { collections: collectionsCopy };
      //   });
      // },
      // removeDoneItems: async (id) => {
      //   const { collections } = get();
      //   const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      //   const selectedCollection = collectionsCopy.find((col) => col.id === id);

      //   if (!selectedCollection) return;

      //   selectedCollection.todos = [...selectedCollection.todos.filter((item) => !item.done)];
      //   if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      //   set(() => {
      //     todoService.saveCollectionsToLS(collectionsCopy);
      //     return { collections: collectionsCopy };
      //   });
      // },
      // removeTodoItem: async ({ id, colId }) => {
      //   const { collections } = get();
      //   const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      //   const selectedCollection = collectionsCopy.find((col) => col.id === colId);

      //   if (!selectedCollection) return;

      //   const removedItemIndex = selectedCollection.todos.findIndex((item) => item.id === id);

      //   selectedCollection.todos.splice(removedItemIndex, 1);

      //   if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      //   set(() => {
      //     todoService.saveCollectionsToLS(collectionsCopy);
      //     return { collections: collectionsCopy };
      //   });
      // },
      // editTodoItemPriority: async ({ id, colId, newPriority }) => {
      //   const { collections } = get();
      //   const collectionsCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
      //   const selectedCollection = collectionsCopy.find((col) => col.id === colId);
      //   if (!collectionsCopy) return;
      //   const itemPriority = collectionsCopy
      //     .map((col) => col.todos)
      //     .flat()
      //     .find((item) => item.id === id);

      //   if (!itemPriority || !selectedCollection) return;

      //   itemPriority.priority = newPriority;

      //   if (selectedCollection.shared) await todoService.updateSharedCollection(selectedCollection);

      //   set(() => {
      //     todoService.saveCollectionsToLS(collectionsCopy);
      //     return { collections: collectionsCopy };
      //   });
      // },
      // editCollection: async (entry) => {
      //   const { collections } = get();
      //   const collection = collections.find((col) => col.id === entry.id);

      //   if (collection && entry.shared) {
      //     const newCollection = { ...collection, ...entry };
      //     await todoService.updateSharedCollection(newCollection);
      //   }

      //   if (collection && collection.shared && !entry.shared && !entry.noShare) {
      //     await todoService.deleteSharedCollection(collection.id);
      //   }

      //   set((state) => {
      //     const stateCollection = state.collections.find((col) => col.id === entry.id);

      //     if (stateCollection) {
      //       Object.assign(stateCollection, entry);
      //       todoService.saveCollectionsToLS(state.collections);
      //       const { id, title, color } = stateCollection;
      //       useSelectedStore.setState((s) => ({ ...s, id, title, color, type: entry.type }));
      //     }
      //   });
      // },
    },
  })),
);

export default useTodoStore;

// createSharedCollection: async (shareId) => {
//   const collection = await todoService.getSharedCollectionData(shareId);

//   set((state) => {
//     if (state.collections.some((col) => col.id === collection.id)) {
//       return { collections: state.collections };
//     }

//     todoService.saveCollectionsToLS([collection, ...state.collections]);

//     return { collections: [collection, ...state.collections] };
//   });
// },
// updateSharedCollection: async (id) => {
//   const sharedCollectionData = await todoService.getSharedCollectionData(id);
//   set((state) => {
//     const collection = state.collections.find((col) => col.id === id);
//     if (collection) {
//       Object.assign(collection, sharedCollectionData);
//       todoService.saveCollectionsToLS(state.collections);
//     }
//   });
// },
// editNote: async ({ id, note }) => {
//   const { collections } = get();
//   const collectionStateCopy = JSON.parse(JSON.stringify(collections)) as TodoState['collections'];
//   const selectedCollection = collectionStateCopy.find((col) => col.id === id);

//   if (!selectedCollection) return;

//   selectedCollection.note = note;

//   if (selectedCollection && selectedCollection.shared) {
//     await todoService.updateSharedCollection(selectedCollection);
//   }

//   todoService.saveCollectionsToLS(collectionStateCopy);

//   set(() => ({ collections: collectionStateCopy }));
// },
