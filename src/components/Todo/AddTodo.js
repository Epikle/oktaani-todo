import { useRef, useContext, useId, Fragment } from 'react';

import TodoContext from '../../store/todo-context';
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

    if (todoCtx.selectedTodoList.isUpdating) {
      todoInputRef.current.value = '';
      todoCtx.updateTodo(enteredText, todoCtx.selectedTodoList.color);
      return;
    }

    todoInputRef.current.value = '';
    todoCtx.createTodo(enteredText, null);
  };

  const removeSelectedListHandler = () => {
    todoCtx.setSelected();
    todoInputRef.current.value = '';
  };

  let currentCollection = (
    <Fragment>
      oktaani<strong>TODO</strong>
    </Fragment>
  );

  if (todoCtx.selectedTodoList.title) {
    todoInputRef.current.focus();
    currentCollection = todoCtx.selectedTodoList.title;
    if (todoCtx.selectedTodoList.isUpdating) {
      todoInputRef.current.value = todoCtx.selectedTodoList.title;
    }
  }

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
      <div className="header-form">
        <ColorChooser />
        <form onSubmit={submitHandler}>
          <label htmlFor={id} className="sr-only">
            Add a new TODO list!
          </label>
          <input
            ref={todoInputRef}
            type="text"
            id={id}
            placeholder={
              todoCtx.selectedTodoList.id
                ? 'Add new TODO list item!'
                : 'Add a new TODO list!'
            }
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
