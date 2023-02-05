import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import type { Texts, TSelected } from '../../types';

import styles from './TodoInput.module.scss';

type Props = {
  todoInput: string;
  setTodoInput: Dispatch<SetStateAction<string>>;
  selectedCollection: TSelected;
  text: Texts;
  maxLength: number;
};

const TodoInput: FC<Props> = ({
  todoInput,
  setTodoInput,
  selectedCollection,
  text,
  maxLength,
}) => {
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
  }, [selectedCollection]);

  return (
    <input
      ref={ref}
      type="text"
      className={styleClasses}
      placeholder={placeholderText}
      title={placeholderText}
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      maxLength={maxLength}
    />
  );
};

export default TodoInput;
