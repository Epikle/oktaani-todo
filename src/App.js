import ListTodos from './components/Todo/ListTodos';
import AddTodo from './components/Todo/AddTodo';
import Footer from './components/UI/Footer';
import TodoProvider from './store/TodoProvider';

function App() {
  return (
    <TodoProvider>
      <AddTodo />
      <ListTodos />
      <Footer />
    </TodoProvider>
  );
}

export default App;
