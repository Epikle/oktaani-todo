import type { Languages } from './languages';

export const formatDate = (date: string, locale: Languages, options?: Intl.DateTimeFormatOptions): string | null => {
  const dateObj = new Date(date);

  if (!date || !(dateObj instanceof Date)) return null;

  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  });
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
      (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      localStorage &&
      localStorage.length !== 0
    );
  }
};

export const copyToClipboard = async (id: string) => {
  try {
    await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}?share=${id}`);
    return true;
  } catch (error) {
    return false;
  }
};
