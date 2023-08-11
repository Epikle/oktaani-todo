import { copyToClipboard, formatDate, isStorageAvailable } from './utils';

const writeTextMock = vi.fn().mockImplementation(() => Promise.resolve());
Object.assign(navigator, {
  clipboard: {
    writeText: writeTextMock,
  },
});

describe('Utils', () => {
  it('Should copy text to clipboard', async () => {
    const result = await copyToClipboard('test-id');
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith(expect.stringContaining('test-id'));
  });

  it('Should handle clipboard write error', async () => {
    writeTextMock.mockRejectedValue('Error');
    const result = await copyToClipboard('test-id');
    expect(result).toBe(false);
    expect(writeTextMock).toHaveBeenCalledWith(expect.stringContaining('test-id'));
    writeTextMock.mockRestore();
  });

  it('Should return true if localstorage is available', () => {
    const result = isStorageAvailable();
    expect(result).toBe(true);
  });

  it('should return false when local storage is not available', () => {
    const setItemMock = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is not available');
    });
    const result = isStorageAvailable();
    expect(result).toBe(false);
    setItemMock.mockRestore();
  });

  it('should format the date correctly', () => {
    const date = '2023-08-11T12:00:00.000Z';
    const formattedDate = formatDate(date, 'en-us');
    expect(formattedDate).toEqual('08/11/2023');
  });

  it('should return null for invalid date', () => {
    const invalidDate = 'invalid-date';
    const formattedDate = formatDate(invalidDate, 'en-us');
    expect(formattedDate).toBeNull();
  });
});
