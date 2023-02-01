import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleQuestion,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import Button from './Button';

import styles from './Confirm.module.scss';

type Props = {
  confirm: () => void;
  cancel: () => void;
};

const Confirm: FC<Props> = ({ confirm, cancel }) => {
  const { text } = useLanguage();

  return (
    <div className={styles.confirm}>
      <div className={styles.text}>
        <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
        {text.controls.deleteConfirm}
      </div>
      <ul className={styles.controls}>
        <li>
          <Button
            title={text.common.confirm}
            content={<FontAwesomeIcon icon={faCheck} />}
            onClick={confirm}
          />
        </li>
        <li>
          <Button
            className={styles['cancel-btn']}
            title={text.common.cancel}
            content={<FontAwesomeIcon icon={faXmark} />}
            onClick={cancel}
          />
        </li>
      </ul>
    </div>
  );
};

export default Confirm;
