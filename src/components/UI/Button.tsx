import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../../utils/utils';

import styles from './Button.module.scss';

type ButtonProps = {
  testId?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(
  ({ testId, className, ...props }, ref) => (
    <button ref={ref} type="button" className={cn(styles.button, className)} data-testid={testId} {...props} />
  ),
);

Button.displayName = 'Button';

export const ButtonToggle = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & ButtonProps>(
  ({ testId, className, children, title, ...props }, ref) => {
    const id = useId();

    return (
      <>
        <input id={id} ref={ref} type="checkbox" className={styles.checkbox} {...props} />
        <label htmlFor={id} className={cn(styles.toggle, className)} data-testid={testId} title={title}>
          {children}
        </label>
      </>
    );
  },
);

ButtonToggle.displayName = 'ButtonToggle';
