import { Dispatch, FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import type { TConfirm } from '../UI/Header';
import useSelectedStore from '../../context/useSelectedStore';
import { createSharedCollection } from '../../services/todo';
import { copyToClipboard } from '../../utils/utils';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: Dispatch<React.SetStateAction<Omit<TConfirm, 'type'> | null>>;
  onLoading: Dispatch<React.SetStateAction<boolean>>;
};

const TodoControls: FC<Props> = ({ onConfirm, onLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const items = useTodoStore((state) => state.items);
  const { deleteDoneItems, deleteCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  if (!selectedCollection) return null;

  const deleteDoneBtnHandler = () => {
    setIsLoading(true);
    deleteDoneItems(selectedCollection.id);
    setIsLoading(false);
  };

  const stopShareBtnHandler = async () => {
    // TODO
    // await editCollection(editedCollection);
  };

  const deleteConfirmBtnHandler = () => {
    if (!selectedCollection) return;
    setIsLoading(true);
    deleteCollection(selectedCollection.id);
    resetSelection();
    onConfirm(null);
    setIsLoading(false);
  };

  const shareConfirmBtnHandler = async () => {
    if (!selectedCollection) return;
    onLoading(true);

    // TODO: useTodoStore
    await createSharedCollection(selectedCollection);
    await copyToClipboard(selectedCollection.id);
    // await editCollection(editedCollection);

    onConfirm(null);
    onLoading(false);
  };

  const confirmBtnHandler = (confirmType?: TConfirm['type']) => {
    switch (confirmType) {
      case 'delete':
        onConfirm({
          confirmText: text.controls.deleteConfirm,
          handler: deleteConfirmBtnHandler,
        });
        return;
      case 'share':
        onConfirm({
          confirmText: text.controls.shareConfirm,
          handler: shareConfirmBtnHandler,
        });
        return;
      default:
        onConfirm(null);
    }
  };

  const doneItems = items && items.filter((i) => i.colId === selectedCollection?.id && i.status).length > 0;

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={deleteDoneBtnHandler}
          disabled={isLoading || !doneItems}
          testId="remove-done-btn"
        >
          {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
          {!isLoading && <FontAwesomeIcon icon={faListCheck} />}
        </Button>
      </li>
      <li>
        <Button
          className={selectedCollection.shared ? styles.shared : ''}
          title={selectedCollection.shared ? text.controls.stopShareCol : text.controls.shareCol}
          onClick={() => (selectedCollection.shared ? stopShareBtnHandler() : confirmBtnHandler('share'))}
          testId="share-col-btn"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </Button>
      </li>
      <li>
        <Button
          title={text.controls.editCol}
          onClick={() => setSelectedCollection({ id: selectedCollection.id, edit: !selectedCollection.edit })}
          className={selectedCollection.edit ? styles['edit-active'] : ''}
          testId="edit-collection-title-btn"
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </li>
      <li>
        <Button
          title={text.controls.removeCol}
          onClick={() => confirmBtnHandler('delete')}
          className={styles.trash}
          testId="delete-collection-btn"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </li>
    </ul>
  );
};

export default TodoControls;
