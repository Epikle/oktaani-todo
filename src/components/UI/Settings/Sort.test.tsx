/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Sort from './Sort';
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

describe('Sort', () => {
  it('Btn should be disabled', () => {
    const { getByRole } = render(<Sort disabled />);

    const btn = getByRole('button');

    expect(btn).toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });

  it('Btn should be still disabled, no collections', () => {
    const { getByRole } = render(<Sort disabled={false} />);

    const btn = getByRole('button');

    expect(btn).toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });

  it('Btn should be active, with collections', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockImplementation(() => testCollection);
    const { getByRole } = render(<Sort disabled={false} />);

    const btn = getByRole('button');

    expect(btn).not.toBeDisabled();
    expect(btn.getAttribute('class')).not.toContain('sort-active');
  });

  it('Btn click should open settings menu', () => {
    vi.spyOn(useTodoStore.getState(), 'collections', 'get').mockImplementation(() => testCollection);
    const { getByRole } = render(<Sort disabled={false} />);

    const btn = getByRole('button');

    act(() => {
      btn.click();
    });

    expect(btn).not.toBeDisabled();
    expect(btn.getAttribute('class')).toContain('sort-active');
  });
});
