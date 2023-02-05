import { FC, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  content: React.ReactNode;
  testId?: string;
};

const Button: FC<Props> = ({ className, title, testId, onClick, content }) => (
  <button
    type="button"
    className={className}
    aria-label={title}
    title={title}
    onClick={onClick}
    data-testid={testId}
  >
    {content}
  </button>
);

export default Button;
