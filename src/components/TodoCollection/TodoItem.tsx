import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import useSettingsStore from '../../context/useSettingsStore';
import usePriority from '../../hooks/usePriority';
import Button from '../UI/Button';

import styles from './TodoItem.module.scss';
import { Item } from '../../utils/types';
import useTodoStore from '../../context/useTodoStore';

type Props = {
  item: Item;
  selected: boolean;
};

const TodoItem: FC<Props> = ({ item, selected }) => {
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

  return (
    <li className={styles['todo-item']} style={{ '--color-priority': priorityColor } as React.CSSProperties}>
      <div className={styles.priority}>
        <Button
          aria-label={text.todo.priority}
          title={text.todo.priority}
          onClick={() => updateItemPriority({ id, priorityEntry: nextPriority() })}
          testId="item-btn-priority"
          data-priority={priority}
        />
        <input
          type="checkbox"
          id={id}
          checked={done}
          onChange={todoDoneHandler}
          title={text.todo.markDone.replace('[]', message)}
        />
      </div>

      <label htmlFor={id} title={`${text.collection.created} ${formatDate(createdAt, languageName)}`}>
        {message}
      </label>
      {selected && (
        <Button
          onClick={() => deleteItem(id)}
          aria-label={text.todo.remove.replace('[]', message)}
          title={text.todo.remove.replace('[]', message)}
          testId="item-btn-remove"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </li>
  );
};

export default TodoItem;
