import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Settings, settingsSchema } from '../utils/types';
import { saveToLocalStorage } from '../services/todo';
import env from '../utils/env';

export type SettingsSlice = Settings & {
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
      setSettings: (settings) => {
        try {
          const validatedSettings = settingsSchema.omit({ sort: true, help: true }).parse(settings);
          saveToLocalStorage<Pick<Settings, 'languageName' | 'darkMode'>>(env.LS_NAME_SETTINGS, validatedSettings);
          set({ ...validatedSettings });
        } catch (error) {
          // TODO: Error toast
        }
      },
      toggleSort: () => set((state) => ({ sort: !state.sort })),
      toggleHelp: () => set((state) => ({ help: !state.help })),
    },
  })),
);

export default useSettingsStore;
