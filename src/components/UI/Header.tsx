import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { deleteCollection } from '../../context/todoSlice';
import { resetSelection } from '../../context/selectedSlice';
import useLanguage from '../../hooks/useLanguage';
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
  const [confirm, setConfirm] = useState<Omit<TConfirm, 'type'> | null>(null);
  const parent = useRef(null);
  const { selected, id } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const deleteConfirmBtnHandler = () => {
    dispatch(deleteCollection({ id }));
    dispatch(resetSelection());
    setConfirm(null);
  };

  const shareConfirmBtnHandler = () => {
    setConfirm(null);
  };

  const confirmBtnHandler = (type?: TConfirm['type']) => {
    switch (type) {
      case 'delete':
        setConfirm({
          confirmText: text.controls.deleteConfirm,
          handler: deleteConfirmBtnHandler,
        });
        return;
      case 'share':
        setConfirm({
          confirmText: text.controls.shareConfirm,
          handler: shareConfirmBtnHandler,
        });
        return;
      default:
        setConfirm(null);
    }
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
          {selected ? (
            <TodoControls onConfirm={confirmBtnHandler} />
          ) : (
            <Settings />
          )}
        </div>
        {confirm ? (
          <Confirm
            confirmText={confirm.confirmText}
            onConfirm={confirm.handler}
            onCancel={confirmBtnHandler}
          />
        ) : (
          <TodoForm />
        )}
      </div>
    </header>
  );
};

export default Header;
