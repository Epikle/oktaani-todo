import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { faBars, faCheck, faCopy, faFileLines, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import autoAnimate from '@formkit/auto-animate';

import { getSharedCollection } from '../../services/todo';
import { Collection, TypeEnum } from '../../utils/types';
import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import useDnD from '../../hooks/useDnD';
import { cn, copyToClipboard, formatDate } from '../../utils/utils';
import TodoCollectionError from './TodoCollectionError';
import TodoCollectionLoading from './TodoCollectionLoading';
import TodoCollectionUnset from './TodoCollectionUnset';
import { Button } from '../UI/Button';
import TodoLog from './TodoLog';
import TodoItem from './TodoItem';
import TodoNote from './TodoNote';

import styles from './TodoCollection.module.scss';

type Props = {
  collection: Collection;
  index: number;
};

const TodoCollection: FC<Props> = ({ collection, index }) => {
  const { id, title, color, shared, createdAt, type } = collection;
  const listRef = useRef<HTMLUListElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [isError, setIsError] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const { sort, languageName } = useSettingsStore((state) => state);
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { handlerId, opacity, drop, drag, preview } = useDnD({ ref: articleRef, id, index });
  const { text } = useLanguage();
  const isSelected = selectedCollection?.id === id;
  const items = useTodoStore((state) => state.items?.filter((i) => i.colId === id));
  const note = useTodoStore((state) => state.notes?.find((n) => n.colId === id));
  const doneTodos = type === TypeEnum.enum.todo ? items?.filter((todo) => todo.status).length : '';
  const totalTodos = items?.length || 0;
  const showDone = totalTodos > 0 && !sort && TypeEnum.enum.todo === type ? `${doneTodos}/${totalTodos}` : '';
  const showCreated =
    isSelected && formatDate(createdAt, languageName) && !sort
      ? `${text.collection.created} ${formatDate(createdAt, languageName)}`
      : '';

  const getSharedData = useCallback(async () => {
    try {
      setIsError(false);
      setLoading(true);
      const { col } = await getSharedCollection(id);
      updateCollection(col);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [id, updateCollection]);

  useEffect(() => {
    if (!shared) return;
    getSharedData();
  }, [shared, getSharedData]);

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

  useEffect(() => {
    if (listRef.current) autoAnimate(listRef.current);
  }, [listRef]);

  preview(drop(articleRef));

  if (loading) {
    return (
      <TodoCollectionLoading className={cn(styles.collection, { [styles.selected]: isSelected, print: isSelected })} />
    );
  }

  if (isError) {
    return (
      <TodoCollectionError
        id={id}
        className={cn(styles.collection, styles.error, { [styles.selected]: isSelected, print: isSelected })}
        setIsError={setIsError}
        onRetry={getSharedData}
      />
    );
  }

  return (
    <article
      ref={articleRef}
      data-handler-id={handlerId}
      className={cn(styles.collection, { [styles.selected]: isSelected, print: isSelected })}
      style={{ borderColor: color, opacity, minHeight: showLog ? '14rem' : 'auto' }}
      data-done={showDone}
      data-created={showCreated}
    >
      <h2>
        <button type="button" onClick={selectedCollectionHandler} disabled={sort || !type}>
          {title}
        </button>
      </h2>
      {!sort && !type && <TodoCollectionUnset id={id} className={styles.unset} />}
      {!sort && TypeEnum.enum.note === type && <TodoNote id={id} isSelected={isSelected} note={note?.message || ''} />}
      {!sort && TypeEnum.enum.todo === type && (
        <ul ref={listRef} className={styles['item-list']}>
          {items && items.map((item) => <TodoItem key={item.id} item={item} selected={isSelected} />)}
        </ul>
      )}
      {sort && (
        <button type="button" className={styles.move} ref={drag}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}
      {shared && showLog && <TodoLog id={id} />}
      {shared && !sort && (
        <div className={styles.shared}>
          {isSelected && (
            <>
              <Button
                title={text.collection.showLog}
                onClick={() => setShowLog(!showLog)}
                style={{ boxShadow: showLog ? 'inset 0 -2px var(--color-p-red)' : 'none' }}
              >
                <FontAwesomeIcon icon={faFileLines} />
              </Button>
              <Button title={text.collection.copyLink} onClick={copyShareBtnHandler} disabled={isCopy}>
                {isCopy ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
              </Button>
            </>
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
