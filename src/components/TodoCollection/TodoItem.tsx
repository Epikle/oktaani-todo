import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import useSettingsStore from '../../context/useSettingsStore';
import usePriority from '../../hooks/usePriority';
import { Button } from '../UI/Button';
import { Item } from '../../utils/types';

import styles from './TodoItem.module.scss';

type Props = {
  item: Item;
  selected: boolean;
};

const TodoItem: FC<Props> = ({ item, selected }) => {
  const { id, message, status, createdAt, priority } = item;
  const btnRef = useRef<HTMLButtonElement>(null);
  const { toggleItemStatus, updateItemPriority, deleteItem } = useTodoStore((state) => state.actions);
  const languageName = useSettingsStore((state) => state.languageName);
  const { priorityColor, nextPriority } = usePriority(priority);
  const { text } = useLanguage();

  useEffect(() => {
    if (btnRef.current) autoAnimate(btnRef.current);
  }, [btnRef]);

  return (
    <li className={styles['todo-item']} style={{ '--color-priority': priorityColor } as React.CSSProperties}>
      <Button
        ref={btnRef}
        title={text.todo.priority}
        aria-label={text.todo.priority}
        className={styles['priority-btn']}
        onClick={() => updateItemPriority({ id, priorityEntry: nextPriority() })}
        testId="item-btn-priority"
        data-priority={priority}
      >
        {status && <FontAwesomeIcon icon={faCheck} />}
      </Button>

      <input
        id={id}
        type="checkbox"
        title={text.todo.markDone.replace('[]', message)}
        onChange={() => toggleItemStatus(id)}
        checked={status}
      />
      <label htmlFor={id} title={`${text.collection.created} ${formatDate(createdAt, languageName)}`}>
        {message}
      </label>

      {selected && (
        <Button
          title={text.todo.remove.replace('[]', message)}
          aria-label={text.todo.remove.replace('[]', message)}
          className={styles.remove}
          onClick={() => deleteItem(id)}
          testId="item-btn-remove"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </li>
  );
};

export default TodoItem;
