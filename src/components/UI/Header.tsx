import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { deleteCollectionById, editCollection } from '../../context/todoSlice';
import { createSharedCollection } from '../../services/todo';
import useSelectedStore from '../../context/useSelectedStore';
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
  const parent = useRef(null);
  const [confirm, setConfirm] = useState<Omit<TConfirm, 'type'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { title, color, selected, id, shared, setSelectedCollection, resetSelection } = useSelectedStore();
  const { text } = useLanguage();
  // TODO: Zustand
  const collections = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const deleteConfirmBtnHandler = async () => {
    setIsLoading(true);
    await dispatch(deleteCollectionById({ id, shared }));
    resetSelection();
    setConfirm(null);
    setIsLoading(false);
  };

  const shareConfirmBtnHandler = async () => {
    const selectedCollection = collections.find((collection) => collection.id === id);
    if (!selectedCollection) return;
    setIsLoading(true);
    try {
      await createSharedCollection(selectedCollection);
      // TODO: Better way to copy and show share link
      await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}?share=${id}`);
      const editedCollection = {
        id,
        title,
        color,
        shared: true,
      };
      await dispatch(editCollection(editedCollection));
      setSelectedCollection(editedCollection);
    } catch (error) {
      // TODO: error handling
    }

    setConfirm(null);
    setIsLoading(false);
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
          {selected ? <TodoControls onConfirm={confirmBtnHandler} /> : <Settings />}
        </div>
        {confirm ? (
          <Confirm
            confirmText={confirm.confirmText}
            onConfirm={confirm.handler}
            onCancel={confirmBtnHandler}
            isLoading={isLoading}
          />
        ) : (
          <TodoForm />
        )}
      </div>
    </header>
  );
};

export default Header;
