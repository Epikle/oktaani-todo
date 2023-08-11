import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSettingsStore from './useSettingsStore';

describe('useSettingsStore', () => {
  it('Should save valid settings to LS', async () => {
    const { result } = renderHook(() => useSettingsStore((state) => state));
    act(() => {
      result.current.actions.setSettings({ languageName: 'fi', darkMode: true });
    });
    await waitFor(() => {
      expect(result.current.languageName).toBe('fi');
      expect(result.current.darkMode).toBe(true);
    });
  });

  it('Should not save settings to LS', async () => {
    const { result } = renderHook(() => useSettingsStore((state) => state));
    act(() => {
      result.current.actions.setSettings({ languageName: 'fi', darkMode: true });
      result.current.actions.setSettings({ languageName: 'error' });
    });
    await waitFor(() => {
      expect(result.current.languageName).toBe('fi');
    });
  });
});
