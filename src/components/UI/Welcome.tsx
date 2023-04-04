import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faListCheck, faPen, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import useLanguage from '../../hooks/useLanguage';

import styles from './Welcome.module.scss';

const Welcome: FC = () => {
  const { text } = useLanguage();
  return (
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
          <ul className={styles.controls} data-testid="todo-controls">
            <li>
              <Button title={text.controls.removeDone} content={<FontAwesomeIcon icon={faListCheck} />} disabled />
            </li>
            <li>
              <Button title={text.controls.shareCol} content={<FontAwesomeIcon icon={faShareNodes} />} disabled />
            </li>
            <li>
              <Button title={text.controls.editCol} content={<FontAwesomeIcon icon={faPen} />} disabled />
            </li>
            <li>
              <Button
                title={text.controls.removeCol}
                className={styles.trash}
                content={<FontAwesomeIcon icon={faTrash} />}
                disabled
              />
            </li>
            <li>
              <Button title={text.controls.settings} content={<FontAwesomeIcon icon={faGear} />} />
            </li>
          </ul>
        </div>
        <div>
          <h4>Add new collection</h4>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
