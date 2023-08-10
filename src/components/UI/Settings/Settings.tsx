import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../../hooks/useLanguage';
import HelpSelection from './HelpSelection';
import LanguageSelection from './LanguageSelection';
import ModeSelection from './ModeSelection';
import Sort from './Sort';
import Button from '../Button';

import styles from './Settings.module.scss';

const Settings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { text } = useLanguage();

  const settingsBtnHandler = () => {
    setShowSettings((prevS) => !prevS);
  };

  const hiddenBtnsStyles = showSettings ? [styles['hidden-btns'], styles.selected].join(' ') : styles['hidden-btns'];
  const settingsBtnStyles = showSettings ? [styles.gear, styles.selected].join(' ') : styles.gear;

  return (
    <div className={styles.group}>
      <ul className={styles.settings} data-testid="todo-settings">
        <li className={hiddenBtnsStyles}>
          <ul>
            <li>
              <Sort disabled={!showSettings} />
            </li>
            <li>
              <LanguageSelection disabled={!showSettings} />
            </li>
            <li>
              <ModeSelection disabled={!showSettings} />
            </li>
          </ul>
        </li>
        <li>
          <Button
            className={settingsBtnStyles}
            onClick={settingsBtnHandler}
            title={text.controls.settings}
            testId="btn-settings"
          >
            <FontAwesomeIcon icon={faGear} />
          </Button>
        </li>
      </ul>
      <ul className={styles.help}>
        <li>
          <HelpSelection />
        </li>
      </ul>
    </div>
  );
};

export default Settings;
