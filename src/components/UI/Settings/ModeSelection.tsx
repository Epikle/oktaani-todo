import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setSettings } from '../../../context/settingsSlice';
import useLanguage from '../../../hooks/useLanguage';

import styles from './ModeSelection.module.scss';

type Props = {
  disabled: boolean;
};

const ModeSelection: FC<Props> = ({ disabled }) => {
  const { languageName, darkMode } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  const modeBtnHandler = () => {
    dispatch(setSettings({ languageName, darkMode: !darkMode }));
  };

  return (
    <Button
      className={styles.mode}
      onClick={modeBtnHandler}
      title={text.controls.changeColorMode}
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
