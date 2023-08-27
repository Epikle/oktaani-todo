import { FC } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: FC = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" />
    Loading, please wait.
  </div>
);

export default LoadingSpinner;
