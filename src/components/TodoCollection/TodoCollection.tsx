import { FC, CSSProperties, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import type { TCollection } from '../../types';
import {
  resetSelection,
  setSelectedCollection,
} from '../../context/selectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import TodoItem from './TodoItem';

import styles from './TodoCollection.module.scss';

type Props = {
  collection: TCollection;
};

const TodoCollection: FC<Props> = ({ collection }) => {
  const { id, title, color, shared, created } = collection;
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);
  const { languageName } = useAppSelector((state) => state.settings);
  const isSelected = selectedCollection.id === collection.id;
  const parent = useRef<HTMLUListElement>(null);
  const { text } = useLanguage();

  const listStyles: CSSProperties = {
    borderColor: color,
  };
  const headingStyles: CSSProperties = {
    textDecorationColor: color,
  };

  const selectedCollectionHandler = () => {
    if (isSelected) {
      dispatch(resetSelection());
      return;
    }
    dispatch(setSelectedCollection({ id, title, color }));
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const doneTodos = collection.todos.filter((todo) => todo.done).length;
  const totalTodos = collection.todos.length;
  const showDone = totalTodos > 0 ? `${doneTodos}/${totalTodos}` : '';
  const articleStyles = selectedCollection.selected
    ? [styles.collection, styles.selected].join(' ')
    : styles.collection;

  const showCreated =
    isSelected && formatDate(created, languageName)
      ? `${text.collection.created} ${formatDate(created, languageName)}`
      : '';

  return (
    <article
      className={articleStyles}
      style={listStyles}
      data-done={showDone}
      data-created={showCreated}
    >
      <h2>
        <button onClick={selectedCollectionHandler} style={headingStyles}>
          {title}
        </button>
      </h2>
      <ul className={styles['item-list']} ref={parent}>
        {collection.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {shared && (
        <span className={styles.shared}>
          <FontAwesomeIcon icon={faShareNodes} />
        </span>
      )}
    </article>
  );
};

export default TodoCollection;
