import ListTodos from './components/ListTodos';
import AddTodo from './components/AddTodo';
import TodoProvider from './store/TodoProvider';

import './App.css';

function App() {
  return (
    <TodoProvider>
      <AddTodo />
      <ListTodos />
    </TodoProvider>
  );
}

export default App;
