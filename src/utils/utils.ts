import { Languages } from '../types';

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
