/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render } from '@testing-library/react';

import TodoInput from './TodoInput';
import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import { testCollections } from '../../setupTests';

const mockInputHandler = vi.fn();
const spySelected = vi.spyOn(useSelectedStore.getState(), 'selectedCollection', 'get');
const spySort = vi.spyOn(useSettingsStore.getState(), 'sort', 'get');

describe('TodoInput', () => {
  it('Typing should call handler fn', () => {
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} />);
    const inputElem = getByTestId('todo-input');
    fireEvent.change(inputElem, { target: { value: 'test' } });
    expect(inputElem).toBeInTheDocument();
    expect(mockInputHandler).toBeCalled();
  });

  it('Should autofocus the input', () => {
    spySelected.mockReturnValue({ ...testCollections[0], edit: false });
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} />);
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toHaveFocus();
  });

  it('Input should be disabled when sorting', () => {
    spySort.mockReturnValue(true);
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} />);
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });

  it('Input should be disabled when loading', () => {
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} />);
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });

  it('Input should be disabled when type note and not editing', () => {
    spySelected.mockReturnValue({ ...testCollections[0], edit: false, type: 'note' });
    const { getByTestId } = render(<TodoInput todoInput="" setTodoInput={mockInputHandler} maxLength={10} />);
    const inputElem = getByTestId('todo-input');
    expect(inputElem).toBeDisabled();
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
