import { FC, useState } from 'react';

import useTodoStore, { type Item as TItem } from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { formatDate } from '../../utils/utils';

import styles from './TodoItem.module.scss';
import useSettingsStore from '../../context/useSettingsStore';

type Props = {
  todo: TItem;
  colId: string;
};

const TodoItem: FC<Props> = ({ todo, colId }) => {
  const { id, text: todoText, done, created } = todo;
  const [isDone, setIsDone] = useState(done);
  const { toggleItemDone } = useTodoStore((state) => state.actions);
  const languageName = useSettingsStore((state) => state.languageName);
  const { text } = useLanguage();

  const todoDoneHandler = async () => {
    setIsDone((prevS) => !prevS);
    await toggleItemDone({ id, colId });
  };

  return (
    <li className={styles['todo-item']}>
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
    </li>
  );
};

export default TodoItem;
