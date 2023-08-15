import { FC, CSSProperties, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheck, faCopy, faFileLines, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import useLanguage from '../../hooks/useLanguage';
import { cn, copyToClipboard, formatDate } from '../../utils/utils';
import Button from '../UI/Button';
import styles from './TodoCollection.module.scss';
import TodoLog from './TodoLog';
import { Collection, CollectionType, TypeEnum } from '../../utils/types';
import useTodoStore from '../../context/useTodoStore';
import TodoItem from './TodoItem';
import TodoNote from './TodoNote';

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
  const { id, title, color, shared, createdAt, type } = collection;
  const parent = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLElement>(null);
  const [isError, setIsError] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const sort = useSettingsStore((state) => state.sort);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();
  const isSelected = selectedCollection?.id === id;
  // TODO
  const items = useTodoStore((state) => state.items?.filter((i) => i.colId === id));
  const note = useTodoStore((state) => state.notes?.find((n) => n.colId === id));

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

  const disableShareBtnHandler = async () => {
    // await editCollection({ id, title, color, type, shared: false, noShare: true });
    setIsError(false);
  };

  const selectedCollectionHandler = () => {
    if (isSelected) {
      resetSelection();
    } else {
      setSelectedCollection({ id, edit: false });
    }
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

  const todoTypeBtnHandler = async (typeEntry: CollectionType) => {
    updateCollection({ id, type: typeEntry });
  };

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const listStyles: CSSProperties = {
    borderColor: color,
  };
  const doneTodos = type === TypeEnum.enum.todo ? items?.filter((todo) => todo.status).length : '';
  const totalTodos = items?.length || 0;
  const showDone = totalTodos > 0 && !sort && TypeEnum.enum.todo === type ? `${doneTodos}/${totalTodos}` : '';
  const showCreated =
    isSelected && formatDate(createdAt, languageName) && !sort
      ? `${text.collection.created} ${formatDate(createdAt, languageName)}`
      : '';

  preview(drop(ref));

  // if (isLoading) {
  //   return (
  //     <article
  //       className={cn(styles.collection, { [styles.selected]: isSelected, print: isSelected })}
  //       style={{ textAlign: 'center' }}
  //     >
  //       <h2>{text.common.loading}</h2>
  //       <FontAwesomeIcon icon={faSpinner} size="2xl" spinPulse />
  //     </article>
  //   );
  // }

  if (isError) {
    return (
      <article className={cn(styles.collection, styles.error, { [styles.selected]: isSelected, print: isSelected })}>
        <h2>🚨 {text.common.error} 🚨</h2>
        <div>
          <p>{text.errors.apiGetCollection}</p>
          <div>
            <Button>{text.collection.shareTryAgain}</Button>
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
      className={cn(styles.collection, { [styles.selected]: isSelected, print: isSelected })}
      style={{ ...listStyles, opacity, minHeight: showLog ? '14rem' : 'auto' }}
      data-done={showDone}
      data-created={showCreated}
    >
      <h2>
        <button type="button" onClick={selectedCollectionHandler} disabled={sort || !type}>
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
      {!sort && TypeEnum.enum.note === type && <TodoNote id={id} isSelected={isSelected} note={note?.message || ''} />}
      {!sort && TypeEnum.enum.todo === type && (
        <ul ref={parent} className={styles['item-list']}>
          {items && items.map((item) => <TodoItem key={item.id} item={item} colId={id} selected={isSelected} />)}
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
