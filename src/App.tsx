import { Fragment, FC, useEffect } from 'react';

import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import TodoList from './components/TodoList';
import { useAppSelector, useAppDispatch } from './hooks/useRedux';
import { initTodos } from './context/todoSlice';
import * as todoService from './services/todo';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(initTodos(todoService.getTodosFromLS()));
  }, []);

  return (
    <Fragment>
      <Header />
      <TodoList collections={collections} />
      <Footer />
    </Fragment>
  );
};

export default App;
