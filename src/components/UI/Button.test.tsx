/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  const btnSetup = {
    testId: 'btn-test',
    title: 'Btn title',
    className: 'test-class',
  };

  it('Button is showing with all attributes', () => {
    const { getByTestId } = render(<Button {...btnSetup}>Test button</Button>);
    const btn = getByTestId(btnSetup.testId);
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Test button');
    expect(btn).toHaveAccessibleDescription(btnSetup.title);
    expect(btn).toHaveAttribute('title', btnSetup.title);
    expect(btn).toHaveClass(btnSetup.className);
  });

  it('When clicked should call handlerFn', () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Button onClick={onClick} {...btnSetup}>
        Test button
      </Button>,
    );
    const btn = getByTestId(btnSetup.testId);
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
