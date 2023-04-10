import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPen, faShareNodes, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import useTodoStore from '../../context/useTodoStore';
import useSelectedStore from '../../context/useSelectedStore';
import type { TConfirm } from '../UI/Header';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: (type: TConfirm['type']) => void;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const title = useSelectedStore((state) => state.title);
  const color = useSelectedStore((state) => state.color);
  const edit = useSelectedStore((state) => state.edit);
  const shared = useSelectedStore((state) => state.shared);
  const type = useSelectedStore((state) => state.type);
  const id = useSelectedStore((state) => state.id);
  const hasDone = useSelectedStore((state) => state.hasDone);
  const { setSelectedCollection } = useSelectedStore((state) => state.actions);
  const { editCollection, removeDoneItems } = useTodoStore((state) => state.actions);

  const { text } = useLanguage();

  const removeDoneBtnHandler = async () => {
    setIsLoading(true);
    await removeDoneItems(id);
    setIsLoading(false);
  };

  const editBtnHandler = () => {
    setSelectedCollection({ edit: !edit });
  };

  const stopShareBtnHandler = async () => {
    const editedCollection = {
      id,
      title,
      color,
      type,
      shared: false,
    };
    setSelectedCollection({ id, title, color, shared: false });
    await editCollection(editedCollection);
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={removeDoneBtnHandler}
          disabled={!hasDone || isLoading}
          testId="remove-done-btn"
        >
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faListCheck} />}
        </Button>
      </li>
      <li>
        <Button
          className={shared ? styles.shared : ''}
          title={shared ? text.controls.stopShareCol : text.controls.shareCol}
          onClick={() => (shared ? stopShareBtnHandler() : onConfirm('share'))}
          testId="share-col-btn"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </Button>
      </li>
      <li>
        <Button
          title={text.controls.editCol}
          onClick={editBtnHandler}
          className={edit ? styles['edit-active'] : ''}
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
