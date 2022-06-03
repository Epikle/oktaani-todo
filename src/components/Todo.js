import { useState } from 'react';

import './Todo.css';

//Returns one todo item
const Todo = (props) => {
  const [isDone, setIsDone] = useState(props.done);

  const clickHandler = () => {
    setIsDone((prevState) => !prevState);
    //need also change state
  };

  return (
    <li
      className={isDone ? 'todo-item done' : 'todo-item'}
      onClick={clickHandler}
    >
      {props.todo}
    </li>
  );
};

export default Todo;
