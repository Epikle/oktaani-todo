import { FC, FormEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

import styles from './TodoForm.module.scss';
import { createCollection } from '../context/todoSlice';

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

  return (
    <form
      className={
        selectedCollection.selected
          ? [styles.form, styles.selected].join(' ')
          : styles.form
      }
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
        placeholder={`Add a new todo to First Collection`}
        title={`Add a new todo to First Collection`}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button className={styles.add} aria-label="Add" title="Add">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
