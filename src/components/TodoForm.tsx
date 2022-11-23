import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

import styles from './TodoForm.module.scss';
import {
  createCollection,
  createItem,
  editCollection,
} from '../context/todoSlice';
import {
  resetSelection,
  setSelectedCollectionEdit,
} from '../context/selectedSlice';

const DEFAULT_COLOR = '#7b68ee';

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [tempColor, setTempColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);

  useEffect(() => {
    if (selectedCollection.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection.edit]);

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (selectedCollection.color) {
      setTempColor(colorInputRef.current.value);
      colorInputRef.current.value = selectedCollection.color;
      return;
    }
    colorInputRef.current.value = tempColor;
  }, [selectedCollection.color]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const colorVal = colorInputRef.current?.value || '#FF0000';

    if (todoInput.trim().length > 0) {
      if (selectedCollection.edit) {
        dispatch(
          editCollection({
            id: selectedCollection.id,
            title: todoInput,
            color: colorVal,
          }),
        );

        dispatch(setSelectedCollectionEdit({ edit: false }));
        return;
      }
      if (selectedCollection.selected) {
        dispatch(
          createItem({ id: selectedCollection.id, item: { text: todoInput } }),
        );
      } else {
        dispatch(
          createCollection({
            title: todoInput,
            color: colorVal,
          }),
        );
      }

      setTodoInput('');
    }
  };

  const placeholderText = selectedCollection.selected
    ? `Add a new todo to ${selectedCollection.title}`
    : `Add a new collection`;

  const isBtnDisabled =
    !selectedCollection.selected && todoInput.trim().length === 0;

  const isAddBtn =
    (selectedCollection.selected && todoInput.trim().length > 0) ||
    todoInput.trim().length > 0;

  const showAddBtn =
    selectedCollection.selected && todoInput.trim().length === 0
      ? styles.blur
      : styles.hide;

  const btnStyles = isAddBtn ? styles.add : [styles.add, showAddBtn].join(' ');

  const addBtnHandler = isAddBtn
    ? submitHandler
    : () => dispatch(resetSelection());

  const formStyles = selectedCollection.selected
    ? [styles.form, styles.selected].join(' ')
    : styles.form;

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={selectedCollection.title}
    >
      <input
        type="color"
        title="Set todo collection color"
        className={styles['color-picker']}
        ref={colorInputRef}
        defaultValue={DEFAULT_COLOR}
      />
      <input
        type="text"
        className={styles.todo}
        placeholder={placeholderText}
        title={placeholderText}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button
        className={btnStyles}
        aria-label="Add"
        title="Add"
        onClick={addBtnHandler}
        disabled={isBtnDisabled}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
