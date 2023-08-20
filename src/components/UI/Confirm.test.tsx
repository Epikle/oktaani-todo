import { fireEvent, render } from '@testing-library/react';

import Confirm from './Confirm';

describe('Confirm', () => {
  const confirmSetup = {
    confirmText: 'test-confirm-text',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it('Confirm is showing with all attributes', () => {
    const { getByText } = render(<Confirm {...confirmSetup} />);
    const confirmText = getByText(confirmSetup.confirmText);
    expect(confirmText).toBeInTheDocument();
    expect(confirmText).toHaveTextContent(confirmSetup.confirmText);
  });

  it('When clicked cancel btn should call handlerfn', () => {
    const { getByTestId } = render(<Confirm {...confirmSetup} />);
    const btnElem = getByTestId('cancel-delete-btn');
    fireEvent.click(btnElem);
    expect(confirmSetup.onCancel).toHaveBeenCalledTimes(1);
  });

  it('When clicked confirm btn should call handlerfn', () => {
    const { getByTestId } = render(<Confirm {...confirmSetup} />);
    const btnElem = getByTestId('confirm-delete-btn');
    fireEvent.click(btnElem);
    expect(confirmSetup.onConfirm).toHaveBeenCalledTimes(1);
  });
});
