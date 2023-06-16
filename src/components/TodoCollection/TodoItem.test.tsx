/* eslint-disable react/jsx-props-no-spreading */
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from './TodoItem';
import type { Languages } from '../../utils/languages';
import { TodoItemPriorityEnum } from '../../context/useTodoStore';

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

  it('When clicked label should call handlerFn', () => {
    render(<TodoItem {...itemSetup} />);

    const checkbox = screen.getByRole('checkbox');
    const item = screen.getByLabelText(itemSetup.todo.text);
    act(() => {
      item.click();
    });

    expect(item).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('Should render checkbox already checked', () => {
    itemSetup.todo.done = true;
    render(<TodoItem {...itemSetup} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
