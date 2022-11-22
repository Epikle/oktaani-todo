import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faShareNodes,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { deleteCollection } from '../context/todoSlice';
import { resetSelection } from '../context/selectedSlice';

import styles from './TodoControls.module.scss';

const TodoControls: FC = () => {
  const selectedCollection = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();

  const deleteBtnHandler = () => {
    dispatch(deleteCollection({ id: selectedCollection.id }));
    dispatch(resetSelection());
  };

  if (!selectedCollection.selected) return null;

  return (
    <ul className={styles.controls}>
      <li>
        <button aria-label="Remove done items" title="Remove done items">
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
