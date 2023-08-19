import { Dispatch, FC, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { Button, ButtonToggle } from '../UI/Button';
import { type TConfirm } from '../UI/Header';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: Dispatch<SetStateAction<TConfirm>>;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const items = useTodoStore((state) => state.items);
  const { deleteDoneItems, deleteCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  if (!selectedCollection) return null;

  const doneItems = items && items.filter((i) => i.colId === selectedCollection?.id && i.status).length > 0;

  const deleteCollectionBtnHandler = () => {
    onConfirm({
      message: text.controls.deleteConfirm,
      handler: () => {
        deleteCollection(selectedCollection.id);
        resetSelection();
      },
    });
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={() => deleteDoneItems(selectedCollection.id)}
          disabled={!doneItems}
          testId="remove-done-btn"
        >
          <FontAwesomeIcon icon={faListCheck} />
        </Button>
      </li>
      <li>
        <ButtonToggle
          title={selectedCollection.shared ? text.controls.stopShareCol : text.controls.shareCol}
          onChange={() => {}}
          testId="share-col-btn"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </ButtonToggle>
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
