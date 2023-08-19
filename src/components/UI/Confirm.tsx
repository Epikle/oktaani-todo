import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleQuestion, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import Button from './Button';

import styles from './Confirm.module.scss';

type Props = {
  confirmText: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

const Confirm: FC<Props> = ({ confirmText, onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { text } = useLanguage();

  const confirmBtnHandler = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    <div className={styles.confirm} data-testid="confirm-container">
      <div className={styles.text}>
        <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
        {confirmText}
      </div>
      <ul className={styles.controls}>
        <li>
          <Button
            title={text.common.confirm}
            onClick={confirmBtnHandler}
            testId="confirm-delete-btn"
            disabled={isLoading}
          >
            {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
            {!isLoading && <FontAwesomeIcon icon={faCheck} />}
          </Button>
        </li>
        <li>
          <Button
            className={styles['cancel-btn']}
            title={text.common.cancel}
            onClick={onCancel}
            testId="cancel-delete-btn"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Confirm;
