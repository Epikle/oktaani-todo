import { FC, useEffect } from 'react';

import useBoundStore from './context/useBoundStore';
import useLanguage from './hooks/useLanguage';
import { getSettingsFromLS } from './services/settings';
import { isStorageAvailable } from './utils/utils';
import Header from './components/UI/Header';
import TodoList from './components/TodoList/TodoList';
import Overlay from './components/UI/Overlay';

const shareParam = new URLSearchParams(document.location.search).get('share');

const App: FC = () => {
  const { title, darkMode, setSettings, initCollections, createSharedCollection } = useBoundStore((state) => state);
  const { text } = useLanguage();

  document.title = title ? `${title} | oktaaniTODO` : 'oktaaniTODO';

  useEffect(() => {
    initCollections();
    setSettings(getSettingsFromLS());

    if (shareParam) {
      (async () => {
        try {
          await createSharedCollection(shareParam);
          window.location.replace(import.meta.env.VITE_BASE_URL);
        } catch (error) {
          window.location.replace(import.meta.env.VITE_BASE_URL);
        }
      })();
    }
  }, [setSettings, initCollections, createSharedCollection]);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      {!isStorageAvailable() && <Overlay>{text.errors.localStorage}</Overlay>}
      <Header />
      {shareParam && (
        <main>
          <p>Loading...</p>
        </main>
      )}
      {!shareParam && <TodoList />}
    </div>
  );
};

export default App;
