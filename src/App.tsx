import { FC, useEffect } from 'react';

import useLanguage from './hooks/useLanguage';
import { getSettingsFromLS } from './services/settings';
import { isStorageAvailable } from './utils/utils';
import Header from './components/UI/Header';
import TodoList from './components/TodoList/TodoList';
import Overlay from './components/UI/Overlay';
import Toast from './components/UI/Toast';
import useSelectedStore from './context/useSelectedStore';
import useSettingsStore from './context/useSettingsStore';
import useTodoStore from './context/useTodoStore';
import useStatusStore from './context/useStatusStore';
import env from './utils/env';
import ErrorBoundary from './components/UI/ErrorBoundary';

const shareParam = new URLSearchParams(document.location.search).get('share');

const App: FC = () => {
  const title = useSelectedStore((state) => state.title);
  const darkMode = useSettingsStore((state) => state.darkMode);
  const { setSettings } = useSettingsStore((state) => state.actions);
  const { initCollections, createSharedCollection } = useTodoStore((state) => state.actions);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  document.title = title ? `${title} | oktaaniTODO` : 'oktaaniTODO';

  useEffect(() => {
    initCollections();
    setSettings(getSettingsFromLS());
    if (shareParam) {
      (async () => {
        try {
          await createSharedCollection(shareParam);
          window.location.replace(env.BASE_URL);
        } catch (error) {
          setError(text.errors.apiGetCollection);
          setTimeout(() => {
            window.location.replace(env.BASE_URL);
          }, 5000);
        }
      })();
    }
  }, [setSettings, initCollections, createSharedCollection, setError, text]);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      {!isStorageAvailable() && <Overlay>{text.errors.localStorage}</Overlay>}
      <Toast darkMode={darkMode} />
      <Header />
      {shareParam && (
        <main>
          <p>Loading...</p>
        </main>
      )}
      {!shareParam && (
        <ErrorBoundary>
          <TodoList />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;
