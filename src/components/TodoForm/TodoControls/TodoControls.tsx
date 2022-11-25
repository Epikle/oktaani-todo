import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import BtnRemoveDone from './BtnRemoveDone';
import BtnShare from './BtnShare';

import styles from './TodoControls.module.scss';
import BtnEdit from './BtnEdit';
import BtnDelete from './BtnDelete';

const TodoControls: FC = () => {
  const { selected, id, edit } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();

  if (!selected) return null;

  return (
    <ul className={styles.controls}>
      <BtnRemoveDone collectionId={id} dispatch={dispatch} />
      <BtnShare />
      <BtnEdit collectionEdit={edit} dispatch={dispatch} />
      <BtnDelete
        className={styles.trash}
        collectionId={id}
        dispatch={dispatch}
      />
    </ul>
  );
};

export default TodoControls;
