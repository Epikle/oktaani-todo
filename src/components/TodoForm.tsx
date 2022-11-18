import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
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
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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

  const blurBtnHandler = () => {
    dispatch(resetSelection());
  };

  const placeholderText = selectedCollection.selected
    ? `Add a new todo to ${selectedCollection.title}`
    : `Add a new collection`;

  const isAddBtn =
    !selectedCollection.selected ||
    (selectedCollection.selected && todoInput.trim().length > 0);

  const btnStyles = isAddBtn ? styles.add : [styles.add, styles.blur].join(' ');

  const test = isAddBtn ? () => submitHandler : blurBtnHandler;

  const test2 =
    selectedCollection.selected || todoInput.trim().length > 0
      ? btnStyles
      : [btnStyles, styles.hide].join(' ');

  const btn = (
    <button className={test2} aria-label="Add" title="Add" onClick={test}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );

  return (
    <form
      className={
        selectedCollection.selected
          ? [styles.form, styles.selected].join(' ')
          : styles.form
      }
      onSubmit={submitHandler}
      data-collection={selectedCollection.title}
      ref={parent}
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
      {btn}
    </form>
  );
};

export default TodoForm;
