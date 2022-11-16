import { FC } from 'react';

import { TCollection } from '../types';
import TodoCollection from './TodoCollection';
import TodoControls from './TodoControls';

import styles from './TodoList.module.scss';

type Props = {
  todos: TCollection[];
};

const TodoList: FC<Props> = ({ todos }) => {
  return (
    <main className={styles.main}>
      <TodoControls />
      {todos.map((todo, index) => (
        <TodoCollection key={index} collection={todo} />
      ))}
    </main>
  );
};

export default TodoList;
