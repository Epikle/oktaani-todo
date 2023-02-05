import type { Languages } from '../types';
import languages from './languages';

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

const isBoolean = (value: unknown) => typeof value === 'boolean';

export const isValidCollections = (collections: unknown) => {
  if (!collections || !Array.isArray(collections)) return false;

  return collections.every(
    (collection) =>
      typeof collection === 'object' &&
      'color' in collection &&
      'created' in collection &&
      'id' in collection &&
      'shared' in collection &&
      'title' in collection &&
      'todos' in collection &&
      isBoolean(collection.shared) &&
      typeof collection.color === 'string' &&
      typeof collection.created === 'string' &&
      typeof collection.id === 'string' &&
      typeof collection.title === 'string' &&
      typeof collection.todos === 'object',
  );
};

export const isLanguage = (value: unknown) =>
  value !== null && typeof value === 'string' && value in languages;

export const isValidSettings = (settings: unknown) =>
  settings !== null &&
  typeof settings === 'object' &&
  'languageName' in settings &&
  'darkMode' in settings &&
  isLanguage(settings.languageName) &&
  isBoolean(settings.darkMode);

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
