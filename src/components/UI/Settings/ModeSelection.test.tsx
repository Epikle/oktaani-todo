/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render } from '@testing-library/react';

import useSettingsStore from '../../../context/useSettingsStore';
import ModeSelection from './ModeSelection';

const spy = vi.spyOn(useSettingsStore.getState().actions, 'setSettings');

describe('ModeSelection', () => {
  it('Button click should activate handlerfn', () => {
    const { getByRole } = render(<ModeSelection disabled={false} />);
    const btnElem = getByRole('button');
    fireEvent.click(btnElem);
    expect(btnElem).toBeInTheDocument();
    expect(spy).toBeCalledTimes(1);
  });

  it('Disabled button, click should not activate handlerfn', () => {
    const { getByRole } = render(<ModeSelection disabled />);
    const btnElem = getByRole('button');
    fireEvent.click(btnElem);
    expect(btnElem).toBeInTheDocument();
    expect(btnElem).toBeDisabled();
    expect(spy).toBeCalledTimes(0);
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
