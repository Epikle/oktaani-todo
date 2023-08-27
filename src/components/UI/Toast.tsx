import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import useStatusStore from '../../context/useStatusStore';
import { cn } from '../../utils/utils';
import { Button } from './Button';

import styles from './Toast.module.scss';

type Props = {
  darkMode: boolean;
};

let timeout: undefined | ReturnType<typeof setTimeout>;

const Toast: FC<Props> = ({ darkMode }) => {
  const isError = useStatusStore((state) => state.isError);
  const errorMessage = useStatusStore((state) => state.errorMessage);
  const { resetError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  useEffect(() => {
    if (isError) {
      timeout = setTimeout(() => {
        resetError();
      }, 5000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isError, resetError]);

  const element = (
    <div className={cn(styles.toast, { [styles.show]: isError, 'dark-mode': darkMode })} hidden={!isError}>
      <FontAwesomeIcon icon={faCircleExclamation} size="2xl" />
      {errorMessage}
      <Button title={text.common.close} onClick={resetError} disabled={!isError} className={styles.button}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </Button>
    </div>
  );

  return createPortal(element, document.getElementById('toast') as HTMLElement);
};

export default Toast;
