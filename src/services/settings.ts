import type { SettingsLS } from '../types';
import { isValidSettings } from '../utils/utils';

const LS_NAME = 'oktaani-todo-settings';

export const getSettingsFromLS = () => {
  const settings = localStorage.getItem(LS_NAME);
  if (!settings) return null;
  try {
    const parsedSettings = JSON.parse(settings) as unknown;
    if (!isValidSettings(parsedSettings)) {
      throw new Error('localStorage data is not valid, using default values!');
    }
    return parsedSettings as SettingsLS;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
