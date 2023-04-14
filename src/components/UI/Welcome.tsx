import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownShortWide,
  faEarthAmericas,
  faGear,
  faListCheck,
  faPen,
  faPlus,
  faShareNodes,
  faSun,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import Button from './Button';
import { DEFAULT_COLOR } from '../TodoForm/TodoForm';

import styles from './Welcome.module.scss';

const Welcome: FC = () => {
  const { text } = useLanguage();

  return (
    <div className={styles.welcome}>
      <h2>{text.welcome.header}</h2>
      <p>{text.welcome.bodyText}</p>
      <div className={styles.how}>
        <h3>{text.welcome.howToUse}</h3>
        <div className={styles['help-settings']}>
          <div>
            <h4>{text.welcome.generalSettings}</h4>
            <ul className={styles.controls}>
              <li>
                <Button data-language="en-us" className={styles.language} title={text.controls.language}>
                  <FontAwesomeIcon icon={faEarthAmericas} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.changeColorMode}>
                  <FontAwesomeIcon icon={faSun} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.sort}>
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.settings} disabled>
                  <FontAwesomeIcon icon={faGear} />
                </Button>
              </li>
            </ul>

            <div className={styles['help-desc']}>
              <div>
                <div>{text.controls.sort}</div>
                {text.controls.changeColorMode}
              </div>
              {text.controls.language}
            </div>
          </div>
          <div>
            <h4>{text.welcome.collectionControls}</h4>

            <ul className={styles.controls}>
              <li>
                <Button title={text.controls.removeDone}>
                  <FontAwesomeIcon icon={faListCheck} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.shareCol}>
                  <FontAwesomeIcon icon={faShareNodes} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.editCol}>
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </li>
              <li>
                <Button title={text.controls.removeCol}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </li>
            </ul>
            <div className={styles['help-desc']}>
              <div>
                <div>
                  <div>{text.controls.removeCol}</div>
                  {text.controls.editCol}
                </div>
                {text.controls.shareCol}
              </div>
              {text.controls.removeDone}
            </div>
          </div>
        </div>
        <div>
          <h4>{text.header.newCollection}</h4>
          <form className={styles.form}>
            <input
              type="color"
              title={text.header.setColorTitle}
              className={styles['color-picker']}
              defaultValue={DEFAULT_COLOR}
              disabled
            />
            <input
              type="text"
              title={text.welcome.titleHere}
              className={styles.todo}
              placeholder={text.welcome.titleHere}
              disabled
            />
            <Button className={styles.add} title={text.welcome.saveColItem} disabled>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </form>
          <div className={styles['help-input-desc']}>
            <div>
              <div className={styles.right}>{text.welcome.saveColItem}</div>
              {text.welcome.titleHere}
            </div>
            {text.header.setColorTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
