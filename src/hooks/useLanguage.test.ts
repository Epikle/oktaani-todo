import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useLanguage from './useLanguage';
import useSettingsStore from '../context/useSettingsStore';

const spySetSettings = vi.spyOn(useSettingsStore.getState().actions, 'setSettings');

describe('useLanguage', () => {
  test('should render the initial count', () => {
    const { result } = renderHook(useLanguage);
    act(() => result.current.nextLang());
    expect(spySetSettings).toBeCalledTimes(1);
  });
});
