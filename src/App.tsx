import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import useLanguage from './hooks/useLanguage';
import { createSharedCollection, initTodoState } from './context/todoSlice';
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
  const [isError, setIsError] = useState(false);
  const { text } = useLanguage();

  const title = selected.title
    ? `${selected.title} | oktaaniTODO`
    : 'oktaaniTODO';

  document.title = title;

  useEffect(() => {
    dispatch(initTodoState(todoService.getTodosFromLS()));
    dispatch(initSettings(settingsService.getSettingsFromLS()));
    if (shareParam) {
      const getSharedCollection = async () => {
        try {
          const data = await todoService.getSharedCollectionData(shareParam);
          dispatch(createSharedCollection(data));
          window.location.replace(import.meta.env.VITE_BASE_URL);
        } catch (error) {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
            window.location.replace(import.meta.env.VITE_BASE_URL);
          }, 2000);
        }
      };
      getSharedCollection();
    }
  }, [dispatch]);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      {!isStorageAvailable() && <Overlay>{text.errors.localStorage}</Overlay>}
      <Header />
      {isError && (
        <main>
          <p>{text.errors.default}</p>
        </main>
      )}
      {!shareParam && !isError && <TodoList />}
    </div>
  );
};

export default App;
