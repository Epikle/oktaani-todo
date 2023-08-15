import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSelectedStore from '../../context/useSelectedStore';
import { createSharedCollection } from '../../services/todo';
import useTodoStore from '../../context/useTodoStore';
import { copyToClipboard } from '../../utils/utils';
import TodoControls from '../TodoForm/TodoControls';
import useLanguage from '../../hooks/useLanguage';
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
  const { resetSelection } = useSelectedStore((state) => state.actions);
  const { deleteCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const deleteConfirmBtnHandler = () => {
    if (!selectedCollection) return;
    setIsLoading(true);
    deleteCollection(selectedCollection.id);
    resetSelection();
    setConfirm(null);
    setIsLoading(false);
  };

  const shareConfirmBtnHandler = async () => {
    if (!selectedCollection) return;
    setIsLoading(true);

    // TODO: useTodoStore
    await createSharedCollection(selectedCollection);
    await copyToClipboard(selectedCollection.id);
    // await editCollection(editedCollection);

    setConfirm(null);
    setIsLoading(false);
  };

  const confirmBtnHandler = (confirmType?: TConfirm['type']) => {
    switch (confirmType) {
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
          {!selectedCollection && <Settings />}
          {selectedCollection && <TodoControls onConfirm={confirmBtnHandler} />}
        </div>
        {!confirm && <TodoForm />}
        {confirm && (
          <Confirm
            confirmText={confirm.confirmText}
            onConfirm={confirm.handler}
            onCancel={confirmBtnHandler}
            isLoading={isLoading}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
