import { useContext } from 'react';

import Todo from './Todo';
import TodoContext from '../../store/todo-context';

import './Collection.css';

const Collection = ({ collectionData, onChange, selected }) => {
  const todoCtx = useContext(TodoContext);

  const deleteBtnHandler = (id) => {
    todoCtx.deleteCollection(id);
    todoCtx.setSelected(); //reset default selection
  };

  const clearBtnHandler = (id) => {
    todoCtx.clearDoneTodos(id);
  };

  const updateBtnHandler = () => {
    todoCtx.setSelected(
      todoCtx.selectedTodoList.id,
      todoCtx.selectedTodoList.title,
      todoCtx.selectedTodoList.color,
      true
    );
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
          className={isSelected ? 'edit active' : 'edit'}
          onClick={updateBtnHandler}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>

        <button
          className={isSelected ? 'delete active' : 'delete'}
          onClick={deleteBtnHandler.bind(null, collectionData.id)}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div
        className="todo-container"
        style={{ borderTop: `6px solid ${collectionData.color}` }}
      >
        <div className="todo-collection-title">
          <input
            type="radio"
            id={collectionData.id}
            className="sr-only"
            name="collection"
            onChange={onChange.bind(
              null,
              collectionData.id,
              collectionData.title,
              collectionData.color
            )}
            checked={selected === collectionData.id}
          />
          <label htmlFor={collectionData.id}>
            {collectionData.title || 'UNTITLED'}
          </label>
        </div>
        {collectionData.todos.length > 0 && (
          <div className="todo-collection-done">
            {isDone.length} / {collectionData.todos.length}
          </div>
        )}

        <ul>
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
