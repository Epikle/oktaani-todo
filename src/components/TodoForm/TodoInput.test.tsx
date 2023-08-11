/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render } from '@testing-library/react';

import TodoInput from './TodoInput';
import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';

const mockInputHandler = vi.fn();
const spySelected = vi.spyOn(useSelectedStore.getState(), 'selected', 'get');
const spyType = vi.spyOn(useSelectedStore.getState(), 'type', 'get');
const spyEdit = vi.spyOn(useSelectedStore.getState(), 'edit', 'get');
const spySort = vi.spyOn(useSettingsStore.getState(), 'sort', 'get');

describe('TodoInput', () => {
  it('Typing should call handler fn', () => {
    const { getByTestId } = render(
      <TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} isLoading={false} />,
    );
    const inputElem = getByTestId('todo-input');
    fireEvent.change(inputElem, { target: { value: 'test' } });
    expect(inputElem).toBeInTheDocument();
    expect(mockInputHandler).toBeCalled();
  });

  it('Should autofocus the input', () => {
    spySelected.mockReturnValue(true);
    spyType.mockReturnValue('todo');
    const { getByTestId } = render(
      <TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} isLoading={false} />,
    );
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toHaveFocus();
  });

  it('Input should be disabled when sorting', () => {
    spySort.mockReturnValue(true);
    const { getByTestId } = render(
      <TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} isLoading={false} />,
    );
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });

  it('Input should be disabled when loading', () => {
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} isLoading />);
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });

  it('Input should be disabled when type note and not editing', () => {
    spyEdit.mockReturnValue(false);
    spyType.mockReturnValue('note');
    const { getByTestId } = render(
      <TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} isLoading={false} />,
    );
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
