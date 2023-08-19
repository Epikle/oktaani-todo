import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSelectedStore from '../../context/useSelectedStore';
import TodoControls from '../TodoForm/TodoControls';
import TodoForm from '../TodoForm/TodoForm';
import Settings from './Settings';

import styles from './Header.module.scss';
import Confirm from './Confirm';

export type TConfirm = {
  message: string;
  handler: () => void;
} | null;

const Header: FC = () => {
  const parent = useRef(null);
  const [confirm, setConfirm] = useState<TConfirm>(null);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const confirmBtnHandler = () => {
    if (!confirm) return;
    confirm.handler();
    setConfirm(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container} ref={parent}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <h1>
              oktaani<strong>TODO</strong>
            </h1>
          </div>
          {!selectedCollection && <Settings />}
          {selectedCollection && <TodoControls onConfirm={setConfirm} />}
        </div>
        {!confirm && <TodoForm />}
        {confirm && (
          <Confirm confirmText={confirm.message} onConfirm={confirmBtnHandler} onCancel={() => setConfirm(null)} />
        )}
      </div>
    </header>
  );
};

export default Header;
