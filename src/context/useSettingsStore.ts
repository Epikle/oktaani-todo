import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { z } from 'zod';

import { saveSettingsToLS } from '../services/settings';
import { allowedLanguages } from '../utils/languages';

const SettingsZ = z.object({
  languageName: z.enum(allowedLanguages).default('en-us'),
  darkMode: z.boolean().default(false),
  sort: z.boolean().default(false),
  help: z.boolean().default(false),
});

type SettingsState = z.infer<typeof SettingsZ>;
export type SettingsLS = Omit<SettingsState, 'sort'>;
export type SettingsSlice = SettingsState & {
  actions: {
    setSettings: (settings: unknown) => void;
    toggleSort: () => void;
    toggleHelp: () => void;
  };
};

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const useSettingsStore = create<SettingsSlice>()(
  immer((set) => ({
    languageName: 'en-us',
    darkMode: isDarkMode,
    sort: false,
    help: false,
    actions: {
      setSettings: (settings) =>
        set((state) => {
          try {
            const validatedSettings = SettingsZ.omit({ sort: true }).parse(settings);
            saveSettingsToLS(validatedSettings);
            return { ...state, ...validatedSettings };
          } catch (error) {
            // saveSettingsToLS();
            return state;
          }
        }),
      toggleSort: () =>
        set((state) => {
          state.sort = !state.sort;
        }),
      toggleHelp: () =>
        set((state) => {
          state.help = !state.help;
        }),
    },
  })),
);

export default useSettingsStore;
