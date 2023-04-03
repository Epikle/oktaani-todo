import { create } from 'zustand';

import languages from '../utils/languages';
import { saveSettingsToLS } from '../services/settings';
import type { Languages } from '../types';

type SettingsState = typeof initialSettingsState;
type SettingsActions = {
  setSettings: (settings: SettingsLS | null) => void;
  sortCollections: () => void;
};
export type SettingsLS = Omit<SettingsState, 'availableLanguages' | 'sort'>;

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const availableLanguages = Object.keys(languages) as Languages[]; // ISO639-1

const initialSettingsState = {
  availableLanguages,
  languageName: availableLanguages[0],
  darkMode: isDarkMode,
  sort: false,
};

const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
  ...initialSettingsState,
  setSettings: (settings) =>
    set((state) => {
      if (!settings) {
        const { languageName, darkMode } = state;
        saveSettingsToLS({ languageName, darkMode });
        return state;
      }

      saveSettingsToLS(settings);
      return { ...state, ...settings };
    }),
  sortCollections: () => set((state) => ({ ...state, sort: !state.sort })),
}));

export default useSettingsStore;
