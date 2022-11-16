import { FC, FormEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './TodoForm.module.scss';

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const todoInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(colorInputRef.current?.value, todoInputRef.current?.value);
    if (todoInputRef.current?.value) {
      todoInputRef.current.value = '';
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      data-collection="First Collection"
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
        ref={todoInputRef}
      />
      <button className={styles.add} aria-label="Add" title="Add">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
