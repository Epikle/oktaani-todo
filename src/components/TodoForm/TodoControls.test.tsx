/* eslint-disable react/jsx-props-no-spreading */
import { render, renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import TodoControls from './TodoControls';
import * as todoService from '../../services/todo';
import useTodoStore from '../../context/useTodoStore';

const mockConfirm = vi.fn();
const spyGetTodosFromLS = vi.spyOn(todoService, 'getFromLocalStorage');

beforeEach(() => {
  spyGetTodosFromLS.mockReturnValueOnce(null);
  const { result } = renderHook(() => useTodoStore((state) => state));
  act(() => {
    result.current.actions.initCollections();
  });
});

describe('TodoControls', () => {
  it('Should not render controls', async () => {
    const { queryByTestId } = render(<TodoControls onConfirm={mockConfirm} />);
    const listElem = queryByTestId('todo-controls');
    await waitFor(() => {
      expect(listElem).not.toBeInTheDocument();
    });
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
