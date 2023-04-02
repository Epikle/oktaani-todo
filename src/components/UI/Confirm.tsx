import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleQuestion,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import Button from './Button';

import styles from './Confirm.module.scss';

type Props = {
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
};

const Confirm: FC<Props> = ({
  confirmText,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  const { text } = useLanguage();

  return (
    <div className={styles.confirm}>
      <div className={styles.text}>
        <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
        {confirmText}
      </div>
      <ul className={styles.controls}>
        <li>
          <Button
            title={text.common.confirm}
            content={
              isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spinPulse />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )
            }
            onClick={onConfirm}
            testId="confirm-delete-btn"
            disabled={isLoading}
          />
        </li>
        <li>
          <Button
            className={styles['cancel-btn']}
            title={text.common.cancel}
            content={<FontAwesomeIcon icon={faXmark} />}
            onClick={onCancel}
            testId="cancel-delete-btn"
            disabled={isLoading}
          />
        </li>
      </ul>
    </div>
  );
};

export default Confirm;
