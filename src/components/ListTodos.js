import { useContext } from 'react';

import Collection from './Collection';
import TodoContext from '../store/todo-context';

import './ListTodos.css';

const ListTodos = () => {
  const todoCtx = useContext(TodoContext);
  const { todoList: allTodos } = todoCtx;

  const collectionSelectHandler = (id, title) => {
    todoCtx.setSelected(id, title);
  };

  return (
    <main>
      {allTodos.length === 0 && <p>Tyhjä lista</p>}
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
