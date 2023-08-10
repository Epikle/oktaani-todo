/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSettingsStore from '../../../context/useSettingsStore';
import ModeSelection from './ModeSelection';

describe('ModeSelection', () => {
  it('Button click should activate handlerfn', () => {
    const spy = vi.spyOn(useSettingsStore.getState().actions, 'setSettings');

    const { getByRole } = render(<ModeSelection disabled={false} />);

    const btn = getByRole('button');

    act(() => {
      btn.click();
    });

    expect(btn).toBeInTheDocument();
    expect(spy).toBeCalledTimes(1);
  });

  it('Disabled button, click should not activate handlerfn', () => {
    const spy = vi.spyOn(useSettingsStore.getState().actions, 'setSettings');

    const { getByRole } = render(<ModeSelection disabled />);

    const btn = getByRole('button');

    act(() => {
      btn.click();
    });

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(spy).toBeCalledTimes(0);
  });
});
