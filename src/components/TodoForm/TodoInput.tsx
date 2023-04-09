import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useBoundStore from '../../context/useBoundStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './TodoInput.module.scss';

type Props = {
  todoInput: string;
  setTodoInput: Dispatch<SetStateAction<string>>;
  maxLength: number;
  isLoading: boolean;
};

const TodoInput: FC<Props> = ({ todoInput, setTodoInput, maxLength, isLoading }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { sort, title, selected } = useBoundStore();
  const { text } = useLanguage();

  const placeholderText = selected ? `${text.header.newTodo} ${title}` : text.header.newCollection;

  const styleClasses = selected ? [styles.todo, styles.selected].join(' ') : styles.todo;

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.focus();
    }
  }, [selected, isLoading]);

  return (
    <input
      ref={ref}
      type="text"
      className={styleClasses}
      placeholder={sort ? text.controls.sort : placeholderText}
      title={placeholderText}
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      maxLength={maxLength}
      disabled={sort || isLoading}
      data-testid="todo-input"
    />
  );
};

export default TodoInput;
