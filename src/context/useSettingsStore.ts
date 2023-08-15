import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Settings, settingsSchema } from '../utils/types';
import { getFromLocalStorage, saveToLocalStorage } from '../services/todo';
import useStatusStore from './useStatusStore';
import env from '../utils/env';

export type SettingsSlice = Settings & {
  actions: {
    initSettings: () => void;
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
      initSettings: () => {
        try {
          const validatedSettings = getFromLocalStorage<Omit<Settings, 'sort' | 'help'>>(
            env.LS_NAME_SETTINGS,
            settingsSchema.omit({ sort: true, help: true }),
          );
          set({ ...validatedSettings });
        } catch (error) {
          set({ darkMode: isDarkMode, languageName: 'en-us' });
        }
      },
      setSettings: (settings) => {
        try {
          const validatedSettings = settingsSchema.omit({ sort: true, help: true }).parse(settings);
          saveToLocalStorage<Pick<Settings, 'languageName' | 'darkMode'>>(env.LS_NAME_SETTINGS, validatedSettings);
          set({ ...validatedSettings });
        } catch (error) {
          useStatusStore.setState({ errorMessage: 'Failed to update settings. Please try again.', isError: true });
        }
      },
      toggleSort: () => set((state) => ({ sort: !state.sort })),
      toggleHelp: () => set((state) => ({ help: !state.help })),
    },
  })),
);

export default useSettingsStore;
