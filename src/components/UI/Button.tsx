import { FC, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  testId?: string;
  content: React.ReactNode;
};

const Button: FC<Props> = ({
  className,
  title,
  testId,
  onClick,
  content,
  ...rest
}) => {
  return (
    <button
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
};

export default Button;
