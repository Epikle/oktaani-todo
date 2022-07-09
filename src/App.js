import { Fragment } from 'react';

import ListTodos from './components/Todo/ListTodos';
import AddTodo from './components/Todo/AddTodo';
import Footer from './components/UI/Footer';

function App() {
  return (
    <Fragment>
      <AddTodo />
      <ListTodos />
      <Footer />
    </Fragment>
  );
}

export default App;
