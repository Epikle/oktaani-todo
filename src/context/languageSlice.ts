import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { languages } from '../utils/languages';
import { Texts } from '../types';

const initialState = languages['en-us'];

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    getLanguage: (state) => state,
    setLanguage: (_state, action: PayloadAction<Texts>) => {
      return action.payload;
    },
  },
});

export const { getLanguage, setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
