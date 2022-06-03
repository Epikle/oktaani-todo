import { useRef, useContext } from 'react';

import TodoContext from '../store/todo-context';

const AddTodo = (props) => {
  const todoCtx = useContext(TodoContext);
  const todoInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredText = todoInputRef.current.value;

    todoCtx.addTodo(enteredText, 'red');

    todoInputRef.current.value = '';
  };

  const test = todoCtx.selectedTodoList.title
    ? todoCtx.selectedTodoList.title
    : 'Lisää uusi';

  return (
    <form onSubmit={submitHandler}>
      {test} -- <input ref={todoInputRef} type="text" />
      <button>Add</button>
    </form>
  );
};

export default AddTodo;
