import { FC, useId, useState } from 'react';

import type { Languages, TItem } from '../../types';
import useSettingsStore from '../../context/useSettingsStore';
import { toggleItemDone } from '../../context/todoSlice';
import useLanguage from '../../hooks/useLanguage';
import { useAppDispatch } from '../../hooks/useRedux';
import { formatDate } from '../../utils/utils';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
  colId: string;
};

type ItemProps = Omit<TItem, 'id'> & {
  onDone: () => void;
  language: Languages;
};

export const Item: FC<ItemProps> = ({ onDone, text: todoText, done, created, language }) => {
  const id = useId();
  const [isDone, setIsDone] = useState(done);
  const { text } = useLanguage();

  const todoDoneHandler = () => {
    setIsDone((prevS) => !prevS);
    onDone();
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
      <label htmlFor={id} title={`${text.collection.created} ${formatDate(created, language)}`}>
        {todoText}
      </label>
    </li>
  );
};

const TodoItem: FC<Props> = ({ todo, colId }) => {
  const { id, text, done, created } = todo;
  const { languageName } = useSettingsStore();
  const dispatch = useAppDispatch();

  const doneInputHandler = async () => {
    await dispatch(toggleItemDone({ colId, id }));
  };

  return <Item text={text} done={done} created={created} onDone={doneInputHandler} language={languageName} />;
};

export default TodoItem;
