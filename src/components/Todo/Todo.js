import { useContext, useState, useId } from 'react';

import TodoContext from '../../store/todo-context';

import './Todo.css';

const Todo = ({ todoData, collectionId }) => {
  const todoCtx = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(todoData.done);
  const id = useId();

  const todoChangeHandler = () => {
    todoCtx.setDoneTodo(collectionId, todoData.id);
    setIsChecked((prevState) => !prevState);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        id={id}
        onChange={todoChangeHandler}
        checked={isChecked}
      />
      <label htmlFor={id}>{todoData.todo}</label>
    </li>
  );
};

export default Todo;
