import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  TCollection,
  TItemEntry,
  TNewCollectionEntry,
  TSelectedEntry,
} from '../types';
import {
  createCollectionEntry,
  createItemEntry,
  saveCollectionsToLS,
} from '../services/todo';

const initialState: TCollection[] | [] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodos: (_state, action: PayloadAction<TCollection[] | []>) => {
      if (action.payload.length === 0) {
        const createdEntry = [
          createCollectionEntry({
            title: 'First Collection',
            color: '#7c9473',
          }),
        ];

        saveCollectionsToLS(createdEntry);

        return createdEntry;
      }

      return [...action.payload];
    },
    createCollection: (state, action: PayloadAction<TNewCollectionEntry>) => {
      const createdEntry = createCollectionEntry(action.payload);

      saveCollectionsToLS([createdEntry, ...state]);

      return [createdEntry, ...state];
    },
    deleteCollection: (state, action: PayloadAction<{ id: string }>) => {
      const filteredCollectionList = state.filter(
        (collection) => collection.id !== action.payload.id,
      );

      saveCollectionsToLS([...filteredCollectionList]);

      return [...filteredCollectionList];
    },
    createItem: (
      state,
      action: PayloadAction<{ id: string; item: TItemEntry }>,
    ) => {
      const { id, item } = action.payload;

      const selectedCollection = state.find(
        (collection) => collection.id === id,
      );

      if (!selectedCollection) return state;

      const createdItem = createItemEntry(item);
      selectedCollection.todos = [createdItem, ...selectedCollection.todos];
      saveCollectionsToLS(state);

      return state;
    },
    toggleItemDone: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const toggleItem = state
        .map((collection) => collection.todos)
        .flat()
        .find((item) => item.id === id);

      if (!toggleItem) return state;

      toggleItem.done = !toggleItem.done;
      saveCollectionsToLS(state);

      return state;
    },
    editCollection: (state, action: PayloadAction<TSelectedEntry>) => {
      const { id, title, color } = action.payload;

      const collection = state.find((collection) => collection.id === id);

      if (collection) {
        collection.title = title;
        collection.color = color;

        saveCollectionsToLS(state);
      }

      return state;
    },
  },
});

export const {
  initTodos,
  createCollection,
  deleteCollection,
  createItem,
  toggleItemDone,
  editCollection,
} = todoSlice.actions;

export default todoSlice.reducer;
