import { FC, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';
import ColorChooser from './ColorChooser';
import TodoInput from './TodoInput';

import styles from './TodoForm.module.scss';
import { cn } from '../../utils/utils';

export const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setSelectedCollection, resetSelection } = useSelectedStore((state) => state.actions);
  const { createCollection, createItem } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCollection?.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection?.edit, selectedCollection?.title]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (trimmedInput.length === 0) return;
    setIsLoading(true);

    if (selectedCollection) {
      if (selectedCollection?.edit) {
        // await editCollection(editedCollection);
        setSelectedCollection({ id: selectedCollection.id, edit: false });
      } else {
        createItem({ colId: selectedCollection.id, message: trimmedInput });
      }
    } else {
      createCollection({ title: trimmedInput, color });
    }

    setTodoInput('');
    setIsLoading(false);
  };

  const isBtnDisabled = (!selectedCollection && trimmedInput.length === 0) || isLoading;
  const isAddBtn = (selectedCollection && trimmedInput.length > 0) || trimmedInput.length > 0;
  const addBtnHandler = isAddBtn ? submitHandler : () => resetSelection();
  const maxLength = !selectedCollection || selectedCollection.edit ? COLLECTION_LENGTH : ITEM_LENGTH;
  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';

  return (
    <form
      className={cn(styles.form, { [styles.selected]: selectedCollection })}
      onSubmit={submitHandler}
      data-collection={
        selectedCollection?.edit ? `${text.common.editing}: ${selectedCollection.title}` : selectedCollection?.title
      }
      data-length={showInputLength}
    >
      <ColorChooser setColor={setColor} defaultColor={DEFAULT_COLOR} />
      <TodoInput todoInput={todoInput} setTodoInput={setTodoInput} maxLength={maxLength} isLoading={isLoading} />
      <Button
        className={cn(styles.add, { [styles.blur]: selectedCollection && trimmedInput.length === 0 })}
        title={isAddBtn ? text.common.add : text.common.cancel}
        onClick={addBtnHandler}
        disabled={isBtnDisabled}
        testId="submit-btn"
      >
        {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faPlus} />}
      </Button>
    </form>
  );
};

export default TodoForm;
