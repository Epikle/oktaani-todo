import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faPen,
  // faShareNodes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { deleteCollection, removeDoneItems } from '../../context/todoSlice';
import {
  resetSelection,
  setSelectedCollectionEdit,
} from '../../context/selectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';

import styles from './TodoControls.module.scss';

const TodoControls: FC = () => {
  const { id, edit } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  const removeDoneBtnHandler = () => {
    dispatch(removeDoneItems({ id }));
  };
  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !edit }));
  };

  const deleteBtnHandler = () => {
    if (confirm(text.controls.deleteConfirm)) {
      dispatch(deleteCollection({ id }));
      dispatch(resetSelection());
    }
  };

  return (
    <ul className={styles.controls} data-testid="todo-controls">
      <li>
        <Button
          title={text.controls.removeDone}
          onClick={removeDoneBtnHandler}
          content={<FontAwesomeIcon icon={faListCheck} />}
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
        />
      </li>
      <li>
        <Button
          title={text.controls.removeCol}
          onClick={deleteBtnHandler}
          className={styles.trash}
          content={<FontAwesomeIcon icon={faTrash} />}
        />
      </li>
    </ul>
  );
};

export default TodoControls;
