/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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

  it('Confirm btn should show loading spinner', () => {
    const { getByTestId } = render(<Confirm {...confirmSetup} />);

    const spinnerElem = getByTestId('confirm-delete-btn').querySelector('svg');

    expect(spinnerElem).toBeInTheDocument();
    expect(spinnerElem).toHaveAttribute('data-icon', 'spinner');
  });

  it('When clicked cancel btn should call handlerfn', () => {
    const { getByTestId } = render(<Confirm {...confirmSetup} />);

    const btn = getByTestId('cancel-delete-btn');
    btn.click();

    expect(confirmSetup.onCancel).toHaveBeenCalledTimes(1);
  });

  it('When clicked confirm btn should call handlerfn', () => {
    const { getByTestId } = render(<Confirm {...confirmSetup} />);

    const btn = getByTestId('confirm-delete-btn');
    btn.click();

    expect(confirmSetup.onConfirm).toHaveBeenCalledTimes(1);
  });
});
