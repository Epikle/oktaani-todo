import { Fragment, useContext, useEffect } from 'react';

import ListTodos from './components/ListTodos';
import AddTodo from './components/AddTodo';
import TodoContext from './store/todo-context';

function App() {
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    todoCtx.loadTodo();
  }, []);

  return (
    <Fragment>
      <AddTodo />
      <ListTodos />
    </Fragment>
  );
}

export default App;
