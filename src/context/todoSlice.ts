import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TCollection, TNewCollectionEntry } from '../types';
import { createCollectionEntry, saveCollectionsToLS } from '../services/todo';

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
  },
});

export const { initTodos, createCollection, deleteCollection } =
  todoSlice.actions;

export default todoSlice.reducer;
