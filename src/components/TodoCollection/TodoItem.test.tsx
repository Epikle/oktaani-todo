/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from './TodoItem';
import type { Languages } from '../../utils/languages';
import useTodoStore, { TodoItemPriorityEnum } from '../../context/useTodoStore';
import useStatusStore from '../../context/useStatusStore';

const spyEditTodoItemPriority = vi.spyOn(useTodoStore.getState().actions, 'editTodoItemPriority');
const spyToggleItemDone = vi.spyOn(useTodoStore.getState().actions, 'toggleItemDone');
const spySetError = vi.spyOn(useStatusStore.getState().actions, 'setError');
const spyRemoveItem = vi.spyOn(useTodoStore.getState().actions, 'removeTodoItem');

describe('TodoItem', () => {
  const itemSetup = {
    todo: {
      id: 'todo123',
      text: 'Test item',
      done: false,
      created: Date(),
      language: 'en-us' as Languages,
      priority: TodoItemPriorityEnum.Values.low,
    },
    colId: 'id123',
    selected: true,
  };

  it('Item is showing with all attributes', () => {
    render(<TodoItem {...itemSetup} />);
    const item = screen.getByLabelText(itemSetup.todo.text);
    expect(item).toBeInTheDocument();
  });

  it('When clicked checkbox should be checked', () => {
    render(<TodoItem {...itemSetup} />);
    const checkbox = screen.getByRole('checkbox');
    const itemElem = screen.getByLabelText(itemSetup.todo.text);
    fireEvent.click(itemElem);
    expect(itemElem).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('When clicked should fail and show error', () => {
    spyToggleItemDone.mockImplementation(() => {
      throw new Error('error');
    });
    render(<TodoItem {...itemSetup} />);
    const checkboxElem = screen.getByRole('checkbox');
    fireEvent.click(checkboxElem);
    expect(checkboxElem).toBeChecked();
    expect(spyToggleItemDone).toBeCalledTimes(1);
    expect(spySetError).toBeCalledTimes(1);
  });

  it('Should render checkbox already checked', () => {
    itemSetup.todo.done = true;
    render(<TodoItem {...itemSetup} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('Should change priority of item', async () => {
    const { getByTestId } = render(<TodoItem {...itemSetup} />);
    const priorityBtnElem = getByTestId('item-btn-priority');
    fireEvent.click(priorityBtnElem);
    expect(spyEditTodoItemPriority).toBeCalledTimes(1);
  });

  it('Should activate delete btn handler', () => {
    const { getByTestId } = render(<TodoItem {...itemSetup} />);
    const deleteBtnElem = getByTestId('item-btn-remove');
    fireEvent.click(deleteBtnElem);
    expect(spyRemoveItem).toBeCalledTimes(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
