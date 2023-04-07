import { FC, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  testId?: string;
};

const Button: FC<Props> = ({ className, title, testId, onClick, content, children, ...rest }) => (
  <button
    type="button"
    className={className}
    aria-label={title}
    title={title}
    onClick={onClick}
    data-testid={testId}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
