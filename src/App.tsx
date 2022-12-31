import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { initTodos } from './context/todoSlice';
import { initSettings } from './context/settingsSlice';
import * as todoService from './services/todo';
import * as settingsService from './services/settings';
import { isStorageAvailable } from './utils/utils';
import Header from './components/UI/Header';
import TodoList from './components/TodoList/TodoList';
import Overlay from './components/UI/Overlay';

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
    dispatch(initSettings(settingsService.getSettingsFromLS()));
  }, []);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      {!isStorageAvailable() && (
        <Overlay>You need to allow localStorage usage to use this app.</Overlay>
      )}
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
