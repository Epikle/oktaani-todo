import { FC, CSSProperties, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { ItemTypes, TCollection } from '../../types';
import {
  resetSelection,
  setHasDone,
  setSelectedCollection,
} from '../../context/selectedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import TodoItem from './TodoItem';

import styles from './TodoCollection.module.scss';

type Props = {
  collection: TCollection;
  index: number;
  moveCollection: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const TodoCollection: FC<Props> = ({ collection, index, moveCollection }) => {
  const { id, title, color, shared, created } = collection;
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);
  const { languageName } = useAppSelector((state) => state.settings);
  const isSelected = selectedCollection.id === collection.id;
  const isEditing = selectedCollection.edit;
  const parent = useRef<HTMLUListElement>(null);
  const { text } = useLanguage();

  const ref = useRef<HTMLElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.COLLECTION,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCollection(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: ItemTypes.COLLECTION,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

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

    dispatch(setHasDone(!!doneTodos));
    dispatch(setSelectedCollection({ id, title, color }));
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const doneTodos = collection.todos.filter((todo) => todo.done).length;
  const totalTodos = collection.todos.length;
  const showDone = totalTodos > 0 ? `${doneTodos}/${totalTodos}` : '';
  const articleStyles = isSelected
    ? [styles.collection, styles.selected].join(' ')
    : styles.collection;

  const showCreated =
    isSelected && formatDate(created, languageName)
      ? `${text.collection.created} ${formatDate(created, languageName)}`
      : '';

  useEffect(() => {
    if (isSelected) {
      dispatch(setHasDone(!!doneTodos));
    }
  }, [doneTodos]);

  drag(drop(ref));

  return (
    <article
      ref={ref}
      data-handler-id={handlerId}
      className={articleStyles}
      style={{ ...listStyles, opacity }}
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
      {isSelected && isEditing && (
        <button className={styles.move}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}
      {shared && (
        <span className={styles.shared}>
          <FontAwesomeIcon icon={faShareNodes} />
        </span>
      )}
    </article>
  );
};

export default TodoCollection;
