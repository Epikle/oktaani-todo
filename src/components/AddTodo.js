import { useRef, useContext, useId, Fragment } from 'react';

import TodoContext from '../store/todo-context';
import ColorChooser from './ColorChooser';

import './AddTodo.css';

const AddTodo = () => {
  const todoCtx = useContext(TodoContext);
  const todoInputRef = useRef();
  const id = useId();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredText = todoInputRef.current.value;

    if (enteredText.trim() === '') {
      return;
    }

    todoCtx.createTodo(enteredText, null);

    todoInputRef.current.value = '';
  };

  const removeSelectedListHandler = () => {
    todoCtx.setSelected('', '', todoCtx.selectedTodoList.color);
  };

  const currentCollection = todoCtx.selectedTodoList.title ? (
    todoCtx.selectedTodoList.title
  ) : (
    <Fragment>
      oktaani<strong>TODO</strong>
    </Fragment>
  );

  return (
    <header>
      <div className="selected-todo-collection">
        {todoCtx.selectedTodoList.title && (
          <button onClick={removeSelectedListHandler}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        )}
        <h1>{currentCollection}</h1>
      </div>
      <div className='header-form'>
        <ColorChooser />
      <form onSubmit={submitHandler}>
        <label htmlFor={id} className="sr-only">
          Add a new TODO list!
        </label>
        <input
          ref={todoInputRef}
          type="text"
          id={id}
          placeholder="Add a new TODO!"
          maxLength="64"
        />
        <button type="submit">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </form>
      </div>
    </header>
  );
};

export default AddTodo;
