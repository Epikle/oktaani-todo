import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import BtnRemoveDone from './BtnRemoveDone';
import BtnShare from './BtnShare';

import styles from './TodoControls.module.scss';
import BtnEdit from './BtnEdit';
import BtnDelete from './BtnDelete';

const TodoControls: FC = () => {
  const selectedCollection = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();

  if (!selectedCollection.selected) return null;

  return (
    <ul className={styles.controls}>
      <BtnRemoveDone
        selectedCollection={selectedCollection}
        dispatch={dispatch}
      />
      <BtnShare />
      <BtnEdit selectedCollection={selectedCollection} dispatch={dispatch} />
      <BtnDelete
        className={styles.trash}
        selectedCollection={selectedCollection}
        dispatch={dispatch}
      />
    </ul>
  );
};

export default TodoControls;
