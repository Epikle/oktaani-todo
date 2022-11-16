import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './TodoForm.module.scss';
import { FormEvent, useRef } from 'react';

const TodoForm: React.FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(colorInputRef.current?.value);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        type="color"
        className={styles['color-picker']}
        ref={colorInputRef}
        defaultValue="#daa520"
      />
      <input type="text" className={styles.todo} placeholder="Add a new todo" />
      <button className={styles.add}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
