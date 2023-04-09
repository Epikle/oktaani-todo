import { FC, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';
import ColorChooser from './ColorChooser';
import TodoInput from './TodoInput';

import styles from './TodoForm.module.scss';
import useBoundStore from '../../context/useBoundStore';

export const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const {
    createCollection,
    createCollectionItem,
    editCollection,
    setSelectedCollection,
    resetSelection,
    edit,
    title,
    color: storeColor,
    shared,
    id,
    selected,
  } = useBoundStore();
  const { text } = useLanguage();
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (edit) {
      setTodoInput(title);
      return;
    }
    setTodoInput('');
  }, [edit, title]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (trimmedInput.length === 0) return;
    setIsLoading(true);

    if (edit) {
      const editedCollection = {
        id,
        title: trimmedInput,
        color: storeColor,
        shared,
      };
      await editCollection(editedCollection);
      setSelectedCollection(editedCollection);
      setSelectedCollection({ edit: false });
      setIsLoading(false);
      return;
    }

    if (selected) {
      await createCollectionItem({
        id,
        itemEntry: { text: trimmedInput },
      });

      setTodoInput('');
      setIsLoading(false);
      return;
    }

    const newCollectionEntry = {
      title: trimmedInput,
      color,
    };

    createCollection(newCollectionEntry);

    setTodoInput('');
    setIsLoading(false);
  };

  const isBtnDisabled = !selected && trimmedInput.length === 0;
  const isAddBtn = (selected && trimmedInput.length > 0) || trimmedInput.length > 0;
  const showAddBtnStyles = selected && trimmedInput.length === 0 ? styles.blur : styles.hide;
  const btnStyles = isAddBtn ? styles.add : [styles.add, showAddBtnStyles].join(' ');
  const addBtnHandler = isAddBtn ? submitHandler : () => resetSelection();
  const formStyles = selected ? [styles.form, styles.selected].join(' ') : styles.form;
  const maxLength = !selected || edit ? COLLECTION_LENGTH : ITEM_LENGTH;
  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={edit ? `${text.common.editing}: ${title}` : title}
      data-length={showInputLength}
    >
      <ColorChooser color={color} setColor={setColor} defaultColor={DEFAULT_COLOR} />
      <TodoInput todoInput={todoInput} setTodoInput={setTodoInput} maxLength={maxLength} isLoading={isLoading} />
      <Button
        className={btnStyles}
        title={isAddBtn ? text.common.add : text.common.cancel}
        onClick={addBtnHandler}
        disabled={isBtnDisabled || isLoading}
        testId="submit-btn"
      >
        {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faPlus} />}
      </Button>
    </form>
  );
};

export default TodoForm;
