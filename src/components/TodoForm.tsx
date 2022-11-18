import { FC, FormEvent, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

import styles from './TodoForm.module.scss';
import { createCollection } from '../context/todoSlice';
import { resetSelection } from '../context/selectedSlice';

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [todoInput, setTodoInput] = useState('');
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const colorVal = colorInputRef.current?.value || '#FF0000';

    if (todoInput.trim().length > 0) {
      dispatch(
        createCollection({
          title: todoInput,
          color: colorVal,
        }),
      );

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

  const btnHandler = isAddBtn
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
        defaultValue="#7b68ee"
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
        onClick={btnHandler}
        disabled={isBtnDisabled}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
