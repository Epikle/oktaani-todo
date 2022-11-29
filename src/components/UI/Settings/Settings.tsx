import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import LanguageSelection from './LanguageSelection';
import ModeSelection from './ModeSelection';
import Button from '../Button';

import styles from './Settings.module.scss';

const Settings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const settingsBtnHandler = () => {
    setShowSettings((prevS) => !prevS);
  };

  const hiddenBtnsStyles = showSettings
    ? [styles['hidden-btns'], styles.selected].join(' ')
    : styles['hidden-btns'];

  const settingsBtnStyles = showSettings
    ? [styles.gear, styles.selected].join(' ')
    : styles.gear;

  return (
    <ul className={styles.settings} data-testid="todo-settings">
      <li className={hiddenBtnsStyles}>
        <ul>
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
          aria-label="Settings"
          content={<FontAwesomeIcon icon={faGear} />}
        />
      </li>
    </ul>
  );
};

export default Settings;
