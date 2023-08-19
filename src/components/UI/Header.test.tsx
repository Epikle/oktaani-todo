import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';
import useSelectedStore from '../../context/useSelectedStore';
import { testCollections } from '../../setupTests';

vi.mock('@formkit/auto-animate');
const spySelected = vi.spyOn(useSelectedStore.getState(), 'selectedCollection', 'get');

describe('Header', () => {
  it('Should show logo', () => {
    const { getByText } = render(<Header />);
    expect(getByText('oktaani')).toBeInTheDocument();
  });

  it('Should show settings button', () => {
    const { getByTestId, queryByTestId } = render(<Header />);
    const settingsBtnElem = getByTestId('btn-settings');
    const todoControlsElem = queryByTestId('todo-controls');
    expect(settingsBtnElem).toBeInTheDocument();
    expect(todoControlsElem).not.toBeInTheDocument();
  });

  it('Should show todo controls', () => {
    spySelected.mockReturnValue({ ...testCollections[0], edit: false });
    const { queryByTestId, getByTestId } = render(<Header />);
    const todoControlsElem = getByTestId('todo-controls');
    const settingsBtnElem = queryByTestId('btn-settings');
    expect(todoControlsElem).toBeInTheDocument();
    expect(settingsBtnElem).not.toBeInTheDocument();
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
