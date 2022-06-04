import { useRef, useContext } from 'react';

import TodoContext from '../store/todo-context';

import './AddTodo.css';

const AddTodo = () => {
  const todoCtx = useContext(TodoContext);
  const todoInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredText = todoInputRef.current.value;

    todoCtx.createTodo(enteredText, null);

    todoInputRef.current.value = '';
  };

  const removeSelectedListHandler = () => {
    todoCtx.setSelected('', '');
  };

  const test = todoCtx.selectedTodoList.title
    ? todoCtx.selectedTodoList.title
    : 'Lisää uusi';

  return (
    <header>
      <form onSubmit={submitHandler}>
        <div onClick={removeSelectedListHandler}>{test}</div>
        <input ref={todoInputRef} type="text" />
        <button>Add</button>
      </form>
    </header>
  );
};

export default AddTodo;
