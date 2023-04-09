import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import { TodoTypeEnum } from '../../context/useTodoStore';
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
  const title = useSelectedStore((state) => state.title);
  const selected = useSelectedStore((state) => state.selected);
  const type = useSelectedStore((state) => state.type);
  const sort = useSettingsStore((state) => state.sort);
  const { text } = useLanguage();
  const placeholderText = selected ? `${text.header.newTodo} ${title}` : text.header.newCollection;
  const styleClasses = selected ? [styles.todo, styles.selected].join(' ') : styles.todo;

  useEffect(() => {
    if (selected && ref.current && TodoTypeEnum.enum.todo === type) {
      ref.current.focus();
    }
  }, [selected, isLoading, title, type]);

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
      disabled={sort || isLoading || TodoTypeEnum.Enum.note === type}
      data-testid="todo-input"
    />
  );
};

export default TodoInput;
