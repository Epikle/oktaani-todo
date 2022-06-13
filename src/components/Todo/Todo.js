import { useContext, useState } from 'react';

import TodoContext from '../../store/todo-context';

import './Todo.css';

const Todo = ({ todoData, collectionId }) => {
  const todoCtx = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(todoData.done);

  const todoChangeHandler = () => {
    todoCtx.setDoneTodo(collectionId, todoData.id);
    setIsChecked((prevState) => !prevState);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        id={todoData.id}
        onChange={todoChangeHandler}
        checked={isChecked}
      />
      <label htmlFor={todoData.id}>{todoData.todo}</label>
    </li>
  );
};

export default Todo;
