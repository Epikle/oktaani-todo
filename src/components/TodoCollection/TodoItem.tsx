import { FC, useEffect, useRef, useState } from 'react';
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
  const btnRef = useRef<HTMLButtonElement>(null);
  const { id, message, status, createdAt, priority } = item;
  const [done, setDone] = useState(status);
  const { toggleItemStatus, updateItemPriority, deleteItem } = useTodoStore((state) => state.actions);
  const languageName = useSettingsStore((state) => state.languageName);
  const { text } = useLanguage();
  const { priorityColor, nextPriority } = usePriority(priority);

  const todoDoneHandler = () => {
    setDone((prevS) => !prevS);
    toggleItemStatus(id);
  };

  useEffect(() => {
    if (btnRef.current) autoAnimate(btnRef.current);
  }, [btnRef]);

  return (
    <li className={styles['todo-item']} style={{ '--color-priority': priorityColor } as React.CSSProperties}>
      <Button
        ref={btnRef}
        aria-label={text.todo.priority}
        title={text.todo.priority}
        className={styles['priority-btn']}
        onClick={() => updateItemPriority({ id, priorityEntry: nextPriority() })}
        testId="item-btn-priority"
        data-priority={priority}
      >
        {done && <FontAwesomeIcon icon={faCheck} />}
      </Button>

      <input
        type="checkbox"
        id={id}
        checked={done}
        onChange={todoDoneHandler}
        title={text.todo.markDone.replace('[]', message)}
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
