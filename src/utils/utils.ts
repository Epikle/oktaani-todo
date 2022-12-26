import { Languages, SettingsLS } from '../types';
import { languages } from './languages';

export const formatDate = (
  date: string,
  locale: Languages,
  options?: Intl.DateTimeFormatOptions,
): string | null => {
  const dateObj = new Date(date);

  if (!date || !(dateObj instanceof Date)) {
    return null;
  }

  return dateObj.toLocaleDateString(locale, options);
};

export const validateSettings = (
  settings: Record<string, unknown>,
): SettingsLS => {
  const settingsEntry: SettingsLS = {
    languageName: isLanguage(settings.languageName),
    darkMode: isBoolean(settings.darkMode),
  };

  return settingsEntry;
};

const isLanguage = (val: unknown): Languages => {
  if (!Object.hasOwn(languages, val as string)) {
    throw new Error('Not language');
  }

  return val as Languages;
};

const isBoolean = (val: unknown): boolean => {
  if (typeof val !== 'boolean') throw new Error('Not boolean');
  return val;
};

export const isStorageAvailable = () => {
  try {
    const x = '__storage_test__';
    localStorage.setItem(x, x);
    localStorage.removeItem(x);

    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      localStorage &&
      localStorage.length !== 0
    );
  }
};
