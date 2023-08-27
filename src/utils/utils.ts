import { type ClassValue, clsx } from 'clsx';
import env from './env';
import type { Languages } from './languages';

export const formatDate = (
  date: string | Date,
  locale: Languages,
  options?: Intl.DateTimeFormatOptions,
): string | null => {
  const dateObj = new Date(date);

  if (!date || Number.isNaN(dateObj.getTime())) return null;

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  };

  return dateObj.toLocaleString(locale, formatOptions);
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
    await navigator.clipboard.writeText(`${env.BASE_URL}?share=${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

// export const testDelay = async (promise) => {
//   await new Promise((resolve) => {
//     setTimeout(resolve, 2000);
//   });
//   return promise();
// };
