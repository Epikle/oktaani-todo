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

import Button from './Button';
import { DEFAULT_COLOR } from '../TodoForm/TodoForm';

import styles from './Welcome.module.scss';

// TODO: LANGUAGES
const Welcome: FC = () => (
  <div className={styles.welcome}>
    <h2>Welcome to oktaaniTODO!</h2>
    <p>
      We are excited to introduce you to our powerful task management tool that will help you stay organized and
      productive. Our app has a number of great features that will make managing your tasks easier and more efficient
      than ever before.
    </p>
    <div className={styles.how}>
      <h3>How to use?</h3>
      <div className={styles['help-settings']}>
        <div>
          <h4>General Settings</h4>
          <ul className={styles.controls}>
            <li>
              <Button data-language="en-us" className={styles.language}>
                <FontAwesomeIcon icon={faEarthAmericas} />
              </Button>
            </li>
            <li>
              <Button>
                <FontAwesomeIcon icon={faSun} />
              </Button>
            </li>
            <li>
              <Button>
                <FontAwesomeIcon icon={faArrowDownShortWide} />
              </Button>
            </li>
            <li>
              <Button disabled>
                <FontAwesomeIcon icon={faGear} />
              </Button>
            </li>
          </ul>

          <div className={styles['help-desc']}>
            <div>
              <div>Sort Collections</div>
              Select Normal/dark mode
            </div>
            Select Language
          </div>
        </div>
        <div>
          <h4>Collection Controls</h4>

          <ul className={styles.controls}>
            <li>
              <Button>
                <FontAwesomeIcon icon={faListCheck} />
              </Button>
            </li>
            <li>
              <Button>
                <FontAwesomeIcon icon={faShareNodes} />
              </Button>
            </li>
            <li>
              <Button>
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </li>
            <li>
              <Button>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </li>
          </ul>
          <div className={styles['help-desc']}>
            <div>
              <div>
                <div>Delete Collection</div>
                Edit Title
              </div>
              Share Collection
            </div>
            Remove Done Items
          </div>
        </div>
      </div>
      <div>
        <h4>Add new collection</h4>
        <form className={styles.form}>
          <input type="color" className={styles['color-picker']} defaultValue={DEFAULT_COLOR} disabled />
          <input type="text" className={styles.todo} placeholder="Set collection title here" disabled />
          <Button className={styles.add} disabled>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </form>
        <div className={styles['help-input-desc']}>
          <div>
            <div className={styles.right}>Save Collection or Item</div>
            Set Collection or Item Title Here
          </div>
          Choose Collection Color
        </div>
      </div>
    </div>
  </div>
);

export default Welcome;
