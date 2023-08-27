import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { cn } from '../../utils/utils';
import { Button, ButtonToggle } from './Button';

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
              <ButtonToggle
                title={text.controls.sort}
                className={styles.sort}
                onChange={toggleSort}
                disabled={!showSettings || !collections}
              >
                <FontAwesomeIcon icon={icon.faArrowDownShortWide} />
              </ButtonToggle>
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
          <ButtonToggle
            title={text.controls.settings}
            className={styles.gear}
            onChange={() => setShowSettings(!showSettings)}
            testId="btn-settings"
          >
            <FontAwesomeIcon icon={icon.faGear} />
          </ButtonToggle>
        </li>
      </ul>
      <ul>
        <li className={styles['help-container']}>
          <ButtonToggle
            title={text.controls.help}
            className={styles.help}
            onChange={toggleHelp}
            disabled={!collections}
          >
            <FontAwesomeIcon icon={icon.faCircleQuestion} />
          </ButtonToggle>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
