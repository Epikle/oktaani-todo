import { useRef, useContext } from 'react';

import TodoContext from '../store/todo-context';

import './AddTodo.css';

const AddTodo = () => {
  const todoCtx = useContext(TodoContext);
  const todoInputRef = useRef();

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
    todoCtx.setSelected('', '');
  };

  const currentCollection = todoCtx.selectedTodoList.title
    ? todoCtx.selectedTodoList.title
    : 'Add a new TODO list!';

  return (
    <header>
      <div>
        {todoCtx.selectedTodoList.title && (
          <button onClick={removeSelectedListHandler}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        )}
        {currentCollection}
      </div>
      <form onSubmit={submitHandler}>
        <input ref={todoInputRef} type="text" />
        <button type="submit">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </form>
    </header>
  );
};

export default AddTodo;
