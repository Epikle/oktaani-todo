/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

import type { Languages } from '../../types';
import { Item } from './TodoItem';
import { setupStore } from '../../context/store';

describe('TodoItem', () => {
  const itemSetup = {
    text: 'Test item',
    done: false,
    created: Date(),
    onDone: jest.fn(),
    language: 'en-us' as Languages,
  };

  it('Item is showing with all attributes', () => {
    render(
      <Provider store={setupStore()}>
        <Item {...itemSetup} />
      </Provider>,
    );

    const item = screen.getByLabelText(itemSetup.text);

    expect(item).toBeInTheDocument();
    expect(itemSetup.onDone).toHaveBeenCalledTimes(0);
  });

  it('When clicked label should call handlerFn', () => {
    render(
      <Provider store={setupStore()}>
        <Item {...itemSetup} />
      </Provider>,
    );

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
    render(
      <Provider store={setupStore()}>
        <Item {...itemSetup} done />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
