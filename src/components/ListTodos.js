import { useContext } from 'react';

import Todo from './Todo';
import TodoContext from '../store/todo-context';

const ListTodos = (props) => {
  const todoCtx = useContext(TodoContext);

  const { todoList: allTodos } = todoCtx;

  const todoSelectHandler = (id, event) => {
    todoCtx.setSelected(id, event.target.innerText);
    console.log(event.target.innerText);
  };

  return (
    <main>
      {allTodos.map((todosList) => {
        return (
          <article key={todosList.id}>
            <h3 onClick={todoSelectHandler.bind(null, todosList.id)}>
              {todosList.title}
            </h3>
            <ul>
              {todosList.todos.map((todo) => (
                <Todo key={todo.id} todo={todo.todo} done={todo.done} />
              ))}
            </ul>
          </article>
        );
      })}
    </main>
  );
};

export default ListTodos;
