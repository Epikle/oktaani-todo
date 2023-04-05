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
              <Button
                data-language="en-us"
                className={styles.language}
                content={<FontAwesomeIcon icon={faEarthAmericas} />}
              />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faSun} />} />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faArrowDownShortWide} />} />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faGear} />} disabled />
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
              <Button content={<FontAwesomeIcon icon={faListCheck} />} />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faShareNodes} />} />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faPen} />} />
            </li>
            <li>
              <Button content={<FontAwesomeIcon icon={faTrash} />} />
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
          <Button className={styles.add} disabled content={<FontAwesomeIcon icon={faPlus} />} testId="submit-btn" />
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
