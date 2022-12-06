import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState = {
  language: 'en-us',
  darkMode: isDarkMode,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<typeof initialState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
