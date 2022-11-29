import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import TodoControls from '../TodoForm/TodoControls';
import TodoForm from '../TodoForm/TodoForm';
import { useAppSelector } from '../../hooks/useRedux';

import styles from './Header.module.scss';
import Settings from './Settings/Settings';

const Header: FC = () => {
  const { selected } = useAppSelector((state) => state.selected);
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
          {selected ? <TodoControls /> : <Settings />}
        </div>
        <TodoForm />
      </div>
    </header>
  );
};

export default Header;
