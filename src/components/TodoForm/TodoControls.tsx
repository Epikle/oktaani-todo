import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import type { TConfirm } from '../UI/Header';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: (type: TConfirm['type']) => void;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection } = useSelectedStore((state) => state.actions);
  const items = useTodoStore((state) => state.items);
  const { deleteDoneItems } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  const deleteDoneBtnHandler = () => {
    if (!selectedCollection) return;
    setIsLoading(true);
    deleteDoneItems(selectedCollection.id);
    setIsLoading(false);
  };

  const editBtnHandler = () => {
    if (!selectedCollection) return;
    setSelectedCollection({ id: selectedCollection.id, edit: !selectedCollection.edit });
  };

  const stopShareBtnHandler = async () => {
    // await editCollection(editedCollection);
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
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faListCheck} />}
        </Button>
      </li>
      <li>
        <Button
          className={selectedCollection?.shared ? styles.shared : ''}
          title={selectedCollection?.shared ? text.controls.stopShareCol : text.controls.shareCol}
          onClick={() => (selectedCollection?.shared ? stopShareBtnHandler() : onConfirm('share'))}
          testId="share-col-btn"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </Button>
      </li>
      <li>
        <Button
          title={text.controls.editCol}
          onClick={editBtnHandler}
          className={selectedCollection?.edit ? styles['edit-active'] : ''}
          testId="edit-collection-title-btn"
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </li>
      <li>
        <Button
          title={text.controls.removeCol}
          onClick={() => onConfirm('delete')}
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
