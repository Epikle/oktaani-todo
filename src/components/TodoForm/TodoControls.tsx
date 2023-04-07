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
  const { id, edit, hasDone, shared, title, color, setSelectedCollection } = useSelectedStore();
  const { removeDoneItems, editCollection } = useTodoStore();
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
