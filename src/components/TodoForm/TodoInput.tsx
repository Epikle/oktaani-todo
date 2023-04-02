import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useRedux';

import type { Texts, TSelected } from '../../types';

import styles from './TodoInput.module.scss';

type Props = {
  todoInput: string;
  setTodoInput: Dispatch<SetStateAction<string>>;
  selectedCollection: TSelected;
  text: Texts;
  maxLength: number;
  isLoading: boolean;
};

const TodoInput: FC<Props> = ({
  todoInput,
  setTodoInput,
  selectedCollection,
  text,
  maxLength,
  isLoading,
}) => {
  const { sort } = useAppSelector((state) => state.settings);
  const ref = useRef<HTMLInputElement>(null);
  const placeholderText = selectedCollection.selected
    ? `${text.header.newTodo} ${selectedCollection.title}`
    : text.header.newCollection;

  const styleClasses = selectedCollection.selected
    ? [styles.todo, styles.selected].join(' ')
    : styles.todo;

  useEffect(() => {
    if (selectedCollection.selected && ref.current) {
      ref.current.focus();
    }
  }, [selectedCollection, isLoading]);

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
