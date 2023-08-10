/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render, waitFor } from '@testing-library/react';

import TodoControls from './TodoControls';
import useTodoStore from '../../context/useTodoStore';
import useSelectedStore from '../../context/useSelectedStore';
import useStatusStore from '../../context/useStatusStore';

const mockConfirm = vi.fn();
const spyRemoveDoneItems = vi.spyOn(useTodoStore.getState().actions, 'removeDoneItems');
const spySelectedDone = vi.spyOn(useSelectedStore.getState(), 'hasDone', 'get');
const spySetError = vi.spyOn(useStatusStore.getState().actions, 'setError');

describe('TodoControls', () => {
  it('Should render 4 list items', () => {
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const listItems = getByTestId('todo-controls').querySelectorAll('li');
    expect(listItems.length).toBe(4);
  });

  it('Delete btn should be disabled', () => {
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const deleteBtnElem = getByTestId('remove-done-btn');
    expect(deleteBtnElem).toBeDisabled();
  });

  it('Delete btn should call handler fn', async () => {
    spySelectedDone.mockReturnValue(true);
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const deleteBtnElem = getByTestId('remove-done-btn');
    fireEvent.click(deleteBtnElem);
    await waitFor(() => {
      expect(spyRemoveDoneItems).toBeCalledTimes(1);
    });
  });

  it('Delete btn should call handler fn and fail', () => {
    spySelectedDone.mockReturnValue(true);
    spyRemoveDoneItems.mockImplementation(() => {
      throw new Error('Error');
    });
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const deleteBtnElem = getByTestId('remove-done-btn');
    fireEvent.click(deleteBtnElem);
    expect(spyRemoveDoneItems).toBeCalledTimes(1);
    expect(spySetError).toBeCalledTimes(1);
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
