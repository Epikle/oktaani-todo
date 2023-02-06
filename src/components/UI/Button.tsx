import { FC, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  content: React.ReactNode;
  testId?: string;
};

const Button: FC<Props> = ({
  className,
  title,
  testId,
  onClick,
  content,
  ...rest
}) => (
  <button
    type="button"
    className={className}
    aria-label={title}
    title={title}
    onClick={onClick}
    data-testid={testId}
    {...rest}
  >
    {content}
  </button>
);

export default Button;
