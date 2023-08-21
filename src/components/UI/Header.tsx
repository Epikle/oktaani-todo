import { FC, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import autoAnimate from '@formkit/auto-animate';

import useSelectedStore from '../../context/useSelectedStore';
import TodoControls from '../TodoForm/TodoControls';
import TodoForm from '../TodoForm/TodoForm';
import Settings from './Settings';
import Confirm from './Confirm';
import useStatusStore from '../../context/useStatusStore';

import styles from './Header.module.scss';

export type TConfirm = {
  message: string;
  handler: () => void | Promise<void>;
  controller: AbortController;
} | null;

const Header: FC = () => {
  const parent = useRef(null);
  const [confirm, setConfirm] = useState<TConfirm>(null);
  const [loading, setLoading] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setError } = useStatusStore((state) => state.actions);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const confirmBtnHandler = async () => {
    if (!confirm) return;
    setLoading(true);
    try {
      await confirm.handler();
    } catch (error) {
      if (error instanceof AxiosError && error.name === 'CanceledError') return;
      // TODO lang
      setError('Something went wrong.');
    } finally {
      setConfirm(null);
      setLoading(false);
    }
  };

  const cancelBtnHandler = () => {
    confirm?.controller.abort();
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
          <Confirm
            confirmText={confirm.message}
            loading={loading}
            onConfirm={confirmBtnHandler}
            onCancel={cancelBtnHandler}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
