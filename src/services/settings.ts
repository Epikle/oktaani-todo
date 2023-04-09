import type { SettingsLS } from '../context/createSettingsSlice';

const LS_NAME = import.meta.env.VITE_LS_NAME_SETTINGS;

export const getSettingsFromLS = () => {
  const settings = localStorage.getItem(LS_NAME);
  return JSON.parse(settings || '{}') as unknown;
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
