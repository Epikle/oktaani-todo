import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { createSharedCollection, initTodos } from './context/todoSlice';
import { initSettings } from './context/settingsSlice';
import * as todoService from './services/todo';
import * as settingsService from './services/settings';
import { isStorageAvailable } from './utils/utils';
import Header from './components/UI/Header';
import TodoList from './components/TodoList/TodoList';
import Overlay from './components/UI/Overlay';

const shareParam = new URLSearchParams(document.location.search).get('share');

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
    if (shareParam) {
      const getSharedCollection = async () => {
        try {
          const data = await todoService.getSharedCollectionData(shareParam);
          dispatch(createSharedCollection(data));
        } catch (error) {
          // TODO: Error handling
        }
        window.location.replace(process.env.VITE_BASE_URL || '');
      };
      getSharedCollection();
    }
  }, [dispatch]);

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
