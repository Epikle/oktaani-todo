import { Mock } from 'vitest';
import { copyToClipboard } from './utils';

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
    },
    writable: true,
  });
});

describe('Utils', () => {
  it('should copy text to clipboard', async () => {
    const result = await copyToClipboard('test-id');

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('test-id'));
  });

  it('should handle clipboard write error', async () => {
    (navigator.clipboard.writeText as Mock).mockRejectedValue(new Error('Clipboard write error'));

    const result = await copyToClipboard('test-id');

    expect(result).toBe(false);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('test-id'));
  });
});
