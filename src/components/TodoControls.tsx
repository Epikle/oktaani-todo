import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faShareNodes,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { deleteCollection, removeDoneItems } from '../context/todoSlice';
import {
  resetSelection,
  setSelectedCollectionEdit,
} from '../context/selectedSlice';

import styles from './TodoControls.module.scss';

const TodoControls: FC = () => {
  const selectedCollection = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();

  const deleteBtnHandler = () => {
    if (confirm('Are you sure?')) {
      dispatch(deleteCollection({ id: selectedCollection.id }));
      dispatch(resetSelection());
    }
  };

  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !selectedCollection.edit }));
  };

  const removeDoneBtnHandler = () => {
    dispatch(removeDoneItems({ id: selectedCollection.id }));
  };

  if (!selectedCollection.selected) return null;

  return (
    <ul className={styles.controls}>
      <li>
        <button
          aria-label="Remove done items"
          title="Remove done items"
          onClick={removeDoneBtnHandler}
        >
          <FontAwesomeIcon icon={faListCheck} />
        </button>
      </li>
      <li>
        <button aria-label="Share collection" title="Share collection">
          <FontAwesomeIcon icon={faShareNodes} />
        </button>
      </li>
      <li>
        <button
          aria-label="Edit collection title"
          title="Edit collection title"
          onClick={editBtnHandler}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </li>
      <li>
        <button
          className={styles.trash}
          aria-label="Remove collection"
          title="Remove collection"
          onClick={deleteBtnHandler}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </ul>
  );
};

export default TodoControls;
