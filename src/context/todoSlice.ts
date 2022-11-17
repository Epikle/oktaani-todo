import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TCollection, TNewCollectionEntry } from '../types';
import { createCollectionEntry } from '../services/todo';

const initialState: TCollection[] | [] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodos: (_state, action: PayloadAction<TCollection[] | []>) => {
      return [...action.payload];
    },
    createCollection: (state, action: PayloadAction<TNewCollectionEntry>) => {
      const createdEntry = createCollectionEntry(action.payload);
      return [createdEntry, ...state];
    },
  },
});

export const { initTodos, createCollection } = todoSlice.actions;

export default todoSlice.reducer;
