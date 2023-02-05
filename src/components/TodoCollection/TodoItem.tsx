import { FC, useId, useState } from 'react';

import type { Languages, TItem } from '../../types';
import { toggleItemDone } from '../../context/todoSlice';
import useLanguage from '../../hooks/useLanguage';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { formatDate } from '../../utils/utils';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
};

type ItemProps = Omit<TItem, 'id'> & {
  onDone: () => void;
  language: Languages;
};

export const Item: FC<ItemProps> = ({
  onDone,
  text: todoText,
  done,
  created,
  language,
}) => {
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
      <label
        htmlFor={id}
        title={`${text.collection.created} ${formatDate(created, language)}`}
      >
        {todoText}
      </label>
    </li>
  );
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { id } = todo;
  const dispatch = useAppDispatch();
  const { languageName } = useAppSelector((state) => state.settings);

  const doneInputHandler = () => {
    dispatch(toggleItemDone({ id }));
  };

  return <Item {...todo} onDone={doneInputHandler} language={languageName} />;
};

export default TodoItem;
