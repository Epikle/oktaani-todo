import { useContext, Fragment, useEffect } from 'react';

import Collection from './Collection';
import TodoContext from '../../store/todo-context';

import './ListTodos.css';

const ListTodos = () => {
  const todoCtx = useContext(TodoContext);
  const { todoList: allTodos } = todoCtx;

  const collectionSelectHandler = (id, title, color) => {
    todoCtx.setSelected(id, title, color);
  };

  useEffect(() => {
    todoCtx.readTodos();
  }, []);

  return (
    <main>
      {allTodos.length === 0 && (
        <Fragment>
          <h2>No TODOs found!</h2>
          <p>Start by creating a new list for your TODOs.</p>
        </Fragment>
      )}
      {allTodos.length > 0 &&
        allTodos.map((todosList) => (
          <Collection
            key={todosList.id}
            collectionData={todosList}
            onChange={collectionSelectHandler}
            selected={todoCtx.selectedTodoList.id}
          />
        ))}
    </main>
  );
};

export default ListTodos;
