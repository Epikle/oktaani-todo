import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Languages, Settings } from '../types';
import { languages } from '../utils/languages';

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: Settings = {
  availableLanguages: Object.keys(languages) as Languages[], //ISO639-1
  language: 'en-us',
  darkMode: isDarkMode,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state,
      action: PayloadAction<Omit<Settings, 'availableLanguages'>>,
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
