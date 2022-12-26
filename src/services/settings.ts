import { SettingsLS } from '../types';
import { isStorageAvailable, validateSettings } from '../utils/utils';

const LS_NAME = 'oktaani-todo-settings';

export const getSettingsFromLS = () => {
  if (!isStorageAvailable()) return null;
  const settings = localStorage.getItem(LS_NAME);
  if (!settings) return null;
  try {
    const parsedSettings = JSON.parse(settings);
    const validatedSettings = validateSettings(parsedSettings);
    return validatedSettings;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
