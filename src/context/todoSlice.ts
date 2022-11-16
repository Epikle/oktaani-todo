import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TCollection } from '../types';

const initialState: TCollection[] | [] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodos: (state, action: PayloadAction<TCollection[] | []>) => {
      return [...action.payload];
    },
  },
});

export const { initTodos } = todoSlice.actions;

export default todoSlice.reducer;
