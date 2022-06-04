import { useContext } from 'react';

import Todo from './Todo';
import TodoContext from '../store/todo-context';

import './Collection.css';

const Collection = ({ collectionData, onChange, selected }) => {
  const TodoCtx = useContext(TodoContext);
  const checked = selected === collectionData.id ? true : false;

  const deleteBtnHandler = (id) => {
    TodoCtx.deleteCollection(id);
  };

  const clearBtnHandler = (id) => {
    TodoCtx.clearDoneTodos(id);
  };

  return (
    <article>
      <button onClick={deleteBtnHandler.bind(null, collectionData.id)}>
        DEL
      </button>
      <button onClick={clearBtnHandler.bind(null, collectionData.id)}>
        CLR
      </button>
      <input
        type="radio"
        id={collectionData.id}
        name="collection"
        onChange={onChange.bind(null, collectionData.id, collectionData.title)}
        checked={checked}
      />
      <label htmlFor={collectionData.id}>{collectionData.title}</label>
      <ul>
        {collectionData.todos.map((todo) => (
          <Todo
            key={todo.id}
            todoData={todo}
            collectionId={collectionData.id}
          />
        ))}
      </ul>
    </article>
  );
};

export default Collection;
