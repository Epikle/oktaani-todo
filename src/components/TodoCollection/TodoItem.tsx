import { FC, useId, useState } from 'react';

import { toggleItemDone } from '../../context/todoSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Languages, TItem } from '../../types';
import { formatDate } from '../../utils/utils';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
};

type ItemProps = Omit<TItem, 'id'> & {
  onChange: () => void;
  language: Languages;
};

export const Item: FC<ItemProps> = ({
  onChange,
  text,
  done,
  created,
  language,
}) => {
  const id = useId();
  const [checked, isChecked] = useState(done);

  const changeHandler = () => {
    isChecked((prevS) => !prevS);
    onChange();
  };

  return (
    <li className={styles['todo-item']}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={changeHandler}
        title={`Mark ${text} as done`}
      />
      <label htmlFor={id} title={`Created ${formatDate(created, language)}`}>
        {text}
      </label>
    </li>
  );
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { id } = todo;
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.settings);

  const doneInputHandler = () => {
    dispatch(toggleItemDone({ id }));
  };

  return <Item {...todo} onChange={doneInputHandler} language={language} />;
};

export default TodoItem;
