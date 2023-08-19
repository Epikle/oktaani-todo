import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { cn } from '../../utils/utils';
import Button from './Button';

import styles from './Settings.module.scss';

const Settings: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const collections = useTodoStore((state) => state.collections);
  const { darkMode, languageName } = useSettingsStore((state) => state);
  const { toggleSort, setSettings, toggleHelp } = useSettingsStore((state) => state.actions);
  const { text, nextLang } = useLanguage();

  return (
    <div className={styles.group}>
      <ul className={styles.settings} data-testid="todo-settings">
        <li className={cn(styles['hidden-btns'], { [styles.selected]: showSettings })}>
          <ul>
            <li>
              <Button
                title={text.controls.sort}
                className={styles.sort}
                onClick={toggleSort}
                disabled={!showSettings || !collections}
                toggle={false}
              >
                <FontAwesomeIcon icon={icon.faArrowDownShortWide} />
              </Button>
            </li>
            <li>
              <Button
                title={text.controls.language}
                className={styles.language}
                data-language={languageName}
                onClick={nextLang}
                disabled={!showSettings}
                testId="btn-language"
              >
                <FontAwesomeIcon icon={icon.faEarthAmericas} />
              </Button>
            </li>
            <li>
              <Button
                title={text.controls.changeColorMode}
                className={styles.mode}
                onClick={() => setSettings({ languageName, darkMode: !darkMode })}
                disabled={!showSettings}
                testId="btn-mode"
              >
                {darkMode && <FontAwesomeIcon icon={icon.faSun} data-testid="icon-sun" />}
                {!darkMode && <FontAwesomeIcon icon={icon.faMoon} data-testid="icon-moon" />}
              </Button>
            </li>
          </ul>
        </li>
        <li>
          <Button
            title={text.controls.settings}
            className={styles.gear}
            onClick={() => setShowSettings((prevS) => !prevS)}
            testId="btn-settings"
            toggle={false}
          >
            <FontAwesomeIcon icon={icon.faGear} />
          </Button>
        </li>
      </ul>
      <ul>
        <li className={styles['help-container']}>
          <Button
            title={text.controls.help}
            className={styles.help}
            onClick={toggleHelp}
            disabled={!collections}
            testId="help-btn"
            toggle={false}
          >
            <FontAwesomeIcon icon={icon.faCircleQuestion} />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
