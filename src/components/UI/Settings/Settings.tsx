import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../../hooks/useLanguage';
import { cn } from '../../../utils/utils';
import HelpSelection from './HelpSelection';
import LanguageSelection from './LanguageSelection';
import ModeSelection from './ModeSelection';
import Button from '../Button';
import Sort from './Sort';

import styles from './Settings.module.scss';

const Settings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { text } = useLanguage();

  return (
    <div className={styles.group}>
      <ul className={styles.settings} data-testid="todo-settings">
        <li className={cn(styles['hidden-btns'], { [styles.selected]: showSettings })}>
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
            className={cn(styles.gear, { [styles.selected]: showSettings })}
            onClick={() => setShowSettings((prevS) => !prevS)}
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
