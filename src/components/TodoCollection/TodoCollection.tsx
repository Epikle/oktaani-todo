import { FC, CSSProperties, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { ItemTypes, type Collection } from '../../types';
import useSettingsStore from '../../context/useSettingsStore';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import TodoItem from './TodoItem';
import Button from '../UI/Button';

import styles from './TodoCollection.module.scss';

type Props = {
  collection: Collection;
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
  const parent = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { sort, languageName } = useSettingsStore();
  const { id: selectedColId, setSelectedCollection, resetSelection } = useSelectedStore();
  const { updateSharedCollection, editCollection } = useTodoStore();
  const { text } = useLanguage();
  const isSelected = selectedColId === id;

  useEffect(() => {
    const getSharedCollectionData = async () => {
      setIsLoading(true);
      try {
        await updateSharedCollection(id);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    if (shared) {
      getSharedCollectionData();
    }
  }, [shared, id, updateSharedCollection]);

  const disableShareBtnHandler = async () => {
    await editCollection({ id, title, color, shared: false });
    setIsError(false);
  };

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
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
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCollection(dragIndex, hoverIndex);

      // eslint-disable-next-line
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag, preview] = useDrag({
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

  const doneTodos = collection.todos.filter((todo) => todo.done).length;

  const selectedCollectionHandler = () => {
    if (isSelected) {
      resetSelection();
      return;
    }

    setSelectedCollection({ id, title, color, shared, hasDone: !!doneTodos });
  };

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const totalTodos = collection.todos.length;
  const showDone = totalTodos > 0 && !sort ? `${doneTodos}/${totalTodos}` : '';
  const articleStyles = isSelected ? [styles.collection, styles.selected].join(' ') : styles.collection;

  const showCreated =
    isSelected && formatDate(created, languageName) && !sort
      ? `${text.collection.created} ${formatDate(created, languageName)}`
      : '';

  useEffect(() => {
    if (isSelected) {
      setSelectedCollection({ hasDone: !!doneTodos });
    }
  }, [doneTodos, isSelected, setSelectedCollection]);

  preview(drop(ref));

  if (isLoading) {
    return (
      <article className={articleStyles}>
        <h2>Loading...</h2>
      </article>
    );
  }

  if (isError) {
    return (
      <article className={[articleStyles, styles.error].join(' ')}>
        <h2>🚨 ERROR 🚨</h2>
        <div>
          <p>{text.errors.apiGetCollection}</p>
          <Button content={text.collection.shareFail} onClick={disableShareBtnHandler} />
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      data-handler-id={handlerId}
      className={isSelected ? [articleStyles, 'print'].join(' ') : articleStyles}
      style={{ ...listStyles, opacity }}
      data-done={showDone}
      data-created={showCreated}
    >
      <h2>
        <button type="button" onClick={selectedCollectionHandler} style={headingStyles} disabled={sort}>
          {title}
        </button>
      </h2>
      {!sort && (
        <ul ref={parent} className={styles['item-list']}>
          {collection.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} colId={id} />
          ))}
        </ul>
      )}

      {sort && (
        <button type="button" className={styles.move} ref={drag}>
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
