import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
};

export default App;
