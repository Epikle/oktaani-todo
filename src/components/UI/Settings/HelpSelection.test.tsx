/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render } from '@testing-library/react';

import HelpSelection from './HelpSelection';
import useTodoStore, { Collection } from '../../../context/useTodoStore';

const testCollection: Collection[] = [
  {
    id: 'IwYiZF70veJRPzQifSt9K',
    title: 'test23',
    color: '#7b68ee',
    shared: false,
    created: 'Fri Jun 16 2023 13:56:42 GMT+0300 (Itä-Euroopan kesäaika)',
    todos: [
      {
        id: 'PChjiHE-Wr3PZ2KNBN0-z',
        text: '6',
        done: true,
        created: 'Thu Jul 20 2023 09:49:27 GMT+0300 (Itä-Euroopan kesäaika)',
        priority: 'low',
      },
    ],
    note: '',
    type: 'todo',
  },
];

describe('HelpSelection', () => {
  it('Button should not have class help-active', () => {
    const { getByTestId } = render(<HelpSelection />);
    const btn = getByTestId('help-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveClass('help-active');
  });

  it('Button should be disabled', () => {
    const { getByTestId } = render(<HelpSelection />);
    const btn = getByTestId('help-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('Button should not be disabled', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockReturnValue(testCollection);
    const { getByTestId } = render(<HelpSelection />);
    const btnElem = getByTestId('help-btn');
    expect(btnElem).toBeInTheDocument();
    expect(btnElem).not.toBeDisabled();
  });

  it('Button should have class help-active', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockReturnValue(testCollection);
    const { getByTestId } = render(<HelpSelection />);
    const btnElem = getByTestId('help-btn');
    fireEvent.click(btnElem);
    expect(btnElem).toBeInTheDocument();
    expect(btnElem).not.toBeDisabled();
    expect(btnElem.getAttribute('class')).toContain('help-active');
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
