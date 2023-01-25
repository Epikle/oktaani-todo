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

export const isLanguage = (value: unknown) => {
  return value !== null && typeof value === 'string' && value in languages;
};

const isBoolean = (value: unknown) => {
  return typeof value === 'boolean';
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
