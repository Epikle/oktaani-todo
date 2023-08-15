import { FC, useEffect } from 'react';

import useLanguage from './hooks/useLanguage';
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
import Footer from './components/UI/Footer';

const shareParam = new URLSearchParams(document.location.search).get('share');

const App: FC = () => {
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const darkMode = useSettingsStore((state) => state.darkMode);
  const { setSettings } = useSettingsStore((state) => state.actions);
  const { initCollections } = useTodoStore((state) => state.actions);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  document.title = selectedCollection?.title ? `${selectedCollection.title} | oktaaniTODO` : 'oktaaniTODO';

  useEffect(() => {
    initCollections();
    // setSettings(getSettingsFromLS());
    if (shareParam) {
      (async () => {
        try {
          // await createSharedCollection(shareParam);
          window.location.replace(env.BASE_URL);
        } catch (error) {
          setError(text.errors.apiGetCollection);
          setTimeout(() => {
            window.location.replace(env.BASE_URL);
          }, 5000);
        }
      })();
    }
  }, [setSettings, initCollections, setError, text]);

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
      {!shareParam && <TodoList />}
      <Footer />
    </div>
  );
};

export default App;
