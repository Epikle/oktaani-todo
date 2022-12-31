import type { SettingsLS } from '../types';
import { isStorageAvailable, isValidSettings } from '../utils/utils';

const LS_NAME = 'oktaani-todo-settings';
const isLSAvailable = isStorageAvailable();

export const getSettingsFromLS = () => {
  if (!isLSAvailable) return null;
  const settings = localStorage.getItem(LS_NAME);
  if (!settings) return null;
  try {
    const parsedSettings = JSON.parse(settings) as unknown;
    if (!isValidSettings(parsedSettings)) {
      throw new Error('localStorage data is not valid, using default values!');
    }
    return parsedSettings;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  if (!isLSAvailable) return;
  localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
