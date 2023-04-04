/* eslint-disable react/jsx-props-no-spreading */
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import type { Languages } from '../../types';
import { Item } from './TodoItem';

describe('TodoItem', () => {
  const itemSetup = {
    text: 'Test item',
    done: false,
    created: Date(),
    onDone: vi.fn(),
    language: 'en-us' as Languages,
  };

  it('Item is showing with all attributes', () => {
    render(<Item {...itemSetup} />);

    const item = screen.getByLabelText(itemSetup.text);

    expect(item).toBeInTheDocument();
    expect(itemSetup.onDone).toHaveBeenCalledTimes(0);
  });

  it('When clicked label should call handlerFn', () => {
    render(<Item {...itemSetup} />);

    const checkbox = screen.getByRole('checkbox');
    const item = screen.getByLabelText(itemSetup.text);
    act(() => {
      item.click();
    });

    expect(item).toBeInTheDocument();
    expect(itemSetup.onDone).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('Should render checkbox already checked', () => {
    render(<Item {...itemSetup} done />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
