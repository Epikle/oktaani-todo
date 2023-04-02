import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faPen,
  faShareNodes,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { editCollection, removeDoneItems } from '../../context/todoSlice';
import {
  setSelectedCollection,
  setSelectedCollectionEdit,
} from '../../context/selectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';
import type { TConfirm } from '../UI/Header';

import styles from './TodoControls.module.scss';

type Props = {
  onConfirm: (type: TConfirm['type']) => void;
};

const TodoControls: FC<Props> = ({ onConfirm }) => {
  const { id, edit, hasDone, shared, title, color } = useAppSelector(
    (state) => state.selected,
  );
  const dispatch = useAppDispatch();
  const { text } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const removeDoneBtnHandler = async () => {
    setIsLoading(true);
    await dispatch(removeDoneItems(id));
    setIsLoading(false);
  };

  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !edit }));
  };

  const stopShareBtnHandler = async () => {
    const editedCollection = {
      id,
      title,
      color,
      shared: false,
    };
    dispatch(setSelectedCollection({ id, title, color, shared: false }));
    await dispatch(editCollection(editedCollection));
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={removeDoneBtnHandler}
          content={
            isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              <FontAwesomeIcon icon={faListCheck} />
            )
          }
          disabled={!hasDone || isLoading}
          testId="remove-done-btn"
        />
      </li>
      <li>
        <Button
          className={shared ? styles.shared : ''}
          title={shared ? text.controls.stopShareCol : text.controls.shareCol}
          onClick={() => (shared ? stopShareBtnHandler() : onConfirm('share'))}
          content={<FontAwesomeIcon icon={faShareNodes} />}
          testId="share-col-btn"
        />
      </li>
      <li>
        <Button
          title={text.controls.editCol}
          onClick={editBtnHandler}
          content={<FontAwesomeIcon icon={faPen} />}
          className={edit ? styles['edit-active'] : ''}
          testId="edit-collection-title-btn"
        />
      </li>
      <li>
        <Button
          title={text.controls.removeCol}
          onClick={() => onConfirm('delete')}
          className={styles.trash}
          content={<FontAwesomeIcon icon={faTrash} />}
          testId="delete-collection-btn"
        />
      </li>
    </ul>
  );
};

export default TodoControls;
