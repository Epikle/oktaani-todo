import { fireEvent, render } from '@testing-library/react';

import Settings from './Settings';

describe('Settings', () => {
  it('Settings should not be visible', () => {
    const { getByTestId } = render(<Settings />);
    const list = getByTestId('todo-settings').querySelector('li');
    expect(list?.getAttribute('class')).not.toContain('selected');
  });

  it('Button click should show settings', () => {
    const { getByTestId } = render(<Settings />);
    const btnElem = getByTestId('btn-settings');
    const list = getByTestId('todo-settings').querySelector('li');
    fireEvent.click(btnElem);
    expect(list?.getAttribute('class')).toContain('selected');
  });
});
