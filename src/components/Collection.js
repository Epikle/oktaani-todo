import { useContext } from 'react';

import Todo from './Todo';
import TodoContext from '../store/todo-context';

import './Collection.css';

const Collection = ({ collectionData, onChange, selected }) => {
  const todoCtx = useContext(TodoContext);
  const checked = selected === collectionData.id ? true : false;

  const deleteBtnHandler = (id) => {
    todoCtx.deleteCollection(id);
    todoCtx.setSelected('', '');
  };

  const clearBtnHandler = (id) => {
    todoCtx.clearDoneTodos(id);
  };

  const isDone = collectionData.todos.filter((todo) => todo.done);
  const isSelected = todoCtx.selectedTodoList.id === collectionData.id;

  return (
    <article>
      <div className="controls">
        <button
          className={isSelected && isDone.length > 0 ? 'clear active' : 'clear'}
          onClick={clearBtnHandler.bind(null, collectionData.id)}
          disabled={!isSelected || isDone.length === 0}
        >
          <span className="material-symbols-outlined">clear_all</span>
        </button>

        <button
          className={isSelected ? 'delete active' : 'delete'}
          onClick={deleteBtnHandler.bind(null, collectionData.id)}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div className="todo-container color-red">
        <div className="todo-collection-title">
          <input
            type="radio"
            id={collectionData.id}
            className="sr-only"
            name="collection"
            onChange={onChange.bind(
              null,
              collectionData.id,
              collectionData.title
            )}
            checked={checked}
          />
          <label htmlFor={collectionData.id}>{collectionData.title}</label>
        </div>
        <div className="todo-collection-done">
          {isDone.length} / {collectionData.todos.length}
        </div>

        <ul className="todo-items-list">
          {collectionData.todos.map((todo) => (
            <Todo
              key={todo.id}
              todoData={todo}
              collectionId={collectionData.id}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Collection;
