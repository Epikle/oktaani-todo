import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import * as todoService from '../services/todo';
import {
  Collection,
  CollectionEntry,
  Item,
  ItemEntry,
  ItemPriority,
  Note,
  NoteEntry,
  arrayOfCollectionsSchema,
  arrayOfItemsSchema,
  arrayOfNotesSchema,
} from '../utils/types';
import env from '../utils/env';
import useStatusStore from './useStatusStore';

export type TodoSlice = {
  collections: Collection[] | null;
  items: Item[] | null;
  notes: Note[] | null;
  actions: {
    initCollections: () => void;
    createCollection: (entry: CollectionEntry) => void;
    updateCollection: (entry: Partial<Collection> & { id: string }) => void;
    deleteCollection: (id: string) => void;
    initItems: () => void;
    createItem: (entry: ItemEntry) => void;
    toggleItemStatus: (id: string) => void;
    updateItemPriority: ({ id, priorityEntry }: { id: string; priorityEntry: ItemPriority }) => void;
    deleteItem: (id: string) => void;
    deleteDoneItems: (id: string) => void;
    initNotes: () => void;
    updateNote: (entry: NoteEntry) => void;
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
          const collections = todoService.getFromLocalStorage<Collection[]>(
            env.LS_NAME_COLLECTIONS,
            arrayOfCollectionsSchema,
          );
          set({ collections });
        } catch (error) {
          set({ collections: null });
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
          useStatusStore.setState({ errorMessage: 'Collection creation failed. Please try again.', isError: true });
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

      deleteCollection: (id) => {
        set((state) => {
          const filteredCollections = state.collections?.filter((c) => c.id !== id);
          const newCollections = filteredCollections && filteredCollections?.length > 0 ? filteredCollections : null;
          const filteredItems = state.items?.filter((i) => i.colId !== id);
          const newItems = filteredItems && filteredItems?.length > 0 ? filteredItems : null;
          const filteredNotes = state.notes?.filter((i) => i.colId !== id);
          const newNotes = filteredNotes && filteredNotes?.length > 0 ? filteredNotes : null;

          todoService.saveToLocalStorage<Collection[] | null>(env.LS_NAME_COLLECTIONS, newCollections);
          todoService.saveToLocalStorage<Item[] | null>(env.LS_NAME_ITEMS, newItems);
          todoService.saveToLocalStorage<Note[] | null>(env.LS_NAME_NOTES, newNotes);

          return { collections: newCollections, items: newItems, notes: newNotes };
        });
      },

      initItems: () => {
        try {
          const items = todoService.getFromLocalStorage<Item[]>(env.LS_NAME_ITEMS, arrayOfItemsSchema);
          set({ items });
        } catch (error) {
          set({ items: null });
        }
      },

      createItem: (entry) => {
        try {
          const validItem = todoService.createItemEntry(entry);
          set((state) => {
            const newItems = state.items ? [validItem, ...state.items] : [validItem];
            state.items = newItems;
            todoService.saveToLocalStorage<Item[]>(env.LS_NAME_ITEMS, newItems);
          });
        } catch (error) {
          useStatusStore.setState({ errorMessage: 'Item creation failed. Please try again.', isError: true });
        }
      },

      toggleItemStatus: (id) => {
        set((state) => {
          const item = state.items?.find((i) => i.id === id);
          if (item && state.items) {
            item.status = !item.status;
            todoService.saveToLocalStorage<Item[]>(env.LS_NAME_ITEMS, state.items);
          }
        });
      },

      updateItemPriority: ({ id, priorityEntry }) => {
        set((state) => {
          const item = state.items?.find((i) => i.id === id);
          if (item && state.items) {
            item.priority = priorityEntry;
            todoService.saveToLocalStorage<Item[]>(env.LS_NAME_ITEMS, state.items);
          }
        });
      },

      deleteItem: (id) =>
        set((state) => {
          const filteredItems = state.items?.filter((i) => i.id !== id);
          if (filteredItems) {
            const newItems = filteredItems && filteredItems?.length > 0 ? filteredItems : null;
            todoService.saveToLocalStorage<Item[] | null>(env.LS_NAME_ITEMS, newItems);
            return { items: newItems };
          }
          return state;
        }),

      deleteDoneItems: (id) =>
        set((state) => {
          const filteredItems = state.items?.filter((i) => i.colId !== id || !i.status);
          if (filteredItems) {
            const newItems = filteredItems && filteredItems?.length > 0 ? filteredItems : null;
            todoService.saveToLocalStorage<Item[] | null>(env.LS_NAME_ITEMS, newItems);
            return { items: newItems };
          }
          return state;
        }),

      initNotes: () => {
        try {
          const notes = todoService.getFromLocalStorage<Note[]>(env.LS_NAME_NOTES, arrayOfNotesSchema);
          set({ notes });
        } catch (error) {
          set({ notes: null });
        }
      },

      updateNote: (entry) => {
        set((state) => {
          const note = state.notes?.find((n) => n.colId === entry.colId);

          try {
            if (!note || !state.notes) {
              const validNote = todoService.createNoteEntry(entry);
              const newNotes = state.notes ? state.notes.concat(validNote) : [validNote];
              todoService.saveToLocalStorage<Note[]>(env.LS_NAME_NOTES, newNotes);
              state.notes = newNotes;
            } else {
              note.message = entry.message;
              todoService.saveToLocalStorage<Note[]>(env.LS_NAME_NOTES, state.notes);
            }
          } catch (error) {
            useStatusStore.setState({ errorMessage: 'Updating the note failed. Please try again.', isError: true });
          }
        });
      },

      changeOrder: ({ dragIdx, hoverIdx }) =>
        set((state) => {
          if (!state.collections) return;
          const movingCollection = state.collections[dragIdx];
          state.collections.splice(dragIdx, 1);
          state.collections.splice(hoverIdx, 0, movingCollection);
          todoService.saveToLocalStorage<Collection[]>(env.LS_NAME_COLLECTIONS, state.collections);
        }),
    },
  })),
);

export default useTodoStore;
