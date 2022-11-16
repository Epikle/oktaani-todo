import { FC } from 'react';

import { TCollection } from '../types';
import TodoCollection from './TodoCollection';

import styles from './TodoList.module.scss';

type Props = {
  todos: TCollection[];
};

const TodoList: FC<Props> = ({ todos }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {todos.map((todo, index) => (
          <TodoCollection key={index} collection={todo} />
        ))}
      </div>
    </main>
  );
};

export default TodoList;
