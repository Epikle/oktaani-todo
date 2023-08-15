import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from './TodoItem';
import { PriorityEnum } from '../../utils/types';

describe('TodoItem', () => {
  const itemSetup = {
    item: {
      id: 'todo123',
      message: 'Test item',
      status: false,
      createdAt: Date(),
      priority: PriorityEnum.enum.low,
      colId: 'col-id',
    },
    selected: true,
  };

  it('Item is showing with all attributes', () => {
    const { getByLabelText } = render(<TodoItem {...itemSetup} />);
    const item = getByLabelText(itemSetup.item.message);
    expect(item).toBeInTheDocument();
  });

  it('When clicked checkbox should be checked', () => {
    const { getByRole, getByLabelText } = render(<TodoItem {...itemSetup} />);
    const checkbox = getByRole('checkbox');
    const itemElem = getByLabelText(itemSetup.item.message);
    fireEvent.click(itemElem);
    expect(checkbox).toBeChecked();
  });

  it('Should render checkbox already checked', () => {
    itemSetup.item.status = true;
    const { getByRole } = render(<TodoItem {...itemSetup} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
