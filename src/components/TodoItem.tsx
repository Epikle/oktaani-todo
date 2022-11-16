import { FC, useId, useState } from 'react';
import { TItem } from '../types';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const id = useId();
  const [checked, isChecked] = useState(todo.done);

  return (
    <li className={styles['todo-item']}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => isChecked((prevS) => !prevS)}
      />
      <label htmlFor={id}>{todo.text}</label>
    </li>
  );
};

export default TodoItem;
