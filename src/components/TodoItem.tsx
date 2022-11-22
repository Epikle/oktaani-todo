import { FC, useId, useState } from 'react';
import { toggleItemDone } from '../context/todoSlice';

import { useAppDispatch } from '../hooks/useRedux';
import { TItem } from '../types';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const id = useId();
  const [checked, isChecked] = useState(todo.done);
  const dispatch = useAppDispatch();

  const doneInputHandler = () => {
    dispatch(toggleItemDone({ id: todo.id }));
    isChecked((prevS) => !prevS);
  };

  return (
    <li className={styles['todo-item']}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={doneInputHandler}
        title={`Mark ${todo.text} as done`}
      />
      <label htmlFor={id}>{todo.text}</label>
    </li>
  );
};

export default TodoItem;
