import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Languages, Settings, SettingsLS, Texts } from '../types';
import { languages } from '../utils/languages';
import { saveSettingsToLS } from '../services/settings';

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: Settings = {
  availableLanguages: Object.keys(languages) as Languages[], //ISO639-1
  languageName: 'en-us',
  language: languages['en-us'],
  darkMode: isDarkMode,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initSettings: (state, action: PayloadAction<SettingsLS | null>) => {
      if (!action.payload) {
        saveSettingsToLS({
          languageName: state.languageName,
          darkMode: state.darkMode,
        });
        return state;
      }

      const languagesList = Object.keys(languages) as Languages[];
      const currentLanguageIndex = languagesList.indexOf(
        action.payload.languageName,
      );
      const selectedLanguage = languages[languagesList[currentLanguageIndex]];

      return { ...state, ...action.payload, language: selectedLanguage };
    },
    setSettings: (state, action: PayloadAction<SettingsLS>) => {
      saveSettingsToLS(action.payload);
      return { ...state, ...action.payload };
    },
    setLanguage: (state, action: PayloadAction<Texts>) => {
      return { ...state, language: action.payload };
    },
  },
});

export const { initSettings, setSettings, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
