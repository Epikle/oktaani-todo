import { FC, useEffect } from 'react';

import Header from './components/UI/Header';
import TodoList from './components/TodoList';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { initTodos } from './context/todoSlice';
import * as todoService from './services/todo';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.selected);
  const { darkMode } = useAppSelector((state) => state.settings);

  const title = selected.title
    ? `${selected.title} | oktaaniTODO`
    : 'oktaaniTODO';

  document.title = title;

  useEffect(() => {
    dispatch(initTodos(todoService.getTodosFromLS()));
  }, []);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
