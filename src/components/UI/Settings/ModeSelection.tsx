import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import styles from './ModeSelection.module.scss';
import { setSettings } from '../../../context/settingsSlice';

type Props = {
  disabled: boolean;
};

const ModeSelection: FC<Props> = ({ disabled }) => {
  const { language, darkMode } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const modeBtnHandler = () => {
    dispatch(setSettings({ language, darkMode: !darkMode }));
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
