import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useSettingsStore from '../../context/useSettingsStore';
import useLanguage from '../../hooks/useLanguage';
import { TypeEnum } from '../../utils/types';
import { cn } from '../../utils/utils';

import styles from './TodoInput.module.scss';

type Props = {
  todoInput: string;
  maxLength: number;
  setTodoInput: Dispatch<SetStateAction<string>>;
};

const TodoInput: FC<Props> = ({ todoInput, maxLength, setTodoInput }) => {
  const ref = useRef<HTMLInputElement>(null);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const sort = useSettingsStore((state) => state.sort);
  const { text } = useLanguage();
  const inputTextByType = selectedCollection?.type === TypeEnum.enum.todo ? text.header.newTodo : text.header.editNote;
  const placeholderText = selectedCollection ? inputTextByType : text.header.newCollection;
  const finalInputText = sort ? text.controls.sort : placeholderText;
  const disabled = sort || (selectedCollection?.type === TypeEnum.enum.note && !selectedCollection.edit);

  useEffect(() => {
    if (selectedCollection && ref.current && selectedCollection.type === TypeEnum.enum.todo) {
      ref.current.focus();
    }
  }, [selectedCollection, selectedCollection?.title, selectedCollection?.type]);

  return (
    <input
      ref={ref}
      type="text"
      className={cn(styles.todo, { [styles.selected]: selectedCollection })}
      placeholder={finalInputText}
      title={finalInputText}
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      maxLength={maxLength}
      disabled={disabled}
      data-testid="todo-input"
      name="todo-input"
      autoComplete="off"
    />
  );
};

export default TodoInput;
