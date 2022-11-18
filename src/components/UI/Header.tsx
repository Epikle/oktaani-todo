import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import TodoControls from '../TodoControls';
import TodoForm from '../TodoForm';

import styles from './Header.module.scss';

const Header: FC = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.row} ref={parent}>
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
