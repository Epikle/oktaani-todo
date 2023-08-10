import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';

vi.mock('@formkit/auto-animate');
const spySelected = vi.spyOn(useSelectedStore.getState(), 'selected', 'get');
const spyDeleteCol = vi.spyOn(useTodoStore.getState().actions, 'deleteCollection').mockImplementation(async () => {});

describe('Header', () => {
  it('Should show logo', () => {
    const { getByText } = render(<Header />);
    expect(getByText('oktaani')).toBeInTheDocument();
  });

  it('Should show settings button', () => {
    const { getByTestId } = render(<Header />);
    const settingsBtnElem = getByTestId('btn-settings');
    expect(settingsBtnElem).toBeInTheDocument();
  });

  it('Should show settings button', () => {
    const { getByTestId, queryByTestId } = render(<Header />);
    const settingsBtnElem = getByTestId('btn-settings');
    const todoControlsElem = queryByTestId('todo-controls');
    expect(settingsBtnElem).toBeInTheDocument();
    expect(todoControlsElem).not.toBeInTheDocument();
  });

  it('Should show todo controls', () => {
    spySelected.mockReturnValue(true);
    const { queryByTestId, getByTestId } = render(<Header />);
    const todoControlsElem = getByTestId('todo-controls');
    const settingsBtnElem = queryByTestId('btn-settings');
    expect(todoControlsElem).toBeInTheDocument();
    expect(settingsBtnElem).not.toBeInTheDocument();
  });

  it('Should show delete confirm and cancel it', () => {
    spySelected.mockReturnValue(true);
    const { getByTestId } = render(<Header />);
    const deleteBtnElem = getByTestId('delete-collection-btn');
    fireEvent.click(deleteBtnElem);
    const cancelBtnElem = getByTestId('cancel-delete-btn');
    fireEvent.click(cancelBtnElem);
    expect(spyDeleteCol).toBeCalledTimes(0);
  });

  it('Should show delete confirm and accept it', async () => {
    spySelected.mockReturnValue(true);
    const { getByTestId } = render(<Header />);
    const deleteBtnElem = getByTestId('delete-collection-btn');
    fireEvent.click(deleteBtnElem);
    const confirmBtnElem = getByTestId('confirm-delete-btn');
    fireEvent.click(confirmBtnElem);
    await waitFor(() => {
      expect(spyDeleteCol).toBeCalledTimes(1);
    });
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
