/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from './TodoItem';
import type { Languages } from '../../utils/languages';
import useTodoStore, { TodoItemPriorityEnum } from '../../context/useTodoStore';
import useStatusStore from '../../context/useStatusStore';

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
    const item = screen.getByLabelText(itemSetup.todo.text);

    act(() => {
      item.click();
    });

    expect(item).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('When clicked should fail and show error', () => {
    const spy = vi.spyOn(useTodoStore.getState().actions, 'toggleItemDone').mockImplementation(() => {
      throw new Error('error');
    });
    const spy2 = vi.spyOn(useStatusStore.getState().actions, 'setError');

    render(<TodoItem {...itemSetup} />);

    const checkbox = screen.getByRole('checkbox');

    act(() => {
      checkbox.click();
    });

    expect(checkbox).toBeChecked();
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });

  it('Should render checkbox already checked', () => {
    itemSetup.todo.done = true;
    render(<TodoItem {...itemSetup} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('Should change priority of item', async () => {
    const spy = vi.spyOn(useTodoStore.getState().actions, 'editTodoItemPriority');

    const { getByTestId } = render(<TodoItem {...itemSetup} />);

    const priorityBtn = getByTestId('item-btn-priority');

    act(() => {
      priorityBtn.click();
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('Should activate delete btn handler', () => {
    const spy = vi.spyOn(useTodoStore.getState().actions, 'removeTodoItem');

    const { getByTestId } = render(<TodoItem {...itemSetup} />);

    const deleteBtn = getByTestId('item-btn-remove');

    act(() => {
      deleteBtn.click();
    });

    expect(spy).toBeCalledTimes(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
