import type { SettingsLS } from '../context/useSettingsStore';

const LS_NAME = import.meta.env.VITE_LS_NAME_SETTINGS;

export const getSettingsFromLS = () => {
  const settings = localStorage.getItem(LS_NAME);
  if (!settings) return null;

  // TODO: VALIDATE
  return JSON.parse(settings) as SettingsLS;
};

export const saveSettingsToLS = (settings: SettingsLS) => {
  localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
