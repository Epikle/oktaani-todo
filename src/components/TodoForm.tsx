import { FC, FormEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './TodoForm.module.scss';

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(colorInputRef.current?.value);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        type="color"
        title="Set todo collection color"
        className={styles['color-picker']}
        ref={colorInputRef}
        defaultValue="#64785c"
      />
      <input
        type="text"
        className={styles.todo}
        placeholder="Add a new todo"
        title="Add a new todo"
      />
      <button className={styles.add} aria-label="Add" title="Add">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
