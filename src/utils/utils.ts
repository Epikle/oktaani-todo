export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions,
): string | null => {
  const dateObj = new Date(date);

  if (!date || !(dateObj instanceof Date)) {
    return null;
  }

  return dateObj.toLocaleDateString(undefined, options);
};
