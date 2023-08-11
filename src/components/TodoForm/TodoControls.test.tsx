/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render, waitFor } from '@testing-library/react';

import TodoControls from './TodoControls';
import useTodoStore from '../../context/useTodoStore';
import useSelectedStore from '../../context/useSelectedStore';
import useStatusStore from '../../context/useStatusStore';

const mockConfirm = vi.fn();
const spyRemoveDoneItems = vi.spyOn(useTodoStore.getState().actions, 'removeDoneItems');
const spyEditCollection = vi.spyOn(useTodoStore.getState().actions, 'editCollection');
const spySelectedDone = vi.spyOn(useSelectedStore.getState(), 'hasDone', 'get');
const spyEdit = vi.spyOn(useSelectedStore.getState(), 'edit', 'get');
const spySetSelectedCol = vi.spyOn(useSelectedStore.getState().actions, 'setSelectedCollection');
const spyShared = vi.spyOn(useSelectedStore.getState(), 'shared', 'get');
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

  it('Edit btn should call handler fn', () => {
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const editBtnElem = getByTestId('edit-collection-title-btn');
    fireEvent.click(editBtnElem);
    expect(spySetSelectedCol).toBeCalledTimes(1);
  });

  it('Share button should call start share fn', () => {
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const shareBtnElem = getByTestId('share-col-btn');
    fireEvent.click(shareBtnElem);
    expect(mockConfirm).toBeCalledTimes(1);
  });

  it('Share button should call end share fn', () => {
    spyShared.mockReturnValue(true);
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const shareBtnElem = getByTestId('share-col-btn');
    fireEvent.click(shareBtnElem);
    expect(mockConfirm).toBeCalledTimes(0);
    expect(spySetSelectedCol).toBeCalledTimes(1);
    expect(spyEditCollection).toBeCalledTimes(1);
    expect(spyEditCollection.mock.calls[0][0].noShare).toBeUndefined();
  });

  it('Share button should call end share fn and fail to update collection', () => {
    spyShared.mockReturnValue(true);
    spyEditCollection.mockImplementationOnce(() => {
      throw new Error('error');
    });
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const shareBtnElem = getByTestId('share-col-btn');
    fireEvent.click(shareBtnElem);

    expect(mockConfirm).toBeCalledTimes(0);
    expect(spySetSelectedCol).toBeCalledTimes(1);
    expect(spyEditCollection).toBeCalledTimes(2);
    expect(spyEditCollection.mock.calls[1][0].noShare).toBeTruthy();
  });

  it('When edit btn active should have class edit-active', () => {
    spyEdit.mockReturnValue(true);
    const { getByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const editBtnElem = getByTestId('edit-collection-title-btn');
    expect(editBtnElem.getAttribute('class')).toContain('edit-active');
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
