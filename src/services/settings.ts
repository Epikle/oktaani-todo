import type { SettingsLS } from '../context/useSettingsStore';
import env from '../utils/env';

export const getSettingsFromLS = () => {
  const settings = localStorage.getItem(env.LS_NAME_SETTINGS);
  return JSON.parse(settings || '{}') as unknown;
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  localStorage.setItem(env.LS_NAME_SETTINGS, JSON.stringify(settings));
};
