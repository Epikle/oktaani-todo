import { FC, CSSProperties, useEffect, useRef, useState, useCallback } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheck, faCopy, faFileLines, faShareNodes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import useLanguage from '../../hooks/useLanguage';
import { copyToClipboard, formatDate } from '../../utils/utils';
import Button from '../UI/Button';
import useTabActive from '../../hooks/useTabActive';
import styles from './TodoCollection.module.scss';
import TodoLog from './TodoLog';
import { Collection, CollectionType, TypeEnum } from '../../utils/types';

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

const DELAY_MS = 5000;

const TodoCollection: FC<Props> = ({ collection, index, moveCollection }) => {
  const { id, title, color, shared, createdAt, type } = collection;
  const parent = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(0);
  const selectedColId = useSelectedStore((state) => state.id);
  const sort = useSettingsStore((state) => state.sort);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  // const { updateSharedCollection, editCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();
  const isTabActive = useTabActive();
  const isSelected = selectedColId === id;

  const getSharedCollectionData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      // await updateSharedCollection(id);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastUpdatedTime(0);
      return () => clearTimeout(timer);
    }, DELAY_MS);
  }, []);

  useEffect(() => {
    (async () => {
      if (shared && isTabActive && Date.now() - lastUpdatedTime > DELAY_MS) {
        try {
          await getSharedCollectionData();
        } catch (error) {
          setIsError(true);
        }
        setLastUpdatedTime(Date.now());
      }
    })();
  }, [shared, getSharedCollectionData, isTabActive, lastUpdatedTime]);

  const disableShareBtnHandler = async () => {
    // await editCollection({ id, title, color, type, shared: false, noShare: true });
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

  const doneTodos = type === TypeEnum.enum.todo ? collection.todos.filter((todo) => todo.done).length : '';

  const selectedCollectionHandler = () => {
    if (!type) return;
    if (isSelected) {
      resetSelection();
      return;
    }

    setSelectedCollection({ id, title, color, shared, type, hasDone: !!doneTodos });
  };

  const copyShareBtnHandler = async () => {
    await copyToClipboard(id);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  const toggleLogBtnHandler = () => {
    setShowLog((prevS) => !prevS);
  };

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const totalTodos = 1;
  const showDone = totalTodos > 0 && !sort && TypeEnum.enum.todo === type ? `${doneTodos}/${totalTodos}` : '';
  const articleStyles = isSelected ? [styles.collection, styles.selected].join(' ') : styles.collection;

  const showCreated =
    isSelected && formatDate(createdAt, languageName) && !sort
      ? `${text.collection.created} ${formatDate(createdAt, languageName)}`
      : '';

  useEffect(() => {
    if (isSelected) {
      setSelectedCollection({ hasDone: !!doneTodos });
    }
  }, [doneTodos, isSelected, setSelectedCollection]);

  preview(drop(ref));

  const todoTypeBtnHandler = async (typeEntry: CollectionType) => {
    console.log({ id, type: typeEntry });
    // await editCollection({ id, title, color, shared, type });
  };

  if (isLoading) {
    return (
      <article className={articleStyles} style={{ textAlign: 'center' }}>
        <h2>{text.common.loading}</h2>
        <FontAwesomeIcon icon={faSpinner} size="2xl" spinPulse />
      </article>
    );
  }

  if (isError) {
    return (
      <article className={[articleStyles, styles.error].join(' ')}>
        <h2>🚨 {text.common.error} 🚨</h2>
        <div>
          <p>{text.errors.apiGetCollection}</p>
          <div>
            <Button onClick={getSharedCollectionData}>{text.collection.shareTryAgain}</Button>
            <Button onClick={disableShareBtnHandler}>{text.collection.shareFail}</Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      data-handler-id={handlerId}
      className={isSelected ? [articleStyles, 'print'].join(' ') : articleStyles}
      style={{ ...listStyles, opacity, minHeight: showLog ? '14rem' : 'auto' }}
      data-done={showDone}
      data-created={showCreated}
    >
      <h2>
        <button type="button" onClick={selectedCollectionHandler} disabled={sort}>
          {title}
        </button>
      </h2>
      {!type && !sort && (
        <div className={styles.unset}>
          <span>{text.collection.selectType}</span>
          <Button onClick={() => todoTypeBtnHandler(TypeEnum.enum.todo)} testId="add-todo-btn">
            {text.collection.todo}
          </Button>
          <Button onClick={() => todoTypeBtnHandler(TypeEnum.enum.note)} testId="add-note-btn">
            {text.collection.note}
          </Button>
        </div>
      )}
      {/* {!sort && TypeEnum.enum.note === type && <TodoNote id={id} isSelected={isSelected} note={note} />} */}
      {!sort && TypeEnum.enum.todo === type && (
        <ul ref={parent} className={styles['item-list']}>
          {/* {collection &&
            collection.todos &&
            collection.todos.length > 0 &&
            collection.todos.map((todo) => <TodoItem key={todo.id} todo={todo} colId={id} selected={isSelected} />)} */}
        </ul>
      )}

      {sort && (
        <button type="button" className={styles.move} ref={drag}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}
      {shared && showLog && <TodoLog id={id} languageName={languageName} />}
      {shared && !sort && (
        <div className={styles.shared}>
          {isSelected && (
            <Button
              title={text.collection.showLog}
              onClick={toggleLogBtnHandler}
              style={{ boxShadow: showLog ? 'inset 0 -2px var(--color-p-red)' : 'none' }}
            >
              <FontAwesomeIcon icon={faFileLines} />
            </Button>
          )}

          <div>
            {isSelected && (
              <Button title={text.collection.copyLink} onClick={copyShareBtnHandler} disabled={isCopy}>
                {isCopy ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
              </Button>
            )}
            <span>
              <FontAwesomeIcon icon={faShareNodes} />
            </span>
          </div>
        </div>
      )}
    </article>
  );
};

export default TodoCollection;
