import { ButtonHTMLAttributes, forwardRef } from 'react';

type Props = {
  testId?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & Props>(
  ({ testId, children, ...props }, ref) => (
    <button type="button" ref={ref} data-testid={testId} {...props}>
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
