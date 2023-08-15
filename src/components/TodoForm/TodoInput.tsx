import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './TodoInput.module.scss';
import { TypeEnum } from '../../utils/types';
import { cn } from '../../utils/utils';

type Props = {
  todoInput: string;
  setTodoInput: Dispatch<SetStateAction<string>>;
  maxLength: number;
  isLoading: boolean;
};

const TodoInput: FC<Props> = ({ todoInput, setTodoInput, maxLength, isLoading }) => {
  const ref = useRef<HTMLInputElement>(null);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const sort = useSettingsStore((state) => state.sort);
  const { text } = useLanguage();
  const inputTextByType = selectedCollection?.type === TypeEnum.enum.todo ? text.header.newTodo : text.header.editNote;
  const placeholderText = selectedCollection ? inputTextByType : text.header.newCollection;

  useEffect(() => {
    if (selectedCollection && ref.current && selectedCollection.type === TypeEnum.enum.todo) {
      ref.current.focus();
    }
  }, [selectedCollection, isLoading, selectedCollection?.title, selectedCollection?.type]);

  return (
    <input
      ref={ref}
      type="text"
      className={cn(styles.todo, { [styles.selected]: selectedCollection })}
      placeholder={sort ? text.controls.sort : placeholderText}
      title={placeholderText}
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      maxLength={maxLength}
      disabled={sort || isLoading || (selectedCollection?.type === TypeEnum.enum.note && !selectedCollection.edit)}
      data-testid="todo-input"
    />
  );
};

export default TodoInput;
