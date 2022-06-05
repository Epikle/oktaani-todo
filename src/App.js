import { Fragment, useContext, useEffect } from 'react';

import ListTodos from './components/ListTodos';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import TodoContext from './store/todo-context';

function App() {
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    todoCtx.readTodos();
  }, []);

  return (
    <Fragment>
      <AddTodo />
      <ListTodos />
      <Footer />
    </Fragment>
  );
}

export default App;
