import { FC, useId, useState } from 'react';
import { toggleItemDone } from '../../context/todoSlice';

import { useAppDispatch } from '../../hooks/useRedux';
import { TItem } from '../../types';

import styles from './TodoItem.module.scss';

type Props = {
  todo: TItem;
};

type ItemProps = Omit<TItem, 'id'> & {
  onChange: () => void;
};

export const Item: FC<ItemProps> = ({ onChange, text, done }) => {
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
      <label htmlFor={id}>{text}</label>
    </li>
  );
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { id, text, done } = todo;
  const dispatch = useAppDispatch();

  const doneInputHandler = () => {
    dispatch(toggleItemDone({ id }));
  };

  return <Item text={text} done={done} onChange={doneInputHandler} />;
};

export default TodoItem;
