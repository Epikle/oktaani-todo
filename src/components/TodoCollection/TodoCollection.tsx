import { FC, CSSProperties, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheck, faCopy, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { TodoTypeEnum, type Collection } from '../../context/createTodoSlice';
import useLanguage from '../../hooks/useLanguage';
import { copyToClipboard, formatDate } from '../../utils/utils';
import TodoItem from './TodoItem';
import Button from '../UI/Button';
import TodoNote from './TodoNote';

import styles from './TodoCollection.module.scss';
import useBoundStore from '../../context/useBoundStore';

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
  const { id, title, color, shared, created, type } = collection;
  const parent = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const {
    id: selectedColId,
    setSelectedCollection,
    resetSelection,
    sort,
    languageName,
    updateSharedCollection,
    editCollection,
  } = useBoundStore((state) => state);
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
    accept: 'collection',
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
    type: 'collection',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  const listStyles: CSSProperties = {
    borderColor: color,
  };

  const doneTodos = TodoTypeEnum.Enum.todo === type ? collection.todos.filter((todo) => todo.done).length : '';

  const selectedCollectionHandler = () => {
    if (isSelected) {
      resetSelection();
      return;
    }

    setSelectedCollection({ id, title, color, shared, hasDone: !!doneTodos });
  };

  const copyShareBtnHandler = async () => {
    await copyToClipboard(id);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
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

  if (TodoTypeEnum.Enum.unset === type) return <p>select type</p>;

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
        <button type="button" onClick={selectedCollectionHandler} disabled={sort}>
          {title}
        </button>
      </h2>
      {!sort && <TodoNote isSelected={isSelected} />}
      {!sort && TodoTypeEnum.Enum.todo === type && (
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
      {shared && !sort && (
        <div className={styles.shared}>
          {isSelected && (
            // TODO: LANG
            <Button title="Copy Share Link" onClick={copyShareBtnHandler} disabled={isCopy}>
              {isCopy ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
            </Button>
          )}
          <span>
            <FontAwesomeIcon icon={faShareNodes} />
          </span>
        </div>
      )}
    </article>
  );
};

export default TodoCollection;
