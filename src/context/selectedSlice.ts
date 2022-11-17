import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TSelectedEntry } from '../types';

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
    resetSelection: () => initialState,
  },
});

export const { setSelectedCollection, resetSelection } = selectedSlice.actions;

export default selectedSlice.reducer;
