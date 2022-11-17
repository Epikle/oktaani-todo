import { FC, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import TodoItem from './TodoItem';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { TCollection } from '../types';

import styles from './TodoCollection.module.scss';
import {
  resetSelection,
  setSelectedCollection,
} from '../context/selectedSlice';

type Props = {
  collection: TCollection;
};

const TodoCollection: FC<Props> = ({ collection }) => {
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);
  const isSelected = selectedCollection.id === collection.id;

  const listStyles: CSSProperties = {
    borderColor: collection.color,
  };

  const headingStyles: CSSProperties = {
    textDecorationColor: collection.color,
  };

  const selectedCollectionHandler = () => {
    if (isSelected) {
      dispatch(resetSelection());
      return;
    }

    const { id, title, color } = collection;
    dispatch(setSelectedCollection({ id, title, color }));
  };

  const doneTodos = collection.todos.filter((todo) => todo.done).length;
  const totalTodos = collection.todos.length;
  const showDone = totalTodos > 0 ? `${doneTodos}/${totalTodos}` : '';

  return (
    <article
      className={styles.collection}
      style={listStyles}
      data-done={showDone}
    >
      <h2>
        <button onClick={selectedCollectionHandler} style={headingStyles}>
          {collection.title}
        </button>
      </h2>
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
