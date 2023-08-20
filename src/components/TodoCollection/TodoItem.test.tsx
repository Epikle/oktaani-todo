import { render } from '@testing-library/react';

import TodoItem from './TodoItem';
import { PriorityEnum } from '../../utils/types';

const itemSetup = {
  item: {
    id: 'todo123',
    message: 'Test item',
    status: false,
    createdAt: Date(),
    priority: PriorityEnum.enum.low,
    colId: 'col-id',
  },
  selected: false,
};

vi.mock('@formkit/auto-animate');

describe('TodoItem', () => {
  it('should show todo item with text', () => {
    const { getByLabelText } = render(<TodoItem {...itemSetup} />);
    const itemElem = getByLabelText(itemSetup.item.message);
    expect(itemElem).toBeInTheDocument();
  });

  it('should show not checked todo item', () => {
    const { getByRole } = render(<TodoItem {...itemSetup} />);
    const checkboxElem = getByRole('checkbox');
    expect(checkboxElem).not.toBeChecked();
  });

  it('Should render checkbox already checked', () => {
    itemSetup.item.status = true;
    const { getByRole } = render(<TodoItem {...itemSetup} />);
    const checkboxElem = getByRole('checkbox');
    expect(checkboxElem).toBeChecked();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
