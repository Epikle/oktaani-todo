import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import * as todoService from '../services/todo';
import * as types from '../utils/types';
import env from '../utils/env';
import useStatusStore from './useStatusStore';
import { createStatsByType } from '../services/stats';

export type TodoSlice = {
  collections: types.Collection[] | null;
  items: types.Item[] | null;
  notes: types.Note[] | null;
  actions: {
    initCollections: () => void;
    initSharedCollection: (entry: types.SharedCollectionData) => void;
    createCollection: (entry: types.CollectionEntry) => void;
    updateCollection: (entry: Partial<types.Collection> & { id: string }) => void;
    deleteCollection: (id: string) => void;
    initItems: () => void;
    createItem: (entry: types.ItemEntry) => types.Item | null;
    updateItem: (entry: Partial<types.Item> & { id: string }) => void;
    updateItems: ({ id, entries }: { id: string; entries: types.Item[] | null }) => void;
    deleteItem: (id: string) => void;
    deleteDoneItems: (id: string) => void;
    initNotes: () => void;
    updateNote: (entry: types.NoteEntry) => void;
    changeOrder: ({ dragIdx, hoverIdx }: { dragIdx: number; hoverIdx: number }) => void;
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
          const collections = todoService.getFromLocalStorage<types.Collection[]>(
            env.LS_NAME_COLLECTIONS,
            types.arrayOfCollectionsSchema,
          );
          set({ collections });
        } catch (error) {
          useStatusStore.setState({
            errorMessage: 'Unable to retrieve collection data.',
            isError: true,
          });
        }
      },

      initSharedCollection: (entry) => {
        try {
          const { col: collection, items, note } = types.sharedCollectionDataSchema.parse(entry);
          set((state) => {
            if (state.collections?.some((c) => c.id === collection.id)) {
              return;
            }
            const newCollections = state.collections ? [collection, ...state.collections] : [collection];
            state.collections = newCollections;
            todoService.saveToLocalStorage<types.Collection[]>(env.LS_NAME_COLLECTIONS, newCollections);

            if (items) {
              const newItems = state.items ? [...items, ...state.items] : items;
              state.items = newItems;
              todoService.saveToLocalStorage<types.Item[]>(env.LS_NAME_ITEMS, newItems);
            }

            if (note) {
              const newNotes = state.notes ? state.notes.concat(note) : [note];
              state.notes = newNotes;
              todoService.saveToLocalStorage<types.Note[]>(env.LS_NAME_NOTES, newNotes);
            }
          });
        } catch (error) {
          useStatusStore.setState({
            errorMessage: 'Shared collection creation failed. Please try again.',
            isError: true,
          });
        }
      },

      createCollection: (entry) => {
        try {
          const collectionEntry = todoService.createCollectionEntry(entry);
          set((state) => {
            const newCollections = state.collections ? [collectionEntry, ...state.collections] : [collectionEntry];
            state.collections = newCollections;
            todoService.saveToLocalStorage<types.Collection[]>(env.LS_NAME_COLLECTIONS, newCollections);
          });
          createStatsByType('newCollection');
        } catch (error) {
          useStatusStore.setState({ errorMessage: 'Collection creation failed. Please try again.', isError: true });
        }
      },

      updateCollection: async (entry) =>
        set((state) => {
          const collection = state.collections?.find((c) => c.id === entry.id);
          if (state.collections && collection) {
            Object.assign(collection, entry);
            todoService.saveToLocalStorage<types.Collection[]>(env.LS_NAME_COLLECTIONS, state.collections);
          }
        }),

      deleteCollection: (id) =>
        set((state) => {
          const filteredCollections = state.collections?.filter((c) => c.id !== id);
          const newCollections = filteredCollections?.length ? filteredCollections : null;
          const filteredItems = state.items?.filter((i) => i.colId !== id);
          const newItems = filteredItems?.length ? filteredItems : null;
          const filteredNotes = state.notes?.filter((i) => i.colId !== id);
          const newNotes = filteredNotes?.length ? filteredNotes : null;

          todoService.saveToLocalStorage<types.Collection[] | null>(env.LS_NAME_COLLECTIONS, newCollections);
          todoService.saveToLocalStorage<types.Item[] | null>(env.LS_NAME_ITEMS, newItems);
          todoService.saveToLocalStorage<types.Note[] | null>(env.LS_NAME_NOTES, newNotes);

          createStatsByType('deleteCollection');

          return { collections: newCollections, items: newItems, notes: newNotes };
        }),

      initItems: () => {
        try {
          const items = todoService.getFromLocalStorage<types.Item[]>(env.LS_NAME_ITEMS, types.arrayOfItemsSchema);
          set({ items });
        } catch (error) {
          useStatusStore.setState({
            errorMessage: 'Unable to retrieve collection data.',
            isError: true,
          });
        }
      },

      createItem: (entry) => {
        try {
          const validItem = todoService.createItemEntry(entry);
          set((state) => {
            const newItems = state.items ? [validItem, ...state.items] : [validItem];
            state.items = newItems;
            todoService.saveToLocalStorage<types.Item[]>(env.LS_NAME_ITEMS, newItems);
          });
          createStatsByType('newItem');
          return validItem;
        } catch (error) {
          useStatusStore.setState({ errorMessage: 'Item creation failed. Please try again.', isError: true });
          return null;
        }
      },

      updateItem: (entry) =>
        set((state) => {
          const item = state.items?.find((i) => i.id === entry.id);
          if (item && state.items) {
            Object.assign(item, entry);
            todoService.saveToLocalStorage<types.Item[]>(env.LS_NAME_ITEMS, state.items);
          }
        }),

      updateItems: ({ id, entries }) =>
        set((state) => {
          const filteredItems = state.items?.filter((i) => i.colId !== id);
          const newItems = filteredItems?.length ? [...(entries || []), ...filteredItems] : entries;
          todoService.saveToLocalStorage<types.Item[] | null>(env.LS_NAME_ITEMS, newItems);
          return { items: newItems };
        }),

      deleteItem: (id) =>
        set((state) => {
          const filteredItems = state.items?.filter((i) => i.id !== id);
          if (filteredItems) {
            const newItems = filteredItems?.length ? filteredItems : null;
            todoService.saveToLocalStorage<types.Item[] | null>(env.LS_NAME_ITEMS, newItems);
            createStatsByType('deleteItem');
            return { items: newItems };
          }
          return state;
        }),

      deleteDoneItems: (id) =>
        set((state) => {
          const filteredItems = state.items?.filter((i) => i.colId !== id || !i.status);
          if (filteredItems) {
            const newItems = filteredItems?.length ? filteredItems : null;
            todoService.saveToLocalStorage<types.Item[] | null>(env.LS_NAME_ITEMS, newItems);
            return { items: newItems };
          }
          return state;
        }),

      initNotes: () => {
        try {
          const notes = todoService.getFromLocalStorage<types.Note[]>(env.LS_NAME_NOTES, types.arrayOfNotesSchema);
          set({ notes });
        } catch (error) {
          useStatusStore.setState({
            errorMessage: 'Unable to retrieve collection data.',
            isError: true,
          });
        }
      },

      updateNote: (entry) => {
        set((state) => {
          const note = state.notes?.find((n) => n.colId === entry.colId);

          try {
            if (!note || !state.notes) {
              const validNote = todoService.createNoteEntry(entry);
              const newNotes = state.notes ? state.notes.concat(validNote) : [validNote];
              state.notes = newNotes;
              todoService.saveToLocalStorage<types.Note[]>(env.LS_NAME_NOTES, newNotes);
            } else {
              note.message = entry.message;
              todoService.saveToLocalStorage<types.Note[]>(env.LS_NAME_NOTES, state.notes);
            }
          } catch (error) {
            useStatusStore.setState({ errorMessage: 'Updating the note failed. Please try again.', isError: true });
          }
        });
      },

      changeOrder: ({ dragIdx, hoverIdx }) =>
        set((state) => {
          if (state.collections) {
            const movingCollection = state.collections[dragIdx];
            state.collections.splice(dragIdx, 1);
            state.collections.splice(hoverIdx, 0, movingCollection);
            todoService.saveToLocalStorage<types.Collection[]>(env.LS_NAME_COLLECTIONS, state.collections);
          }
        }),
    },
  })),
);

export default useTodoStore;
