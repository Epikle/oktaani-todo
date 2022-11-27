import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faPen,
  faShareNodes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../UI/Button';
import { deleteCollection, removeDoneItems } from '../../context/todoSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  resetSelection,
  setSelectedCollectionEdit,
} from '../../context/selectedSlice';

import styles from './TodoControls.module.scss';

const TodoControls: FC = () => {
  const { selected, id, edit } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();

  const removeDoneBtnHandler = () => {
    dispatch(removeDoneItems({ id }));
  };
  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !edit }));
  };

  const deleteBtnHandler = () => {
    if (confirm('Are you sure?')) {
      dispatch(deleteCollection({ id }));
      dispatch(resetSelection());
    }
  };

  if (!selected) return null;
  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title="Remove done items"
          onClick={removeDoneBtnHandler}
          content={<FontAwesomeIcon icon={faListCheck} />}
        />
      </li>
      <li>
        <Button
          title="Share collection"
          content={<FontAwesomeIcon icon={faShareNodes} />}
        />
      </li>
      <li>
        <Button
          title="Edit collection title"
          onClick={editBtnHandler}
          content={<FontAwesomeIcon icon={faPen} />}
        />
      </li>
      <li>
        <Button
          title="Remove collection"
          onClick={deleteBtnHandler}
          className={styles.trash}
          content={<FontAwesomeIcon icon={faTrash} />}
        />
      </li>
    </ul>
  );
};

export default TodoControls;
