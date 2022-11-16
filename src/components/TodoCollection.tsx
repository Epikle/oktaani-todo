import { FC, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import TodoItem from './TodoItem';
import { TCollection } from '../types';

import styles from './TodoCollection.module.scss';

type Props = {
  collection: TCollection;
};

const TodoCollection: FC<Props> = ({ collection }) => {
  const listStyles: CSSProperties = {
    borderColor: collection.color,
  };

  const doneTodos = collection.todos.filter((todo) => todo.done).length;
  const totalTodos = collection.todos.length;

  return (
    <article
      className={styles.collection}
      style={listStyles}
      data-done={doneTodos}
      data-total={totalTodos}
    >
      <h2>{collection.title}</h2>
      <ul className={styles['item-list']}>
        {collection.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {collection.shared && (
        <span className={styles.shared}>
          <FontAwesomeIcon icon={faShareNodes} />
        </span>
      )}
    </article>
  );
};

export default TodoCollection;
