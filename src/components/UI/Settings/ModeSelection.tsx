import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import useSettingsStore from '../../../context/useSettingsStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './ModeSelection.module.scss';

type Props = {
  disabled: boolean;
};

const ModeSelection: FC<Props> = ({ disabled }) => {
  const darkMode = useSettingsStore((state) => state.darkMode);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setSettings } = useSettingsStore((state) => state.actions);
  const { text } = useLanguage();

  const modeBtnHandler = () => {
    setSettings({ languageName, darkMode: !darkMode });
  };

  return (
    <Button className={styles.mode} onClick={modeBtnHandler} title={text.controls.changeColorMode} disabled={disabled}>
      {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
    </Button>
  );
};

export default ModeSelection;
