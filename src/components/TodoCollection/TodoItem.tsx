import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { type Item as TItem } from '../../context/useTodoStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';
import useSettingsStore from '../../context/useSettingsStore';
import useStatusStore from '../../context/useStatusStore';
import usePriority from '../../hooks/usePriority';
import Button from '../UI/Button';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
  colId: string;
  selected: boolean;
};

const TodoItem: FC<Props> = ({ todo, colId, selected }) => {
  const { id, text: todoText, done, created } = todo;
  const [isDone, setIsDone] = useState(done);
  const { toggleItemDone, removeTodoItem, editTodoItemPriority } = useTodoStore((state) => state.actions);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();
  const { priorityColor, nextPriority } = usePriority(todo.priority);

  const todoDoneHandler = async () => {
    setIsDone((prevS) => !prevS);
    try {
      await toggleItemDone({ id, colId });
    } catch (error) {
      setError(text.errors.apiUpdateCollection);
    }
  };

  const changePriorityBtnHandler = () => {
    editTodoItemPriority({ id, colId, newPriority: nextPriority() });
  };

  const todoRemoveBtnHandler = async () => {
    await removeTodoItem({ id, colId });
  };

  return (
    <li className={styles['todo-item']} style={{ '--color-priority': priorityColor } as React.CSSProperties}>
      <div className={styles.priority}>
        <Button
          aria-label={text.todo.priority}
          title={text.todo.priority}
          onClick={changePriorityBtnHandler}
          testId="item-btn-priority"
        />
        <input
          type="checkbox"
          id={id}
          checked={isDone}
          onChange={todoDoneHandler}
          title={text.todo.markDone.replace('[]', todoText)}
        />
      </div>

      <label htmlFor={id} title={`${text.collection.created} ${formatDate(created, languageName)}`}>
        {todoText}
      </label>
      {selected && (
        <Button
          onClick={todoRemoveBtnHandler}
          aria-label={text.todo.remove.replace('[]', todoText)}
          title={text.todo.remove.replace('[]', todoText)}
          testId="item-btn-remove"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </li>
  );
};

export default TodoItem;
