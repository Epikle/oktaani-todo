import { FC, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { Button } from '../UI/Button';
import ColorChooser from './ColorChooser';
import TodoInput from './TodoInput';
import { cn } from '../../utils/utils';

import styles from './TodoForm.module.scss';

export const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const { createCollection, createItem, updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');

  useEffect(() => {
    if (selectedCollection?.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection?.edit, selectedCollection?.title]);

  const isAddBtn = (selectedCollection && trimmedInput.length > 0) || trimmedInput.length > 0;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!isAddBtn) {
      resetSelection();
      return;
    }
    if (trimmedInput.length === 0) return;

    if (selectedCollection) {
      if (selectedCollection?.edit) {
        updateCollection({ id: selectedCollection.id, title: trimmedInput });
        setSelectedCollection({ id: selectedCollection.id, edit: false });
      } else {
        createItem({ colId: selectedCollection.id, message: trimmedInput });
      }
    } else {
      createCollection({ title: trimmedInput, color });
    }

    setTodoInput('');
  };

  const isBtnDisabled = !selectedCollection && trimmedInput.length === 0;
  const maxLength = !selectedCollection || selectedCollection.edit ? COLLECTION_LENGTH : ITEM_LENGTH;
  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';
  const btnTitleText = isAddBtn ? text.common.add : text.common.cancel;
  const inputTitleText = selectedCollection?.edit
    ? `${text.common.editing}: ${selectedCollection.title}`
    : selectedCollection?.title;

  return (
    <form
      className={cn(styles.form, { [styles.selected]: selectedCollection })}
      data-collection={inputTitleText}
      data-length={showInputLength}
      onSubmit={submitHandler}
    >
      <ColorChooser setColor={setColor} color={color} defaultColor={DEFAULT_COLOR} />
      <TodoInput todoInput={todoInput} setTodoInput={setTodoInput} maxLength={maxLength} />
      <Button
        className={cn(styles.add, { [styles.blur]: selectedCollection && trimmedInput.length === 0 })}
        type="submit"
        title={btnTitleText}
        disabled={isBtnDisabled}
        testId="submit-btn"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </form>
  );
};

export default TodoForm;
