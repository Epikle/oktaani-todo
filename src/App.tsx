import { Fragment, FC, useEffect } from 'react';

import Header from './components/UI/Header';
import TodoList from './components/TodoList';
import { useAppDispatch } from './hooks/useRedux';
import { initTodos } from './context/todoSlice';
import * as todoService from './services/todo';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTodos(todoService.getTodosFromLS()));
  }, []);

  return (
    <Fragment>
      <Header />
      <TodoList />
    </Fragment>
  );
};

export default App;
