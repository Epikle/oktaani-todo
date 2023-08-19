import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import useSelectedStore from '../../../context/useSelectedStore';
import useTodoStore from '../../../context/useTodoStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../../UI/Button';

import styles from './TodoControls.module.scss';
import Confirm from '../../UI/Confirm';

type Props = {
  onConfirm: Dispatch<SetStateAction<ReactNode>>;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
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

  // TODO not good
  const deleteCollectionBtnHandler = () => {
    if (!selectedCollection) return;
    onConfirm(
      <Confirm
        confirmText={text.controls.deleteConfirm}
        onConfirm={() => {
          deleteCollection(selectedCollection.id);
          resetSelection();
          onConfirm(null);
        }}
        onCancel={() => onConfirm(null)}
      />,
    );
  };

  const shareBtnHandler = () => {};

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
          onClick={shareBtnHandler}
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
          onClick={deleteCollectionBtnHandler}
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
