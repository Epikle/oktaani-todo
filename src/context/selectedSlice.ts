import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TSelectedEntry } from '../types';

const initialState = {
  id: '',
  title: '',
  color: '',
  edit: false,
  shared: false,
  selected: false,
  hasDone: false,
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedCollection: (state, action: PayloadAction<TSelectedEntry>) => ({
      ...state,
      ...action.payload,
      selected: true,
    }),
    setSelectedCollectionEdit: (
      state,
      action: PayloadAction<{ edit: boolean }>,
    ) => ({ ...state, ...action.payload }),
    setHasDone: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasDone: action.payload,
    }),
    resetSelection: () => initialState,
  },
});

export const {
  setSelectedCollection,
  setSelectedCollectionEdit,
  resetSelection,
  setHasDone,
} = selectedSlice.actions;

export default selectedSlice.reducer;
