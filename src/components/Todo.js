//Returns one todo item
const Todo = (props) => {
  const clickHandler = (event) => {
    event.target.classList.toggle('done');
    //need also change state
  };

  return (
    <li className={props.done ? 'done' : ''} onClick={clickHandler}>
      {props.todo}
    </li>
  );
};

export default Todo;
