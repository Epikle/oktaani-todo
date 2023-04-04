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

const Welcome: FC = () => (
  <div className={styles.welcome}>
    <h2>Welcome to oktaaniTODO!</h2>
    <p>
      We are excited to introduce you to our powerful task management tool that will help you stay organized and
      productive. Our app has a number of great features that will make managing your tasks easier and more efficient
      than ever before.
    </p>
    <h3>How to use?</h3>
    <div className={styles.how}>
      <div>
        <h4>Settings</h4>
        <ul className={styles.controls}>
          <li>
            <Button
              data-language="en-us"
              className={styles.language}
              disabled
              content={<FontAwesomeIcon icon={faEarthAmericas} />}
            />
          </li>
          <li>
            <Button disabled content={<FontAwesomeIcon icon={faSun} />} />
          </li>
          <li>
            <Button disabled content={<FontAwesomeIcon icon={faArrowDownShortWide} />} />
          </li>
          <li>
            <Button content={<FontAwesomeIcon icon={faGear} />} />
          </li>
        </ul>

        <h4>Edit Collection</h4>

        <ul className={styles.controls}>
          <li>
            <Button content={<FontAwesomeIcon icon={faListCheck} />} disabled />
          </li>
          <li>
            <Button content={<FontAwesomeIcon icon={faShareNodes} />} disabled />
          </li>
          <li>
            <Button content={<FontAwesomeIcon icon={faPen} />} disabled />
          </li>
          <li>
            <Button content={<FontAwesomeIcon icon={faTrash} />} disabled />
          </li>
        </ul>
      </div>
      <div>
        <h4>Add new collection</h4>
        <form className={styles.form}>
          <input type="color" className={styles['color-picker']} defaultValue={DEFAULT_COLOR} disabled />
          <input type="text" className={styles.todo} placeholder="Set collection title" disabled />
          <Button className={styles.add} disabled content={<FontAwesomeIcon icon={faPlus} />} testId="submit-btn" />
        </form>
      </div>
    </div>
  </div>
);

export default Welcome;
