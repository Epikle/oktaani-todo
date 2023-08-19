import { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onClick?: () => void | Promise<void>;
  toggle?: boolean;
  testId?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & Props>(
  ({ testId, toggle: toggleProp = false, onClick, children, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(toggleProp);

    const handler = async () => {
      if (onClick) {
        setLoading(true);
        await onClick();
        setLoading(false);
      }
      if (toggleProp !== undefined) {
        setToggle((prevS) => !prevS);
      }
    };

    return (
      <button
        type="button"
        ref={ref}
        data-testid={testId}
        onClick={handler}
        {...(toggle ? { 'data-active': true } : {})}
        {...props}
      >
        {loading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
        {!loading && children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
