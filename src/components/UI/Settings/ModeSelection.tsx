import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';

import styles from './ModeSelection.module.scss';

type Props = {
  disabled: boolean;
};

const ModeSelection: FC<Props> = ({ disabled }) => {
  const [darkMode, setDarkMode] = useState(false);

  const modeBtnHandler = () => {
    setDarkMode((prevS) => !prevS);
  };

  return (
    <Button
      className={styles.mode}
      onClick={modeBtnHandler}
      aria-label="Change mode"
      disabled={disabled}
      content={
        darkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )
      }
    />
  );
};

export default ModeSelection;
