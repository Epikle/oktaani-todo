/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Settings from './Settings';

describe('Settings', () => {
  it('Settings should not be visible', () => {
    const { getByTestId } = render(<Settings />);

    const list = getByTestId('todo-settings').querySelector('li');

    expect(list?.getAttribute('class')).not.toContain('selected');
  });

  it('Button click should show settings', () => {
    const { getByTestId } = render(<Settings />);

    const btn = getByTestId('btn-settings');
    const list = getByTestId('todo-settings').querySelector('li');

    act(() => {
      btn.click();
    });

    expect(list?.getAttribute('class')).toContain('selected');
  });
});
