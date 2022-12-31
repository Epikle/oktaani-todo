import type { Languages } from '../types';
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

export const isValidSettings = (settings: unknown) => {
  return (
    settings !== null &&
    typeof settings === 'object' &&
    'languageName' in settings &&
    'darkMode' in settings &&
    isLanguage(settings.languageName) &&
    isBoolean(settings.darkMode)
  );
};

const isLanguage = (val: unknown) => {
  return val !== null && typeof val === 'string' && val in languages;
};

const isBoolean = (val: unknown) => {
  return typeof val === 'boolean';
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
