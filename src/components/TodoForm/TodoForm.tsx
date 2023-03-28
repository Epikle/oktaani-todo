import { FC, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  createCollection,
  createItem,
  editCollection,
} from '../../context/todoSlice';
import {
  resetSelection,
  setSelectedCollection,
  setSelectedCollectionEdit,
} from '../../context/selectedSlice';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';
import ColorChooser from './ColorChooser';
import TodoInput from './TodoInput';

import styles from './TodoForm.module.scss';

const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);
  const { text } = useLanguage();
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');

  useEffect(() => {
    if (selectedCollection.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection.edit, selectedCollection.title]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (trimmedInput.length === 0) return;

    if (selectedCollection.edit) {
      const editedCollection = {
        id: selectedCollection.id,
        title: trimmedInput,
        color: selectedCollection.color,
        shared: selectedCollection.shared,
      };
      dispatch(editCollection(editedCollection));
      dispatch(setSelectedCollection(editedCollection));
      dispatch(setSelectedCollectionEdit({ edit: false }));
      return;
    }

    if (selectedCollection.selected) {
      dispatch(
        createItem({ id: selectedCollection.id, item: { text: trimmedInput } }),
      );
      setTodoInput('');
      return;
    }

    const newCollectionEntry = {
      title: trimmedInput,
      color,
      id: nanoid(),
      shared: false,
    };

    dispatch(createCollection(newCollectionEntry));
    dispatch(setSelectedCollection(newCollectionEntry));

    setTodoInput('');
  };

  const isBtnDisabled =
    !selectedCollection.selected && trimmedInput.length === 0;

  const isAddBtn =
    (selectedCollection.selected && trimmedInput.length > 0) ||
    trimmedInput.length > 0;

  const showAddBtnStyles =
    selectedCollection.selected && trimmedInput.length === 0
      ? styles.blur
      : styles.hide;

  const btnStyles = isAddBtn
    ? styles.add
    : [styles.add, showAddBtnStyles].join(' ');

  const addBtnHandler = isAddBtn
    ? submitHandler
    : () => dispatch(resetSelection());

  const formStyles = selectedCollection.selected
    ? [styles.form, styles.selected].join(' ')
    : styles.form;

  const maxLength =
    !selectedCollection.selected || selectedCollection.edit
      ? COLLECTION_LENGTH
      : ITEM_LENGTH;

  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={
        selectedCollection.edit
          ? `${text.common.editing}: ${selectedCollection.title}`
          : selectedCollection.title
      }
      data-length={showInputLength}
    >
      <ColorChooser
        color={color}
        setColor={setColor}
        defaultColor={DEFAULT_COLOR}
        text={text}
        selectedCollection={selectedCollection}
      />

      <TodoInput
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        selectedCollection={selectedCollection}
        text={text}
        maxLength={maxLength}
      />

      <Button
        className={btnStyles}
        title={isAddBtn ? text.common.add : text.common.cancel}
        onClick={addBtnHandler}
        disabled={isBtnDisabled}
        content={<FontAwesomeIcon icon={faPlus} />}
        testId="submit-btn"
      />
    </form>
  );
};

export default TodoForm;
