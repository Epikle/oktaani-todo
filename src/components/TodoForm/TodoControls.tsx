import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import { createStatsByType } from '../../services/stats';
import { createSharedCollection, deleteSharedCollection, deleteSharedDoneItems } from '../../services/todo';
import useStatusStore from '../../context/useStatusStore';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { Button, ButtonToggle } from '../UI/Button';
import { type TConfirm } from '../UI/Header';
import { cn } from '../../utils/utils';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: Dispatch<SetStateAction<TConfirm>>;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const { setError } = useStatusStore((state) => state.actions);
  const items = useTodoStore((state) => state.items);
  const { deleteDoneItems, deleteCollection, updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  if (!selectedCollection) return null;

  const doneItems = items && items.filter((i) => i.colId === selectedCollection.id && i.status).length > 0;
  const filteredItems = items && items.filter((i) => i.colId === selectedCollection.id);
  const selectedColItems = filteredItems?.length && filteredItems.length > 0 ? filteredItems : null;

  const shareCollectionBtnHandler = async () => {
    setIsLoadingShare(true);
    if (selectedCollection.shared) {
      await deleteSharedCollection(selectedCollection.id);
      updateCollection({ id: selectedCollection.id, shared: false });
      setSelectedCollection({ id: selectedCollection.id, edit: false });
    } else {
      const sharedData = {
        col: { ...selectedCollection, shared: true },
        items: selectedColItems,
        note: null,
      };
      const controller = new AbortController();
      onConfirm({
        controller,
        message: text.controls.shareConfirm,
        handler: async () => {
          await createSharedCollection(sharedData, controller.signal);
          updateCollection({ id: selectedCollection.id, shared: true });
          setSelectedCollection({ id: selectedCollection.id, edit: false });
          createStatsByType('shareCollection');
        },
      });
    }
    setIsLoadingShare(false);
  };

  const deleteCollectionBtnHandler = () => {
    const controller = new AbortController();
    onConfirm({
      controller,
      message: text.controls.deleteConfirm,
      handler: async () => {
        if (selectedCollection.shared) {
          await deleteSharedCollection(selectedCollection.id, controller.signal);
        }
        deleteCollection(selectedCollection.id);
        resetSelection();
      },
    });
  };

  const deleteDoneBtnHandler = async () => {
    setIsLoadingDelete(true);
    deleteDoneItems(selectedCollection.id);
    if (selectedCollection.shared) {
      try {
        await deleteSharedDoneItems(selectedCollection.id);
      } catch (error) {
        setError(text.errors.default);
      }
    }
    setIsLoadingDelete(false);
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={deleteDoneBtnHandler}
          disabled={!doneItems || isLoadingDelete}
          testId="remove-done-btn"
        >
          {isLoadingDelete ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faListCheck} />}
        </Button>
      </li>
      <li>
        <Button
          title={selectedCollection.shared ? text.controls.stopShareCol : text.controls.shareCol}
          className={cn({ [styles.shared]: selectedCollection.shared })}
          onClick={shareCollectionBtnHandler}
          testId="share-col-btn"
          disabled={selectedCollection.type === 'note' || isLoadingShare}
        >
          {isLoadingShare ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faShareNodes} />}
        </Button>
      </li>
      <li>
        <ButtonToggle
          title={text.controls.editCol}
          onChange={() => setSelectedCollection({ id: selectedCollection.id, edit: !selectedCollection.edit })}
          testId="edit-collection-title-btn"
          checked={selectedCollection.edit}
        >
          <FontAwesomeIcon icon={faPen} />
        </ButtonToggle>
      </li>
      <li>
        <Button
          title={text.controls.removeCol}
          className={styles.trash}
          onClick={deleteCollectionBtnHandler}
          testId="delete-collection-btn"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </li>
    </ul>
  );
};

export default TodoControls;
