import { create } from 'zustand';
import { z } from 'zod';

import { saveSettingsToLS } from '../services/settings';
import { allowedLanguages } from '../utils/languages';

const SettingsZ = z.object({
  languageName: z.enum(allowedLanguages),
  darkMode: z.boolean(),
  sort: z.boolean(),
});

type SettingsState = z.infer<typeof SettingsZ>;
export type SettingsLS = Omit<SettingsState, 'sort'>;
export type SettingsSlice = SettingsState & {
  actions: {
    setSettings: (settings: unknown) => void;
    sortCollections: () => void;
  };
};

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const useSettingsStore = create<SettingsSlice>((set) => ({
  languageName: 'en-us',
  darkMode: isDarkMode,
  sort: false,
  actions: {
    setSettings: (settings) =>
      set((state) => {
        try {
          const validatedSettings = SettingsZ.omit({ sort: true }).parse(settings);
          saveSettingsToLS(validatedSettings);
          return { ...state, ...validatedSettings };
        } catch (error) {
          const { languageName, darkMode } = state;
          saveSettingsToLS({ languageName, darkMode });
          return state;
        }
      }),
    sortCollections: () => set((state) => ({ ...state, sort: !state.sort })),
  },
}));

export default useSettingsStore;
