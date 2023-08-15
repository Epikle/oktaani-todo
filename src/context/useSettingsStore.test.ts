import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSettingsStore from './useSettingsStore';

describe('useSettingsStore', () => {
  it('Should save valid settings to LS', async () => {
    const { result } = renderHook(() => useSettingsStore((state) => state));
    act(() => {
      result.current.actions.setSettings({ languageName: 'en-us', darkMode: true });
    });
    expect(result.current.languageName).toBe('en-us');
    expect(result.current.darkMode).toBe(true);
  });

  it('Should not save settings to LS', () => {
    const { result } = renderHook(() => useSettingsStore((state) => state));
    act(() => {
      result.current.actions.setSettings({ languageName: 'fi', darkMode: true });
      result.current.actions.setSettings({ languageName: 'error' });
    });
    expect(result.current.languageName).toBe('fi');
  });
});
