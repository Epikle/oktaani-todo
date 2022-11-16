import { FC } from 'react';

import TodoControls from '../TodoControls';
import TodoForm from '../TodoForm';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <h1>
              oktaani<strong>TODO</strong>
            </h1>
          </div>
          <TodoControls />
        </div>
        <TodoForm />
      </div>
    </header>
  );
};

export default Header;
