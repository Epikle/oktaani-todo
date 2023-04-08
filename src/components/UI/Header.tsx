import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { createSharedCollection } from '../../services/todo';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { copyToClipboard } from '../../utils/utils';
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
  const { collections, deleteCollection, editCollection } = useTodoStore();
  const { text } = useLanguage();

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const deleteConfirmBtnHandler = async () => {
    setIsLoading(true);
    await deleteCollection({ id, shared });
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
      await copyToClipboard(id);
      const editedCollection = {
        id,
        title,
        color,
        shared: true,
      };
      await editCollection(editedCollection);
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
