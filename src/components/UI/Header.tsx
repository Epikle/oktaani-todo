import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSelectedStore from '../../context/useSelectedStore';
import TodoControls from '../TodoForm/TodoControls';
import TodoForm from '../TodoForm/TodoForm';
import Settings from './Settings/Settings';
import Confirm from './Confirm';

import styles from './Header.module.scss';

export type TConfirm = {
  type: 'share' | 'delete';
  confirmText: string;
  handler: () => void;
};

const Header: FC = () => {
  const parent = useRef(null);
  const [confirm, setConfirm] = useState<Omit<TConfirm, 'type'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

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
          {selectedCollection && <TodoControls onConfirm={setConfirm} onLoading={setIsLoading} />}
        </div>
        {!confirm && <TodoForm />}
        {confirm && (
          <Confirm
            confirmText={confirm.confirmText}
            onConfirm={confirm.handler}
            onCancel={() => setConfirm(null)}
            isLoading={isLoading}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
