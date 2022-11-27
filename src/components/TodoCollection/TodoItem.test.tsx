import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Item } from './TodoItem';
import { act } from 'react-dom/test-utils';

describe('TodoItem', () => {
  const itemSetup = {
    text: 'Test item',
    done: false,
  };
  const onChange = jest.fn();

  it('Item is showing with all attributes', () => {
    render(<Item {...itemSetup} onChange={onChange} />);

    const item = screen.getByLabelText(itemSetup.text);

    expect(item).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('When clicked label should call handlerFn', () => {
    render(<Item {...itemSetup} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    const item = screen.getByLabelText(itemSetup.text);
    act(() => {
      item.click();
    });

    expect(item).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('Should render checkbox already checked', () => {
    render(<Item {...itemSetup} done={true} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
