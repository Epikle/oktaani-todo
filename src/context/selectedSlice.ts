import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TSelectedEntry } from '../types';

const initialState = {
  id: '',
  title: '',
  color: '',
  edit: false,
  selected: false,
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedCollection: (state, action: PayloadAction<TSelectedEntry>) => {
      return { ...state, ...action.payload, selected: true };
    },
    setSelectedCollectionEdit: (
      state,
      action: PayloadAction<{ edit: boolean }>,
    ) => {
      return { ...state, ...action.payload };
    },
    resetSelection: () => initialState,
  },
});

export const {
  setSelectedCollection,
  setSelectedCollectionEdit,
  resetSelection,
} = selectedSlice.actions;

export default selectedSlice.reducer;
