import { FC } from 'react';

type Props = {
  className?: string;
  title?: string;
  testId?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  content: React.ReactNode;
};

const Button: FC<Props> = ({ className, title, testId, onClick, content }) => {
  return (
    <li>
      <button
        className={className}
        aria-label={title}
        title={title}
        onClick={onClick}
        data-testid={testId}
      >
        {content}
      </button>
    </li>
  );
};

export default Button;
