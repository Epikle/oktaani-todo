import { FC, CSSProperties } from 'react';

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

  return (
    <article
      className={styles.collection}
      style={listStyles}
      data-done="1"
      data-total="3"
    >
      <h2>{collection.title}</h2>
      <ul className={styles['item-list']}>
        {collection.todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
    </article>
  );
};

export default TodoCollection;
