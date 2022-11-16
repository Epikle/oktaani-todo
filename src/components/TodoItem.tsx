import { useId } from 'react';

import styles from './TodoItem.module.scss';

type Props = {
  text: string;
};

const TodoItem: React.FC<Props> = ({ text }) => {
  const id = useId();

  return (
    <li className={styles['todo-item']}>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{text}</label>
    </li>
  );
};

export default TodoItem;
