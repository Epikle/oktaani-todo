import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import useTodoStore, { type Item as TItem, type TodoItemPriority } from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import useSettingsStore from '../../context/useSettingsStore';
import useStatusStore from '../../context/useStatusStore';
import Button from '../UI/Button';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
  colId: string;
  selected: boolean;
};

const priorityColors: Record<TodoItemPriority, string> = {
  low: 'hsl(0, 0%, 50%)',
  medium: 'hsl(104, 13%, 36%)',
  high: 'hsl(6, 92%, 36%)',
};

const TodoItem: FC<Props> = ({ todo, colId, selected }) => {
  const { id, text: todoText, done, created } = todo;
  const [isDone, setIsDone] = useState(done);
  const { toggleItemDone } = useTodoStore((state) => state.actions);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  const todoDoneHandler = async () => {
    setIsDone((prevS) => !prevS);
    try {
      await toggleItemDone({ id, colId });
    } catch (error) {
      setError(text.errors.apiUpdateCollection);
    }
  };

  return (
    <li
      className={styles['todo-item']}
      style={{ '--color-priority': priorityColors[todo.priority] } as React.CSSProperties}
    >
      <input
        type="checkbox"
        id={id}
        checked={isDone}
        onChange={todoDoneHandler}
        title={text.todo.markDone.replace('[]', todoText)}
      />
      <label htmlFor={id} title={`${text.collection.created} ${formatDate(created, languageName)}`}>
        {todoText}
      </label>
      {selected && (
        <Button>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </li>
  );
};

export default TodoItem;
