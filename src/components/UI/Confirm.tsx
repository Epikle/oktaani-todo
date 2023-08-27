import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleQuestion, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import { Button } from './Button';

import styles from './Confirm.module.scss';

type Props = {
  confirmText: string;
  loading: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

const Confirm: FC<Props> = ({ confirmText, loading, onConfirm, onCancel }) => {
  const [disabled, setDisabled] = useState(false);
  const { text } = useLanguage();

  const confirmBtnHandler = async () => {
    setTimeout(() => {
      setDisabled(true);
    }, 600);
    await onConfirm();
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
            disabled={loading}
          >
            {loading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
            {!loading && <FontAwesomeIcon icon={faCheck} />}
          </Button>
        </li>
        <li>
          <Button
            className={styles['cancel-btn']}
            title={text.common.cancel}
            onClick={onCancel}
            disabled={disabled}
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
