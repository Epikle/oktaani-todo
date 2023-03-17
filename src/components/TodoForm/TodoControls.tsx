import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faPen,
  // faShareNodes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { removeDoneItems } from '../../context/todoSlice';
import { setSelectedCollectionEdit } from '../../context/selectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';

import styles from './TodoControls.module.scss';

type Props = {
  onDelete: () => void;
};

const TodoControls: FC<Props> = ({ onDelete }) => {
  const { id, edit, hasDone } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  const removeDoneBtnHandler = () => {
    dispatch(removeDoneItems({ id }));
  };

  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !edit }));
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={removeDoneBtnHandler}
          content={<FontAwesomeIcon icon={faListCheck} />}
          disabled={!hasDone}
          testId="remove-done-btn"
        />
      </li>
      {/* <li>
        <Button
          disabled
          title={text.controls.shareCol}
          content={<FontAwesomeIcon icon={faShareNodes} />}
        />
      </li> */}
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
          onClick={onDelete}
          className={styles.trash}
          content={<FontAwesomeIcon icon={faTrash} />}
          testId="delete-collection-btn"
        />
      </li>
    </ul>
  );
};

export default TodoControls;
